import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const run = process.env.QA_RUN || "local";
const base = process.env.TEST_BASE_URL || "http://localhost:3001";
const dir = `audit/production/${run}/screenshots`;
await fs.mkdir(`audit/production/${run}`, {recursive:true});
await fs.mkdir(dir, { recursive: true });
const report = [];
const errors = [];
for (const locale of ["ar", "en"])
  for (const width of [1920, 1728, 1440, 1366]) {
    for (const route of [
      "",
      "about",
      "business",
      "brands",
      "products",
      "distribution",
      "companies",
      "news",
      "contact",
      "marketing",
      "careers",
      "profile",
    ]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      page.on("pageerror", (e) => errors.push(e.message));
      const response = await page.goto(
        `${base}/${locale}/${route}`,
        { waitUntil: "domcontentloaded" },
      );
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({
        content:
          "html{scroll-behavior:auto!important}.marquee-track{animation-play-state:paused!important}",
      });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 850) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        for (const i of document.images) i.loading = "eager";
        await Promise.race([
          Promise.all(
            [...document.images].map((i) => i.decode().catch(() => {})),
          ),
          new Promise((r) => setTimeout(r, 5000)),
        ]);
        scrollTo(0, 0);
      });
      await page.waitForFunction(
        () => [...document.images].every((i) => i.complete),
        undefined,
        { timeout: 30000 },
      );
      await page.screenshot({
        path: `${dir}/${route || "home"}-${locale}-${width}.jpg`,
        type: "jpeg",
        quality: 82,
        fullPage: true,
      });
      if (!route && width === 1440)
        for (const name of [
          "authority-hero",
          "company-scale",
          "value-chain",
          "sectors-home",
          "brand-world",
          "distribution-home",
          "product-universe",
          "history-feature",
          "ecosystem",
          "news-home",
          "closing",
        ])
          await page.locator("." + name).screenshot({
            path: `${dir}/section-${name}-${locale}.jpg`,
            type: "jpeg",
            quality: 90,
          });
      const check = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        broken: [...document.images]
          .filter((i) => i.complete && !i.naturalWidth)
          .map((i) => i.src),
        height: document.body.scrollHeight,
      }));
      report.push({
        locale,
        width,
        route: route || "home",
        status: response.status(),
        ...check,
      });
      await fs.writeFile(
        `audit/production/${run}/visual-matrix.json`,
        JSON.stringify({ report, errors }, null, 2),
      );
      await page.close();
      console.log(
        locale,
        width,
        route || "home",
        check.overflow ? "OVERFLOW" : "OK",
      );
    }
  }
await fs.writeFile(
  `audit/production/${run}/visual-matrix.json`,
  JSON.stringify({ report, errors }, null, 2),
);
await browser.close();

if (errors.length || report.some(r=>r.status !== 200 || r.overflow || r.broken.length)) process.exitCode = 1;
