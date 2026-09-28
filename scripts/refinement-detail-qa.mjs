import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const products=JSON.parse(await fs.readFile('content/products.json'));
const articles=JSON.parse(await fs.readFile('content/articles.json'));
const routes=[
 'business/food','business/beverages','business/household','business/personal-care','business/pharma','business/tobacco',
 'brands/reem','brands/medcity',
 'products/'+products.find(p=>p.language==='ar').slug,
 'products/'+products.find(p=>p.language==='en').slug,
 'news/'+articles[0].slug,'profile/2018','profile/mbtech','privacy',
];
const b=await chromium.launch();const results=[];const errors=[];
for(const locale of ['ar','en']) {
 const page=await b.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>errors.push({locale,message:e.message}));
 for(const [index,route] of routes.entries()) {
  const response=await page.goto('http://localhost:3001/'+locale+'/'+route);
  await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
  const check=await page.evaluate(()=>({title:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)}));
  await page.screenshot({path:`audit/screenshots/refinement/detail-${locale}-${String(index).padStart(2,'0')}.jpg`,fullPage:true,type:'jpeg',quality:85});
  results.push({locale,route,status:response.status(),...check});
 }
 await page.goto('http://localhost:3001/'+locale+'/profile');
 const next=page.getByRole('button',{name:locale==='ar'?'التالي':'Next',exact:true});
 const prev=page.getByRole('button',{name:locale==='ar'?'السابق':'Previous',exact:true});
 await next.click();const afterNext=await page.locator('.profile-controls select').inputValue();
 await prev.click();const afterPrevious=await page.locator('.profile-controls select').inputValue();
 const arrows=await page.locator('.profile-controls .arrow,.footer-bottom .arrow').evaluateAll(es=>es.map(e=>({class:e.getAttribute('class'),direction:getComputedStyle(e).direction,transform:getComputedStyle(e).transform})));
 results.push({locale,route:'profile-controls',afterNext,afterPrevious,arrows});
 await page.close();
}
await b.close();
await fs.writeFile('audit/refinement/detail-pages.json',JSON.stringify({results,errors},null,2));
console.log(results.length,'detail/control checks',errors.length,'browser errors');
