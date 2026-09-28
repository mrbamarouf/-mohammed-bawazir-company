import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const base = process.env.TEST_BASE_URL || "http://localhost:3001";
const run = process.env.QA_RUN || "local";
const out = `audit/production/${run}`;
await fs.mkdir(out, { recursive: true });
const manifest = JSON.parse(await fs.readFile(".next/prerender-manifest.json"));
const routes = Object.keys(manifest.routes)
  .filter((r) => /^\/(ar|en)(\/|$)/.test(r))
  .sort((a, b) => a.localeCompare(b));
const browser = await chromium.launch();
const results = [],
  links = new Set(),
  images = new Set();
let cursor = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    let errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    while (cursor < routes.length) {
      const route = routes[cursor++];
      errors = [];
      try {
        const response = await page.goto(base + route, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });
        await page.evaluate(() => document.fonts.ready);
        const checks = await page.evaluate(() => {
          const text = document.body.innerText;
          const prohibited =
            /\b(?:official source|company source|archived?|migration|preserved|extraction|prototype|implementation|source records?|record language|original website|old website|official website|source verification|according to|as reported|as listed)\b|المصدر الرسمي|مصدر|أرشيف|مؤرشف|تاريخ الرفع|الموقع الأصلي|الموقع القديم|سجل المنتج|لغة السجل|ملاحظات المراجعة|كما ورد في|بحسب دليل|وفق ملف/gi;
          const mixed = [];
          if (document.documentElement.lang === "ar") {
            const walk = document.createTreeWalker(
              document.body,
              NodeFilter.SHOW_TEXT,
            );
            while (walk.nextNode()) {
              const n = walk.currentNode,
                t = n.textContent.trim(),
                p = n.parentElement;
              if (
                /[\u0600-\u06ff]/.test(t) &&
                /[A-Za-z0-9]/.test(t) &&
                !p.closest('bdi,time,option,script,style,[dir="ltr"]')
              )
                mixed.push(t.slice(0, 220));
            }
          }
          const hrefs = [...document.querySelectorAll("a[href]")].map((a) =>
            a.getAttribute("href"),
          );
          return {
            title: document.querySelector("h1")?.textContent,
            h1: document.querySelectorAll("h1").length,
            lang: document.documentElement.lang,
            dir: document.documentElement.dir,
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            prohibited: text.match(prohibited) || [],
            mixed,
            legacyLinks: hrefs.filter(
              (h) =>
                /^https?:\/\/(www\.)?mbtksa\.com\//.test(h) ||
                h.includes("/assets/history/"),
            ),
            brokenImages: [...document.images]
              .filter((i) => i.complete && !i.naturalWidth)
              .map((i) => i.currentSrc),
            invalidOptions: !!document.querySelector("option bdi,option span"),
            hrefs,
            images: [...document.images].map((i) => i.getAttribute("src")),
          };
        });
        checks.hrefs
          .filter((h) => h.startsWith("/"))
          .forEach((h) => links.add(h.split("#")[0]));
        checks.images.filter(Boolean).forEach((h) => images.add(h));
        delete checks.hrefs;
        delete checks.images;
        results.push({
          route,
          status: response.status(),
          finalUrl: page.url(),
          errors: [...errors],
          ...checks,
        });
      } catch (e) {
        results.push({ route, error: e.message });
      }
      if (results.length % 100 === 0)
        console.log(results.length, "/", routes.length);
    }
    await context.close();
  }),
);
await browser.close();
const assets = [...new Set([...links, ...images])].filter(
  (x) => x.startsWith("/assets/") || x.startsWith("/_next/image"),
);
const assetFailures = [];
let nextAsset = 0;
await Promise.all(
  Array.from({ length: 5 }, async () => {
    while (nextAsset < assets.length) {
      const path = assets[nextAsset++];
      try {
        const res = await fetch(base + path, {
          method: "HEAD",
          signal: AbortSignal.timeout(60000),
        });
        if (!res.ok) assetFailures.push({ path, status: res.status });
      } catch (e) {
        assetFailures.push({ path, error: e.message });
      }
    }
  }),
);
const known = new Set(routes);
const unknownLinks = [...links].filter(
  (x) =>
    !x.startsWith("/assets/") && x !== "/" && !known.has(x.replace(/\/$/, "")),
);
const failures = results.filter(
  (r) =>
    r.error ||
    r.status !== 200 ||
    r.h1 !== 1 ||
    r.overflow ||
    r.prohibited?.length ||
    r.legacyLinks?.length ||
    r.brokenImages?.length ||
    r.invalidOptions ||
    r.errors?.length ||
    r.mixed?.length ||
    r.dir !== (r.route.startsWith("/ar") ? "rtl" : "ltr"),
);
const report = {
  base,
  checkedAt: new Date().toISOString(),
  routes: routes.length,
  assets: assets.length,
  failures,
  assetFailures,
  unknownLinks,
  results,
};
await fs.writeFile(`${out}/all-routes.json`, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      routes: routes.length,
      failures: failures.length,
      assets: assets.length,
      assetFailures: assetFailures.length,
      unknownLinks,
    },
    null,
    2,
  ),
);
if (failures.length || assetFailures.length || unknownLinks.length)
  process.exitCode = 1;
