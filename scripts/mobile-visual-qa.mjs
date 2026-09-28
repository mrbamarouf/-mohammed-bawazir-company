import {chromium, webkit} from '@playwright/test';
import fs from 'node:fs/promises';
import products from '../content/products.json' with {type:'json'};
const base=process.env.TEST_BASE_URL || 'http://localhost:3002';
const run=process.env.QA_RUN || 'local';
const dir=`audit/mobile/${run}`;await fs.mkdir(dir+'/screenshots',{recursive:true});
const engine=process.env.QA_ENGINE || 'chromium';
const browser=await (engine==='webkit'?webkit:chromium).launch();
const widths=(process.env.QA_WIDTHS || '320,360,375,390,393,414,430').split(',').map(Number);
const routes=(process.env.QA_ROUTES || ',about,business,business/food,business/beverages,business/household,business/personal-care,business/pharma,business/tobacco,brands,brands/reem,products,distribution,news,profile,careers,contact,companies,marketing').split(',');
if(!process.env.QA_ROUTES)routes.push('products/'+products.find(p=>p.language==='ar'&&p.image).slug,'products/'+products[0].slug,'news/36463-mbt-in-a-week-without-sugar');
const report=[],errors=[];
for(const locale of ['ar','en']) for(const width of widths) {
 const page=await browser.newPage({viewport:{width,height:width===320?568:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 await page.addInitScript(()=>sessionStorage.setItem('mbt-intro-v2','seen'));
 page.on('pageerror',e=>errors.push({locale,width,message:e.message}));
 for(const route of routes) {
  const response=await page.goto(`${base}/${locale}/${route}`);await page.evaluate(()=>document.fonts.ready);
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}nextjs-portal{display:none!important}.marquee-track{animation-play-state:paused!important}'});
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=750){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,35));}const visible=[...document.images].filter(i=>i.getClientRects().length);visible.forEach(i=>i.loading='eager');await Promise.race([Promise.all(visible.map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,10000))]);window.scrollTo({top:0,behavior:'instant'});});
  await page.waitForTimeout(120);
  const name=(route||'home').replaceAll('/','-');
  await page.screenshot({path:`${dir}/screenshots/${locale}-${width}-${name}.jpg`,type:'jpeg',quality:85,fullPage:true});
  if(!route)await page.screenshot({path:`${dir}/screenshots/${locale}-${width}-first-screen.jpg`,type:'jpeg',quality:92});
  const check=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.body.scrollHeight,broken:[...document.images].filter(i=>i.getClientRects().length&&!i.naturalWidth).map(i=>i.src),h1:document.querySelectorAll('h1').length}));
  report.push({locale,width,route,status:response.status(),...check});console.log(locale,width,route||'home',check.scrollWidth>width?'OVERFLOW':'OK');
  await fs.writeFile(`${dir}/visual-${engine}.json`,JSON.stringify({base,engine,report,errors},null,2));
 }
 await page.close();
}
await browser.close();if(errors.length||report.some(r=>r.status!==200||r.scrollWidth>r.width+1||r.broken.length||r.h1!==1))process.exitCode=1;
