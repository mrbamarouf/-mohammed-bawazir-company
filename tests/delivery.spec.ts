import { test, expect } from '@playwright/test';
import { branches } from '../lib/company';
import { projectSaudi, saudiPaths } from '../lib/saudi-map';
import { productPresentation } from '../lib/product-copy';
import products from '../content/products.json';
import categories from '../content/categories.json';
import categoryLabels from '../content/category-labels.json';
import type { Product } from '../lib/types';
const engine=process.env.MOBILE_BROWSER==='webkit'?'webkit':'chromium';
test.use({browserName:engine});
const widths=[320,360,375,390,393,414,430,1366,1440,1728,1920];
for(const locale of ['ar','en'] as const) test(`${locale}: complete shared geography and eight accessible accurate locations`,async({page})=>{
 test.setTimeout(180000);
 await page.addInitScript(()=>sessionStorage.setItem('mbt-intro-v2','seen'));
 await page.goto(`/${locale}/distribution`);
 expect(branches.map(b=>b.id)).toEqual(['jeddah','riyadh','dammam','tabuk','qassim','madinah','khamis','jizan']);
 expect(saudiPaths).toHaveLength(4);
 expect(await page.locator('.country-shape').evaluateAll(els=>els.map(e=>e.getAttribute('d')))).toEqual(saudiPaths);
 expect(await page.locator('.portrait-land').evaluateAll(els=>els.map(e=>e.getAttribute('d')))).toEqual(saudiPaths);
 for(const width of widths){
  await page.setViewportSize({width,height:width<768?844:1000});await page.evaluate(()=>document.fonts.ready);
  if(width<768){
   const map=page.locator('.portrait-map');await map.scrollIntoViewIfNeeded();
   const bounds=await map.locator('svg').evaluate(svg=>{const root=svg as SVGSVGElement,v=root.viewBox.baseVal;return [...root.querySelectorAll<SVGGraphicsElement>('.portrait-land')].every(p=>{const b=p.getBBox();return b.x>=v.x&&b.y>=v.y&&b.x+b.width<=v.x+v.width&&b.y+b.height<=v.y+v.height;});});expect(bounds).toBeTruthy();
   const boxes=await page.locator('.portrait-city').evaluateAll(els=>els.map(e=>{const b=e.getBoundingClientRect();return{x:b.x,y:b.y,width:b.width,height:b.height,label:e.textContent};}));
   expect(boxes).toHaveLength(8);
   const signature=await page.locator('.portrait-map-signature img,.portrait-map-signature > span').evaluateAll(els=>els.map(e=>{const b=e.getBoundingClientRect();return{x:b.x,y:b.y,width:b.width,height:b.height};}));
   for(const b of boxes)for(const c of signature)expect(b.x<c.x+c.width&&b.x+b.width>c.x&&b.y<c.y+c.height&&b.y+b.height>c.y,`${width}: ${b.label} overlaps signature`).toBeFalsy();
   for(const [i,b] of boxes.entries()){
    expect(b.width).toBeGreaterThanOrEqual(44);expect(b.height).toBeGreaterThanOrEqual(44);expect(b.x).toBeGreaterThanOrEqual(0);expect(b.x+b.width).toBeLessThanOrEqual(width);
    for(const c of boxes.slice(i+1))expect(b.x<c.x+c.width&&b.x+b.width>c.x&&b.y<c.y+c.height&&b.y+b.height>c.y,`${width}: ${b.label}/${c.label}`).toBeFalsy();
   }
   for(const [i,branch] of branches.entries()){
    const circle=page.locator('.portrait-dot').nth(i).locator('circle').first();const [x,y]=projectSaudi(branch.lon,branch.lat);expect(Number(await circle.getAttribute('cx'))).toBeCloseTo(x);expect(Number(await circle.getAttribute('cy'))).toBeCloseTo(y);
    await page.locator(`.city-${branch.id}`).click();await expect(page.locator('.mobile-city-detail h3')).toHaveText(branch.name[locale]);await expect.poll(()=>new URL(page.url()).searchParams.get('city') || 'jeddah').toBe(branch.id);
   }
  }else{await expect(page.locator('.network-map')).toBeVisible();await expect(page.locator('.portrait-map')).not.toBeVisible();}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
});
for(const locale of ['ar','en']) test(`${locale}: refresh always replays, including after skip and on inner routes at all widths`,async({browser})=>{
 test.setTimeout(180000);
 for(const width of widths){
  const p=await browser.newPage({viewport:{width,height:width<768?844:1000}});
  await p.goto(`/${locale}`);await expect(p.locator('.corporate-intro')).toBeVisible();
  const logo=p.locator('.intro-identity .brand-mark');await expect(logo).toHaveAttribute('src','/assets/mbt/78224d6-mbt-png-logo.png');
  expect(await logo.evaluate((i:HTMLImageElement)=>({width:i.naturalWidth,height:i.naturalHeight,complete:i.complete}))).toEqual({width:550,height:202,complete:true});
  const box=await logo.boundingBox();expect(box!.width).toBeGreaterThanOrEqual(width<768?200:350);expect(box!.width/box!.height).toBeCloseTo(550/202,1);
  await p.locator('.intro-skip').click();await expect(p.locator('.corporate-intro')).not.toBeVisible();
  await p.reload();await expect(p.locator('.corporate-intro')).toBeVisible();await p.locator('.intro-skip').click();await expect(p.locator('.corporate-intro')).not.toBeVisible();
  await p.goto(`/${locale}/brands`);await expect(p.locator('.corporate-intro')).not.toBeVisible();
  await p.reload();await expect(p.locator('.corporate-intro')).toBeVisible();await p.locator('.intro-skip').click();await expect(p.locator('.corporate-intro')).not.toBeVisible();
  await p.locator('header .language').click();await expect(p.locator('html')).toHaveAttribute('lang',locale==='ar'?'en':'ar');await expect(p.locator('.corporate-intro')).not.toBeVisible();
  await p.goBack();await expect(p.locator('.corporate-intro')).not.toBeVisible();await p.goForward();await expect(p.locator('.corporate-intro')).not.toBeVisible();await p.close();
 }
});
test('reduced motion reload retains the short logo sequence',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/en');await expect(page.locator('.intro-network')).not.toBeVisible();await expect(page.locator('.corporate-intro')).not.toBeVisible({timeout:2500});await page.reload();await expect(page.locator('.corporate-intro')).toBeVisible();await expect(page.locator('.intro-network')).not.toBeVisible();await expect(page.locator('.corporate-intro')).not.toBeVisible({timeout:2500});
});
test('product editing preserves source identities and verified quantities, and localizes every category',()=>{
 const labels=categoryLabels as Record<string,{ar:string;en:string}>;
 for(const c of categories){expect(labels[String(c.id)]?.ar).toMatch(/[\u0620-\u065f]/);expect(labels[String(c.id)]?.en).toMatch(/[A-Za-z]/);expect(labels[String(c.id)]?.en).not.toMatch(/-ar$/);}
 const copy=(id:number)=>productPresentation(products.find(p=>p.id===id) as Product);
 expect(copy(34436).displayName).toBe('تروبيكانا سليم — قهوة لاتيه خالية من السكر 12 × 10 أكياس');
 expect(copy(9765).displayName).toBe('ريم — زيت زيتون بكر ممتاز 250 مل');
 expect(copy(36643).displayName).toBe('Lafa berry soufflé cake 8 × 3 × 70 g');
 expect(copy(34405).displayName).toBe('ريم زيت زيتون بكر ممتاز');
 expect(products.find(p=>p.id===34405)?.name).toContain('240');
 const exceptions=new Set([34405,6498,34448,6488,34443,6478,34388,35777,35775,35727,35723,35721,35715,35789]);
 for(const p of products){const edited=productPresentation(p as Product);expect(edited.displayName.length).toBeGreaterThan(1);if(!exceptions.has(p.id))expect(edited.displayName.match(/\d+(?:\.\d+)?/g)).toEqual(p.name.match(/\d+(?:\.\d+)?/g));}
});

for(const locale of ['ar','en']) test(`${locale}: product quantities stay with units on narrow screens`,async({page})=>{
 const product=products.find(p=>p.id===36425)!;
 await page.goto(`/${locale}/products/${product.slug}`);
 for(const width of [320,360,390,430]){
  await page.setViewportSize({width,height:844});await page.evaluate(()=>document.fonts.ready);
  const runs=await page.locator('h1').evaluate(el=>{const out=[];const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);while(walk.nextNode()){const n=walk.currentNode;for(const m of n.textContent!.matchAll(/\d+\u00a0g/g)){const r=document.createRange();r.setStart(n,m.index!);r.setEnd(n,m.index!+m[0].length);out.push([...r.getClientRects()].length);}}return out;});
  expect(runs).toEqual([1,1,1]);
 }
});

test('rapid location changes preserve the latest selection and locale context without History API errors',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/ar/distribution');
 await page.evaluate(async()=>{const buttons=[...document.querySelectorAll<HTMLButtonElement>('.portrait-city')];for(let i=0;i<120;i++){buttons[i%buttons.length].click();await new Promise(r=>setTimeout(r,35));}buttons[1].click();(document.querySelector('header .language') as HTMLAnchorElement).click();});
 await expect(page).toHaveURL(/\/en\/distribution\?city=riyadh$/);await expect(page.locator('.mobile-city-detail h3')).toHaveText('Riyadh');await expect(page.locator('.corporate-intro')).not.toBeVisible();expect(errors).toEqual([]);
});

for(const destination of ['language','products']) test(`pending map URL cannot cancel slow ${destination} navigation`,async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/ar/distribution');
 await page.locator('.city-tabuk').click();await expect(page).toHaveURL(/city=tabuk$/);
 const target=destination==='language'?'/en/distribution':'/ar/products';
 await page.route(`**${target}*`,async route=>{await new Promise(resolve=>setTimeout(resolve,800));await route.continue();});
 await page.evaluate(kind=>{
  (document.querySelector('.city-dammam') as HTMLButtonElement).click();
  (document.querySelector('.city-riyadh') as HTMLButtonElement).click();
  const selector=kind==='language'?'header .language':'.bottom-navigation a[href="/ar/products"]';
  (document.querySelector(selector) as HTMLAnchorElement).click();
 },destination);
 await expect(page).toHaveURL(new RegExp(target+(destination==='language'?'\\?city=riyadh':'')+'$'));
 if(destination==='language')await expect(page.locator('.mobile-city-detail h3')).toHaveText('Riyadh');
 else await expect(page.locator('.catalogue')).toBeVisible();
 await expect(page.locator('.corporate-intro')).not.toBeVisible();
});

for(const locale of ['ar','en'] as const) test(`${locale}: desktop city selection survives locale and viewport changes`,async({page})=>{
 await page.goto(`/${locale}/distribution?city=riyadh`);
 await expect(page.locator('.network-location h3')).toHaveText(branches[1].name[locale]);
 await page.locator('.branch-index button').nth(2).click();
 await expect(page.locator('.network-location h3')).toHaveText(branches[2].name[locale]);
 await expect(page).toHaveURL(/city=dammam$/);
 await page.locator('header .language').click();
 const other=locale==='ar'?'en':'ar';
 await expect(page).toHaveURL(new RegExp(`/${other}/distribution\\?city=dammam$`));
 await expect(page.locator('.network-location h3')).toHaveText(branches[2].name[other]);
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('.mobile-city-detail h3')).toHaveText(branches[2].name[other]);
 await page.locator('.city-madinah').click();
 await expect(page.locator('.mobile-city-detail h3')).toHaveText(branches[5].name[other]);
 await page.setViewportSize({width:1440,height:1000});
 await expect(page.locator('.network-location h3')).toHaveText(branches[5].name[other]);
 await expect(page.locator('.corporate-intro')).not.toBeVisible();
});
