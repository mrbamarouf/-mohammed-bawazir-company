import { test, expect } from "@playwright/test";
import brands from "../content/brands.json";
import products from "../content/products.json";
import sourceProducts from "../audit/redesign/source-products.json";

for (const locale of ["ar", "en"])
  test(`Brand tracks ${locale} cover the viewport at every phase, preserve all marks, and pause`, async ({
    page,
  }) => {
    await page.goto("/" + locale);
    await page.locator(".brand-world").scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      [
        ...document.querySelectorAll<HTMLImageElement>(".marquee-brand img"),
      ].every((image) => image.complete && image.naturalWidth > 0),
    );
    const expected = brands
      .filter((b) => b.image)
      .map((b) => b.slug)
      .sort();
    const actual = await page
      .locator(".marquee-group:not([aria-hidden]) a")
      .evaluateAll((els) =>
        els.map((el) => el.getAttribute("href")!.split("/").pop()).sort(),
      );
    expect(actual).toEqual(expected);
    for (const row of await page.locator(".marquee-window").all()) {
      const coverage = await row.evaluate(async (win) => {
        const track = win.querySelector(".marquee-track")!;
        const animation = track.getAnimations()[0];
        const duration = Number(animation.effect!.getTiming().duration);
        animation.pause();
        const samples = [];
        for (const fraction of [0, 0.25, 0.5, 0.999999]) {
          animation.currentTime = duration * fraction;
          await new Promise(requestAnimationFrame);
          const bounds = win.getBoundingClientRect();
          const groups = [...track.children].map((el) =>
            el.getBoundingClientRect(),
          );
          samples.push({
            equal: Math.abs(groups[0].width - groups[1].width) < 0.1,
            joined: Math.abs(groups[0].right - groups[1].left) < 0.1,
            covered:
              groups[0].left <= bounds.left + 1 &&
              groups[1].right >= bounds.right - 1,
          });
        }
        animation.play();
        return samples;
      });
      expect(
        coverage.every((s) => s.equal && s.joined && s.covered),
      ).toBeTruthy();
    }
    await page
      .getByRole("button", {
        name: locale === "ar" ? "إيقاف الحركة" : "Pause motion",
      })
      .click();
    await expect(page.locator(".brand-world")).toHaveClass(/is-paused/);
    expect(
      await page
        .locator(".marquee-track")
        .first()
        .evaluate((el) => getComputedStyle(el).animationPlayState),
    ).toBe("paused");
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(
      await page
        .locator(".marquee-track")
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
    await expect(
      page.locator(".marquee-group[aria-hidden]").first(),
    ).not.toBeVisible();
  });

test("Homepage product families update with six distinct working portfolio links", async ({
  page,
}) => {
  for (const locale of ["en", "ar"]) {
    await page.goto("/" + locale);
    const tabs = page.locator(".universe-tabs button");
    for (let i = 0; i < 4; i++) {
      await tabs.nth(i).click();
      await expect(tabs.nth(i)).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".product-shelf>a")).toHaveCount(6);
      const hrefs = await page
        .locator(".product-shelf>a")
        .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
      expect(new Set(hrefs).size).toBe(6);
    }
    await page.locator(".product-shelf>a").last().click();
    await expect(page.locator(".product-detail h1")).toBeVisible();
  }
});

test("News year/search filters preserve all stories and reset empty results", async ({
  page,
}) => {
  await page.goto("/en/news");
  await expect(page.locator(".news-item")).toHaveCount(33);
  await page
    .getByRole("combobox", { name: "Year", exact: true })
    .selectOption("2025");
  expect(await page.locator(".news-item").count()).toBeLessThan(33);
  await page.getByRole("searchbox").fill("NO_MATCH_REDESIGN");
  await expect(
    page.getByRole("heading", { name: "No matching stories" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset search" }).click();
  await expect(page.locator(".news-item")).toHaveCount(33);
});

test("Source records stay intact while uncategorized records gain verified discovery metadata", async ({
  page,
}) => {
  expect(products).toHaveLength(394);
  for (const p of products)
    expect(() => decodeURIComponent(p.slug)).not.toThrow();
  for (const p of sourceProducts) {
    const current = products.find((x) => x.id === p.id)!;
    expect(current.name).toBe(p.name);
    expect(current.source).toBe(p.source);
    expect(current.categoryIds).toEqual(p.categoryIds);
  }
  await page.goto("/ar/products");
  await page.getByRole("searchbox").fill("باستادورو");
  await page.getByRole("button", { name: "الأغذية", exact: true }).click();
  expect(await page.locator(".product-item").count()).toBeGreaterThan(0);
  await page.goto("/en/brands");
  await page.getByRole("searchbox").fill("Carina");
  await expect(page.locator(".brand-directory>a")).toHaveCount(1);
  await page.locator(".brand-directory>a").click();
  await expect(page.locator("h1")).toHaveText("Carina");
});
