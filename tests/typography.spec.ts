import {test,expect} from '@playwright/test';
import products from '../content/products.json';
const engine=process.env.MOBILE_BROWSER==='webkit'?'webkit':'chromium';
test.use({browserName:engine});
for(const locale of ['ar','en']) test(`${locale}: real font weights, Arabic shaping runs and mixed script`,async({page})=>{
 await page.goto(`/${locale}/distribution`);await page.evaluate(()=>document.fonts.ready);
 const loaded=await page.evaluate(async()=>{
  const out=[];
  for(const family of ['Readex Pro','Archivo','Manrope'])for(const weight of [400,500,600,700]){
   const faces=await document.fonts.load(`${weight} 32px "${family}"`,family==='Readex Pro'?'التوريد، التوزيع، لا إله إلا الله':'Warehousing AV To fi ffi 1987');
   out.push({family,weight,faces:faces.map(f=>({weight:f.weight,status:f.status}))});
  }
  return out;
 });
 for(const item of loaded){expect(item.faces,`${item.family} ${item.weight}`).toEqual([{weight:String(item.weight),status:'loaded'}]);}
 const record=products.find(p=>p.language==='ar'&&p.image)!;
 await page.goto(`/${locale}/products/${record.slug}`);await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('h1')).toHaveAttribute('lang','ar');
 await expect(page.locator('h1 > bdi')).toHaveAttribute('dir','rtl');
 const sample=await page.locator('h1').evaluate(el=>{const s=getComputedStyle(el);return{family:s.fontFamily,spacing:s.letterSpacing,synthesis:s.fontSynthesis,feature:s.fontFeatureSettings};});
 expect(sample.family).toContain('Readex Pro');expect(['normal','0px']).toContain(sample.spacing);expect(sample.synthesis).toBe('none');expect(sample.feature).toBe('normal');
 if(engine==='chromium'){
  const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');
  const doc=await cdp.send('DOM.getDocument');const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:doc.root.nodeId,selector:'h1 > bdi'});
  const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});
  expect(fonts.length).toBeGreaterThan(0);expect(fonts.every((f:{isCustomFont:boolean;familyName:string})=>f.isCustomFont&&f.familyName.includes('Readex'))).toBeTruthy();
 }
 for(const width of [320,360,375,390,393,414,430,1366,1440,1728,1920]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 }
});
test('Arabic never inherits Latin tracking, including inline Arabic on English pages',async({page})=>{
 await page.goto('/en/distribution');
 await page.evaluate(()=>{
  const el=document.createElement('h2');el.innerHTML='<bdi lang="ar" dir="rtl">التوريد إلى الرف، توزيع العلامات (MBT) منذ 1987.</bdi>';
  el.style.letterSpacing='-.08em';document.querySelector('main')!.append(el);
 });
 const child=page.locator('main > h2 bdi');expect(await child.evaluate(el=>getComputedStyle(el).letterSpacing)).toBe('normal');
});
for (const locale of ['ar', 'en']) test(`${locale}: bilingual 404 isolates languages without Arabic tracking`, async ({page}) => {
 await page.goto(`/${locale}/products/missing-typography-qa-record`);
 const arabic=page.locator('.error-page h1 bdi[lang="ar"]');
 await expect(arabic).toHaveAttribute('dir','rtl');
 await page.evaluate(()=>document.fonts.ready);
 const style=await arabic.evaluate(el=>{const s=getComputedStyle(el);return {font:s.fontFamily,tracking:s.letterSpacing,synthesis:s.fontSynthesis};});
 expect(style.font).toContain('Readex Pro');expect(style.tracking).toBe('normal');expect(style.synthesis).toBe('none');
 for(const width of [320,390,1440,1920]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();}
});

// Both root layouts must import the shared CSS in the same order. Otherwise
// production chunk hoisting can let legacy mobile rules override typography.
test('production CSS keeps the Arabic hero scale and English tracking', async ({page}) => {
 await page.setViewportSize({width:320,height:900});
 await page.goto('/ar');
 await expect(page.locator('.authority-copy h1')).toHaveCSS('font-size','27px');
 await page.goto('/en');
 const tracking=await page.locator('.authority-copy h1').evaluate(el=>{const s=getComputedStyle(el);return parseFloat(s.letterSpacing)/parseFloat(s.fontSize);});
 expect(tracking).toBeCloseTo(-.015,3);
});
