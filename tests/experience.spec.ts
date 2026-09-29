import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import products from "../content/products.json";
const engine = process.env.MOBILE_BROWSER === "webkit" ? "webkit" : "chromium";
test.use({browserName:engine});
for(const locale of ['ar','en']) for(const width of [390,1440]) {
  test(`${locale} ${width} introduction, skip, session and language persistence`,async({page})=>{
    await page.setViewportSize({width,height:844});
    await page.goto(`/${locale}`);
    const intro=page.locator('.corporate-intro');
    await expect(intro).toBeVisible();
    await expect(intro).toHaveAttribute('open','');
    await expect(page.locator('.intro-skip')).toBeFocused();
    await expect(page.locator('.intro-identity .brand-mark')).toHaveAttribute('src',/mbt-png-logo/);
    await page.locator('.intro-skip').click();
    await expect(intro).not.toBeVisible();
    await expect(page.locator('header .identity')).toBeFocused();
    expect(await page.evaluate(()=>sessionStorage.getItem('mbt-intro-v2'))).toBe('seen');
    const other=locale==='ar'?'en':'ar';
    await page.locator('header .language').click();
    await expect(page.locator('html')).toHaveAttribute('lang',other);
    await expect(intro).not.toBeVisible();
    await page.reload(); await expect(intro).toBeVisible();
    await page.locator(".intro-skip").click(); await expect(intro).not.toBeVisible();
    await page.goto(`/${other}/products`); await expect(intro).not.toBeVisible();
    await page.goBack(); await expect(intro).not.toBeVisible();
    await page.goForward(); await expect(intro).not.toBeVisible();
    await page.goto(`/${locale}`);await expect(intro).not.toBeVisible();
  });
}
test('complete film, reduced motion, inner entry and keyboard exit',async({browser})=>{
  test.setTimeout(45000);
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto('/ar');await expect(page.locator('.corporate-intro')).toBeVisible();
  await expect(page.locator('.intro-identity .brand-mark')).toHaveCSS('opacity','1');
  await expect(page.locator('.corporate-intro')).not.toBeVisible({timeout:7500});
  await expect(page.locator('.authority-copy h1')).toBeInViewport();
  await page.close();
  const reduced=await browser.newPage({viewport:{width:320,height:568},reducedMotion:'reduce'});
  await reduced.goto('/en');await expect(reduced.locator('.intro-network')).not.toBeVisible();
  await expect(reduced.locator('.corporate-intro')).not.toBeVisible({timeout:2500});await reduced.close();
  const inner=await browser.newPage();await inner.goto('/ar/about');await expect(inner.locator('.corporate-intro')).not.toBeVisible();await inner.goto('/ar');await expect(inner.locator('.corporate-intro')).not.toBeVisible();await inner.close();
  const keyboard=await browser.newPage();await keyboard.goto('/en');await expect(keyboard.locator('.corporate-intro')).toBeVisible();await keyboard.keyboard.press('Escape');await expect(keyboard.locator('.corporate-intro')).not.toBeVisible();await keyboard.close();
});
for(const locale of ['ar','en']) test(`${locale} navigation, map, filters, touch and accessibility`,async({page})=>{
  test.setTimeout(120000);await page.setViewportSize({width:390,height:844});await page.addInitScript(()=>sessionStorage.setItem('mbt-intro-v2','seen'));
  await page.goto(`/${locale}/distribution`);
  await page.locator('.portrait-city.city-riyadh').click();
  await expect(page.locator('.mobile-city-detail h3')).toHaveText(locale==='ar'?'الرياض':'Riyadh');
  await expect(page).toHaveURL(/city=riyadh/);
  const selected=page.locator('.mobile-city-grid button[aria-pressed="true"]');await expect(selected).toHaveText(locale==='ar'?'الرياض':'Riyadh');
  await selected.focus();await page.keyboard.press(locale==='ar'?'ArrowLeft':'ArrowRight');await page.keyboard.press('Enter');await expect(page).toHaveURL(/city=dammam/);
  for(const selector of ['.portrait-city','.bottom-navigation a','.bottom-navigation button'])for(const item of await page.locator(selector).all()){const box=await item.boundingBox();expect(box!.width).toBeGreaterThanOrEqual(44);expect(box!.height).toBeGreaterThanOrEqual(44);}
  await page.locator(`.bottom-navigation a[href='/${locale}/products']`).click();await expect(page.locator(`.bottom-navigation a[aria-current=page]`)).toHaveAttribute('href',`/${locale}/products`);
  await page.locator('.mobile-filter-toggle').click();await expect(page.locator('.filter-sheet')).toBeVisible();
  await expect(page.locator('.bottom-navigation')).not.toBeVisible();
  await page.locator('.filter-sheet select').first().selectOption('reem');
  await expect(page.locator('.catalogue')).toHaveAttribute('aria-busy','false');
  const modalAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(modalAxe.violations).toEqual([]);
  await page.locator('.filter-sheet-actions .button').click();await expect(page.locator('.filter-sheet')).not.toBeVisible();await expect(page.locator('.mobile-filter-toggle')).toBeFocused();
  await page.locator('.bottom-navigation button').click();await expect(page.locator('.nav-dialog')).toBeVisible();await expect(page.locator('body')).toHaveCSS('overflow','hidden');
  await page.locator('.nav-dialog .close-button').click();await expect(page.locator('.bottom-navigation button')).toBeFocused();
  for(const route of ['','business','brands','products','distribution','news','contact','profile']){await page.goto(`/${locale}/${route}`);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);}
});
for(const locale of ['ar','en']) test(`${locale} full corresponding-route language matrix`,async({page})=>{
  test.setTimeout(120000);await page.setViewportSize({width:393,height:852});await page.addInitScript(()=>sessionStorage.setItem('mbt-intro-v2','seen'));
  const other=locale==='ar'?'en':'ar';const product=products.find(p=>p.language==='ar'&&p.image)!;
  for(const route of ['','about','business','brands?q=Reem','products?q=Croissant',`products/${product.slug}`,'distribution?city=riyadh','news?year=2025','careers','contact','profile?page=16']){
    await page.goto(`/${locale}/${route}`);await page.locator('header .language').click();await expect(page.locator('html')).toHaveAttribute('lang',other);expect(new URL(page.url()).pathname+new URL(page.url()).search).toBe(`/${other}/${route}`.replace(/\/$/,''));await expect(page.locator('.corporate-intro')).not.toBeVisible();await expect(page.locator('html')).toHaveAttribute('dir',other==='ar'?'rtl':'ltr');
    await page.locator('header .language').click();await expect(page.locator('html')).toHaveAttribute('lang',locale);await expect(page.locator('.corporate-intro')).not.toBeVisible();
  }
});
test('short screens, landscape rotation and desktop containment',async({page})=>{
  await page.addInitScript(()=>sessionStorage.setItem('mbt-intro-v2','seen'));
  for(const size of [{width:320,height:480},{width:390,height:667},{width:430,height:932},{width:667,height:375},{width:844,height:390},{width:1440,height:900}]){
    await page.setViewportSize(size);await page.goto('/ar');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
    if(size.width<768){await expect(page.locator('.bottom-navigation')).toBeVisible();await page.locator('.menu-toggle').click();await page.locator('.nav-dialog a[href="/ar/profile"]').scrollIntoViewIfNeeded();await expect(page.locator('.nav-dialog a[href="/ar/profile"]')).toBeInViewport();await page.keyboard.press('Escape');}
    else {await expect(page.locator('.bottom-navigation')).not.toBeVisible();await expect(page.locator('.mobile-sectors')).not.toBeVisible();await expect(page.locator('.desktop-story')).toBeVisible();}
  }
});
