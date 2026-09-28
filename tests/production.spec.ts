import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["ar", "en"]) {
  test(`Corporate document and return controls follow ${locale} semantics`, async ({
    page,
    request,
  }) => {
    await page.goto(`/${locale}/profile`);
    const controls = page.locator(".profile-controls");
    const previous = controls.getByRole("button", {
      name: locale === "ar" ? "السابق" : "Previous",
      exact: true,
    });
    const next = controls.getByRole("button", {
      name: locale === "ar" ? "التالي" : "Next",
      exact: true,
    });
    await expect(previous).toBeDisabled();
    await next.click();
    await expect(controls.locator("select")).toHaveValue("1");
    await previous.click();
    await expect(controls.locator("select")).toHaveValue("0");
    const transform = await next
      .locator("svg")
      .evaluate((e) => getComputedStyle(e).transform);
    expect(transform).toBe(
      locale === "ar" ? "matrix(-1, 0, 0, 1, 0, 0)" : "none",
    );
    await expect(page.locator(".document-download .arrow-down")).toHaveCSS(
      "transform",
      "none",
    );
    const pdf = await request.get(
      "/assets/documents/MBT-Company-Profile-2026.pdf",
    );
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
    expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
    await page.goto(`/${locale}/news`);
    await page.locator(".news-item").first().click();
    const back = page.locator(".article-body .text-link").last();
    await expect(back.locator(".arrow-back")).toHaveCount(1);
    const before = await back
      .locator("svg")
      .evaluate((e) => getComputedStyle(e).transform);
    await back.hover();
    expect(
      await back.locator("svg").evaluate((e) => getComputedStyle(e).transform),
    ).toBe(before);
    expect(before).toBe(locale === "ar" ? "none" : "matrix(-1, 0, 0, 1, 0, 0)");
    await back.click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/news$`));
  });
  test(`Public content and accessibility ${locale}`, async ({ page }) => {
    for (const route of [
      "profile",
      "companies",
      "brands/medcity",
      "business/pharma",
      "marketing/coverage-by-outlets",
      "marketing/sales-work-structure",
      "careers",
    ]) {
      await page.goto(`/${locale}/${route}`);
      const body = await page.locator("body").innerText();
      expect(body).not.toMatch(
        /official source|company source|archiv|migration|preserved|extraction|source records|record language|المصدر الرسمي|أرشيف|مؤرشف|لغة السجل|تاريخ الرفع/i,
      );
      expect(
        await page.locator('a[href^="https://www.mbtksa.com/"]').count(),
      ).toBe(0);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
  });
}
