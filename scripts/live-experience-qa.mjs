/** Real network and screenshot verification of the review deployment. */
import { chromium, webkit } from '@playwright/test';
import fs from 'node:fs/promises';
import products from '../content/products.json' with {type:'json'};
const base=process.env.TEST_BASE_URL || 'https://mohammed-bawazir-company.vercel.app';
const engine=process.env.QA_ENGINE || 'chromium';
const out=`audit/mobile/${process.env.QA_RUN||'deployed-app'}/${engine}`;await fs.mkdir(`${out}/screenshots`,{recursive:true});
const browser=await (engine==='webkit'?webkit:chromium).launch();
const routes=['','about','business',...['food','beverages','household','personal-care','pharma','tobacco'].map(s=>'business/'+s),'brands','brands/reem','products','products/'+products.find(p=>p.language==='ar'&&p.image).slug,'products/'+products[0].slug,'distribution','news','news/36463-mbt-in-a-week-without-sugar','marketing','careers','contact','profile','companies','privacy'];
const errors=[],requests=[],report=[];
for(const locale of ['ar','en'])for(const width of [390,320,430,1440,1920]) {
 const p=await browser.newPage({viewport:{width,height:width===320?568:width<768?844:1000},isMobile:width<768,hasTouch:width<768});
 await p.addInitScript(()=>sessionStorage.setItem('mbt-intro-v2','seen'));
 p.on('pageerror',e=>errors.push({locale,width,error:e.message}));
 p.on('console',m=>{if(m.type()==='error')errors.push({locale,width,error:m.text()});});
 p.on('response',r=>{if(r.status()>=400)requests.push({locale,width,status:r.status(),url:r.url()});});
 const selected=width===390||width===1440?routes:['','products','distribution'];
 for(const route of selected) {
  const response=await p.goto(`${base}/${locale}${route?'/'+route:''}`,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
  await p.addStyleTag({content:'.marquee-track{animation-play-state:paused!important}html{scroll-behavior:auto!important}'});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,45));}const images=[...document.images].filter(i=>i.getClientRects().length);images.forEach(i=>i.loading='eager');await Promise.race([Promise.all(images.map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,15000))]);window.scrollTo({top:0,behavior:'instant'});});
  await p.waitForTimeout(150);
  const check=await p.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>i.getClientRects().length&&!i.naturalWidth).map(i=>i.src),h1:document.querySelectorAll('h1').length,fonts:[...document.fonts].filter(f=>f.status==='error').map(f=>f.family),family:getComputedStyle(document.body).fontFamily,green:getComputedStyle(document.documentElement).getPropertyValue('--mbt-green').trim(),bottomNavigation:getComputedStyle(document.querySelector('.bottom-navigation')).display}));
  const name=`${locale}-${width}-${(route||'home').replaceAll('/','-')}`;
  await p.screenshot({path:`${out}/screenshots/${name}.jpg`,fullPage:true,type:'jpeg',quality:85});
  if(!route)await p.screenshot({path:`${out}/screenshots/${name}-first.jpg`,type:'jpeg',quality:90});
  report.push({locale,width,route,status:response.status(),...check});console.log(locale,width,route||'home',check.overflow||check.broken.length?'FAIL':'OK');
  await fs.writeFile(`${out}/report.json`,JSON.stringify({base,engine,report,errors,requests},null,2));
 }
 await p.close();
}
await browser.close();
if(errors.length||requests.length||report.some(r=>r.status!==200||r.overflow||r.broken.length||r.h1!==1||r.fonts.length||r.green!=='#07523b'))process.exitCode=1;
