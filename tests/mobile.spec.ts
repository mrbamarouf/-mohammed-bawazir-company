import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import products from "../content/products.json";
// Coordinate taps exercise the visible sticky control without Playwright's
// automatic scroll-into-view moving the underlying document first.
async function switchLanguage(page: Page) {
  const box = await page.locator("header .language").boundingBox();
  if (!box) throw new Error("Language control is missing");
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
}
const widths = [320, 360, 375, 390, 393, 414, 430];
const routes = ["", "about", "business", ...["food", "beverages", "household", "personal-care", "pharma", "tobacco"].map(s => `business/${s}`), "brands", "brands/reem", "products", `products/${products[0].slug}`, "distribution", "news", "profile", "careers", "contact", "companies", "marketing"];
const engine = process.env.MOBILE_BROWSER === "webkit" ? "webkit" : "chromium";
test.beforeEach(async ({page}) => { await page.addInitScript(() => sessionStorage.setItem("mbt-intro-v2", "seen")); });
test.use({ browserName: engine, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    for (const locale of ["ar", "en"]) for (const width of engine === "chromium" ? widths : [320, 390, 430]) {
      test(`${locale} layout ${width}`, async ({ page }, testInfo) => {
        test.setTimeout(180000);
        await page.setViewportSize({ width, height: width === 320 ? 568 : width < 390 ? 812 : 844 });
        const errors: string[] = [];
        page.on("pageerror", e => errors.push(e.message));
        for (const route of routes) {
          const response = await page.goto(`/${locale}/${route}`);
          await page.evaluate(() => document.fonts.ready);
          expect(response?.status(), route).toBe(200);
          await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
          await expect(page.locator("h1")).toHaveCount(1);
          await expect(page.locator(".identity")).toBeVisible();
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route} overflow`).toBeTruthy();
          const broken = await page.locator("img").evaluateAll(imgs => (imgs as HTMLImageElement[]).filter(i => i.getClientRects().length && i.complete && !i.naturalWidth).map(i => i.src));
          expect(broken, route).toEqual([]);
          if (!route) {
            await expect(page.locator(".authority-copy h1")).toBeVisible();
            const button = await page.locator(".authority-actions .text-link").first().boundingBox();
            expect(button?.width).toBeGreaterThan(140);
          }
        }
        expect(errors).toEqual([]);
        await testInfo.attach("routes", { body: JSON.stringify({ locale, width, engine, routes, errors }), contentType: "application/json" });
      });
    }
    for (const locale of ["ar", "en"]) test(`${locale} context, touch, filters and menu`, async ({ page }) => {
      test.setTimeout(180000);
      await page.setViewportSize({ width: 390, height: 844 });
      const other = locale === "ar" ? "en" : "ar";
      const product = products.find(p => p.language === "ar" && p.image)!;
      for (const route of ["", "brands?q=Reem", "products?q=Croissant&brand=lool", `products/${product.slug}`, "business/food", "news?year=2025", "contact"]) {
        await page.goto(`/${locale}/${route}`);
        const before = new URL(page.url());
        await switchLanguage(page);
        await expect(page).toHaveURL(new RegExp(`/${other}(?:/|\\?|$)`));
        await expect(page.locator("html")).toHaveAttribute("lang", other);
        const after = new URL(page.url());
        expect(after.pathname).toBe(before.pathname.replace(`/${locale}`, `/${other}`));
        expect(after.search).toBe(before.search);
        await expect(page.locator("[data-intro-played]")).toHaveCount(0);
        await switchLanguage(page);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        expect(new URL(page.url()).pathname).toBe(before.pathname);
      }
      await page.goto(`/${locale}/products`);
      await page.getByRole("searchbox").fill("Croissant");
      await expect(page.locator(".catalogue")).toHaveAttribute("aria-busy", "false");
      await expect(page.locator(".product-item").first()).toContainText(/croissant/i);
      const names = await page.locator(".product-item h3").allTextContents();
      await switchLanguage(page);
      await expect(page.locator("html")).toHaveAttribute("lang", other);
      await expect(page.getByRole("searchbox")).toHaveValue("Croissant");
      await expect(page.locator(".catalogue")).toHaveAttribute("aria-busy", "false");
      expect(await page.locator(".product-item h3").allTextContents()).toEqual(names);
      await page.reload();
      await expect(page.locator(".corporate-intro")).toBeVisible();
      await page.locator(".intro-skip").tap();
      await expect(page.locator(".corporate-intro")).not.toBeVisible();
      await expect(page.getByRole("searchbox")).toHaveValue("Croissant");
      await expect(page.locator(".catalogue")).toHaveAttribute("aria-busy", "false");
      await page.locator(".mobile-filter-toggle").tap();
      await expect(page.locator(".filter-sheet select").first()).toBeVisible();
      await page.locator(".filter-sheet select").first().selectOption("reem");
      await expect(page.locator(".catalogue")).toHaveAttribute("aria-busy", "false");
      await page.locator(".filter-sheet header button").tap();
      await page.getByRole("searchbox").fill("NO_MATCH_ZZ");
      await expect(page.locator(".empty-results")).toBeVisible();
      await page.locator(".results-meta button").tap();
      await expect(page.locator(".product-item")).toHaveCount(24);
      await page.locator(".load-more button").tap();
      await expect(page.locator(".product-item")).toHaveCount(48);
      await page.goto(`/${locale}`);
      await page.locator(".product-universe").scrollIntoViewIfNeeded();
      await page.locator(".universe-tabs button").nth(2).tap();
      await expect(page.locator(".product-universe")).toHaveAttribute("data-family", "beverages");
      await switchLanguage(page);
      await expect(page.locator("html")).toHaveAttribute("lang", other);
      await expect(page.locator(".product-universe")).toHaveAttribute("data-family", "beverages");
      await expect.poll(() => page.locator(".product-universe").evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(200);
      const shelf = page.locator(".product-shelf");
      expect(await shelf.evaluate(el => el.scrollWidth > el.clientWidth)).toBeTruthy();
      await page.locator(".mobile-city-grid button").nth(1).tap();
      await expect(page.locator(".mobile-city-detail h3")).toHaveText(other === "ar" ? "الرياض" : "Riyadh");
      await page.locator(".menu-toggle").tap();
      await expect(page.locator(".nav-dialog")).toBeVisible();
      expect(await page.locator(".nav-dialog").evaluate(el => Math.round(el.getBoundingClientRect().width))).toBe(390);
      await expect(page.locator(".mobile-menu-logo")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator(".nav-dialog")).not.toBeVisible();
      await page.locator(".menu-toggle").tap();
      await page.locator(`.nav-dialog a[href='/${other}/contact']`).tap();
      await expect(page).toHaveURL(new RegExp(`/${other}/contact$`));
      await expect(page.locator(".nav-dialog")).not.toBeVisible();
      await page.locator(".footer-bottom").getByRole("link", { name: other === "ar" ? "English" : "العربية", exact: true }).tap();
      await expect(page).toHaveURL(new RegExp(`/${locale}/contact$`));
    });
    test("mobile accessibility and reduced motion", async ({ page }) => {
      test.setTimeout(180000);
      await page.setViewportSize({ width: 390, height: 844 });
      for (const locale of ["ar", "en"]) for (const route of ["", "products", "contact", "distribution", "profile"]) {
        await page.goto(`/${locale}/${route}`);
        const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), `${locale}/${route}`).toEqual([]);
      }
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/ar");
      await expect(page.locator(".marquee-track").first()).toHaveCSS("animation-name", "none");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      await page.locator(".menu-toggle").tap();
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
    });

test("bounded catalogue payload and safe filter requests", async ({ request, page }) => {
  const response = await request.get("/api/catalogue");
  const data = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(data.items).toHaveLength(24);
  expect(data.total).toBeGreaterThan(350);
  const html = await (await request.get("/ar/products")).text();
  expect(html).not.toContain(products[150].slug);
  const invalid = await (await request.get("/api/catalogue?limit=NaN&q=NO_MATCH_MOBILE")).json();
  expect(invalid.items).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route("**/api/catalogue?**", async route => {
    await new Promise(resolve => setTimeout(resolve, 350));
    await route.continue();
  });
  await page.goto("/ar/products");
  await page.getByRole("searchbox").fill("زيت");
  await expect(page.locator(".product-grid")).toHaveAttribute("inert", "");
  await expect(page.locator(".catalogue")).toHaveAttribute("aria-busy", "false");
  await expect(page.locator(".product-item h3").first()).toHaveAttribute("dir", "rtl");
});

for (const locale of ["ar", "en"]) test(`${locale} document, story, branch context and touch dimensions`, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const other = locale === "ar" ? "en" : "ar";
  for (const route of ["profile?page=16", "brands/reem", "news/36463-mbt-in-a-week-without-sugar", "distribution?city=riyadh"]) {
    await page.goto(`/${locale}/${route}`);
    if (route.startsWith("profile")) {
      await expect(page.locator(".profile-controls select")).toHaveValue("15");
      await page.locator(".profile-controls").scrollIntoViewIfNeeded();
    }
    await switchLanguage(page);
    await expect(page).toHaveURL(new RegExp(`/${other}/`));
    expect(new URL(page.url()).pathname + new URL(page.url()).search).toBe(`/${other}/${route}`);
    if (route.startsWith("profile")) await expect(page.locator(".profile-controls select")).toHaveValue("15");
    if (route.startsWith("distribution")) await expect(page.locator(".mobile-city-grid button[aria-pressed=true]")).toHaveText(other === "ar" ? "الرياض" : "Riyadh");
  }
  await page.goto(`/${locale}`);
  for (const selector of ["header .language", ".menu-toggle", ".motion-toggle", ".universe-tabs button", ".mobile-city-grid button"]) {
    for (const el of await page.locator(selector).all()) {
      const box = await el.boundingBox();
      expect(box?.height, selector).toBeGreaterThanOrEqual(44);
      expect(box?.width, selector).toBeGreaterThanOrEqual(44);
    }
  }
  if (engine === "chromium") {
    const shelf = page.locator(".product-shelf");
    await shelf.scrollIntoViewIfNeeded();
    const box = await shelf.boundingBox();
    const client = await page.context().newCDPSession(page);
    const y = box!.y + Math.min(box!.height / 2, 120);
    const start = locale === "ar" ? 70 : 320;
    const direction = locale === "ar" ? 1 : -1;
    await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: start, y }] });
    for (let step = 1; step <= 10; step++) await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: start + step * 23 * direction, y }] });
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => shelf.evaluate(el => Math.abs(el.scrollLeft))).toBeGreaterThan(100);
    expect(await page.evaluate(() => scrollX)).toBe(0);
    await client.detach();
  }
});
