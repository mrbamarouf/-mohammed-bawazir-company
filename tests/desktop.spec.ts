import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import products from "../content/products.json";
const routes = [
  "",
  "about",
  "business",
  "brands",
  "products",
  "distribution",
  "companies",
  "news",
  "marketing",
  "careers",
  "contact",
  "profile",
];
for (const width of [1920, 1728, 1440, 1366])
  for (const locale of ["en", "ar"])
    test(`Desktop ${locale} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      for (const route of routes) {
        const response = await page.goto(`/${locale}/${route}`, {
          waitUntil: "domcontentloaded",
        });
        await page.evaluate(() => document.fonts.ready);
        expect(response?.status()).toBe(200);
        await expect(page.locator("h1")).toHaveCount(1);
        expect(await page.locator("html").getAttribute("dir")).toBe(
          locale === "ar" ? "rtl" : "ltr",
        );
        await expect(page.locator(".site-header")).toBeVisible();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `${locale}/${route} overflows at ${width}`,
        ).toBeTruthy();
      }
      expect(errors).toEqual([]);
    });
test("Catalogue supports search, empty states, filtering and product detail", async ({
  page,
}) => {
  await page.goto("/en/products");
  await expect(page.getByRole("status")).toContainText("products");
  await page.getByRole("searchbox").fill("Croissant");
  expect(await page.locator(".product-item").count()).toBeGreaterThan(0);
  await expect(page.locator(".product-item").first()).toContainText(
    "Croissant",
  );
  await page.locator(".product-item").first().click();
  await expect(page.locator(".product-detail h1")).toContainText("Croissant");
  await page.goBack();
  await page.getByRole("searchbox").fill("NO_MATCH_XYZZY");
  await expect(
    page.getByRole("heading", { name: "No matching products" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "View products" }).click();
  expect(
    Number((await page.getByRole("status").innerText()).match(/\d+/)?.[0]),
  ).toBeGreaterThan(350);
  await page.getByRole("button", { name: "Show more products" }).click();
  await expect(page.locator(".product-item")).toHaveCount(48);
});
test("Arabic catalogue and detail preserve original Arabic record", async ({
  page,
}) => {
  await page.goto("/ar/products");
  await page.getByRole("searchbox").fill("زيت");
  expect(await page.locator(".product-item").count()).toBeGreaterThan(0);
  await page.locator(".product-item").first().click();
  await expect(page.locator(".product-detail h1")).toHaveAttribute(
    "dir",
    "rtl",
  );
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".product-detail h1")).toHaveAttribute(
    "dir",
    "rtl",
  );
});
test("Network supports keyboard selection and menu traps focus", async ({
  page,
}) => {
  await page.goto("/en/distribution");
  const point = page
    .getByRole("button", { name: "Riyadh", exact: true })
    .first();
  await point.focus();
  await point.press("Enter");
  await expect(point).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".network-location h3")).toHaveText("Riyadh");
  await page.getByRole("button", { name: "Open all sections" }).click();
  await expect(page.locator(".nav-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".nav-dialog")).not.toBeVisible();
});
test("Enquiry validates input and prepares a real mailto handoff", async ({
  page,
}) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Prepare email enquiry" }).click();
  await expect(page.locator(".form-status")).toHaveCount(0);
  await page.getByLabel("Full name").fill("Desktop QA");
  await page.getByLabel("Company", { exact: true }).fill("Preview review");
  await page.getByLabel("Email address").fill("review@example.com");
  await page
    .getByLabel("How can we help?")
    .fill("Please review this enquiry composer.");
  await page.getByRole("button", { name: "Prepare email enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Complete sending");
  await expect(
    page.getByRole("link", { name: "Open the email draft again" }),
  ).toHaveAttribute("href", /^mailto:info@mbtksa.com\?subject=/);
});
test("Profile navigation, brand search and missing routes", async ({
  page,
}) => {
  await page.goto("/en/profile");
  await expect(page.locator(".profile-image img")).toBeVisible();
  const before = await page.locator(".profile-image img").getAttribute("alt");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  expect(await page.locator(".profile-image img").getAttribute("alt")).not.toBe(
    before,
  );
  await expect(
    page.getByRole("link", { name: "Download company profile" }),
  ).toHaveAttribute("href", "/assets/documents/MBT-Company-Profile-2026.pdf");
  await expect(page.locator(".profile-controls option")).toHaveCount(47);
  await page.goto("/en/profile/white-gate");
  await expect(page).toHaveURL(/\/en\/companies#white-gate$/);
  await page.goto("/en/brands");
  await page.getByRole("searchbox").fill("Reem");
  await expect(page.locator(".brand-directory>a")).toHaveCount(1);
  await page.locator(".brand-directory>a").click();
  await expect(page.locator("h1")).toHaveText("Reem");
  const response = await page.goto("/en/does-not-exist");
  expect(response?.status()).toBe(404);
});
for (const locale of ["en", "ar"])
  test(`Accessibility and image loading ${locale}`, async ({ page }) => {
    for (const route of ["", "products", "contact", "distribution"]) {
      await page.goto(`/${locale}/${route}`);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 70));
        }
        scrollTo(0, 0);
        await document.fonts.ready;
      });
      await page.waitForTimeout(700);
      const violations = (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations;
      expect(
        violations.map((v) => ({
          id: v.id,
          help: v.help,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            (images as HTMLImageElement[])
              .filter((i) => i.complete && !i.naturalWidth)
              .map((i) => i.src),
          ),
      ).toEqual([]);
    }
  });
test("Product source records all preserved and detail routes reachable", async ({
  request,
}) => {
  expect(products).toHaveLength(394);
  for (const p of [products[0], products[150], products[products.length - 1]]) {
    const res = await request.get(`/en/products/${p.slug}`);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain(p.name.replaceAll("&", "&amp;"));
  }
});

test("Marketing galleries and historical company records are preserved", async ({
  page,
}) => {
  await page.goto("/en/marketing/in-store-food-display");
  expect(await page.locator(".marketing-gallery img").count()).toBeGreaterThan(
    60,
  );
  await expect(page.locator(".marketing-gallery img").first()).toBeVisible();
  await page.goto("/en/companies");
  await expect(
    page.getByRole("heading", { name: "MBTech", exact: true }),
  ).toBeVisible();
  await page
    .locator("#mbtech")
    .getByRole("link", { name: "Talk to our team" })
    .click();
  await expect(page).toHaveURL(/\/en\/contact$/);
});
