/** Browser-only specimens use the real BidiText/error components and production CSS.
 * No diagnostic route or specimen content is shipped to visitors. */
import {chromium,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const require=createRequire(import.meta.url);
async function loadComponent(path){const source=await fs.readFile(path,'utf8');const output=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const exports={};new Function('React','exports','require',output)(React,exports,require);return exports;}
const {BidiText}=await loadComponent('components/bidi-text.tsx');
const {default:ErrorPage}=await loadComponent('app/[locale]/error.tsx');
const text=t=>renderToStaticMarkup(React.createElement(BidiText,{text:t}));
const error=renderToStaticMarkup(React.createElement(ErrorPage,{reset(){}}));
const base=process.env.TEST_BASE_URL||'http://localhost:3003';
const out=`audit/typography/${process.env.QA_RUN||'final'}/specimens`;await fs.mkdir(out+'/screenshots',{recursive:true});
const report=[];
for(const engine of ['chromium','webkit']){
 const browser=await ({chromium,webkit}[engine]).launch();
 for(const locale of ['ar','en']){
  const p=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  for(const width of [320,360,375,390,393,414,430,1366,1440,1728,1920]){
   await p.setViewportSize({width,height:1000});await p.goto(`${base}/${locale}/distribution`);await p.evaluate(async()=>{document.body.getBoundingClientRect();await new Promise(r=>requestAnimationFrame(r));await document.fonts.ready;});
   const phrase=locale==='ar'?'من التوريد إلى الرف.':'From warehouse to shelf.';
   const detail=locale==='ar'?'تَوْرِيدٌ وتَوْزِيعٌ؛ شراكاتٌ راسخةٌ، وعلاماتٌ مُتَجَدِّدَةٌ. لا، لأ، لإ، لآ.':'AVATAR To Wa: office, efficient fulfilment. ÁÉîç — “Partners.”';
   const mixed='شركة MBT منذ 1987؛ 38,000 م²، و250 ml. رقم الهاتف: +966 12 639 0000. ١٢٣٤٥٦٧٨٩٠';
   const samples=[400,500,600,700].map(weight=>`<section style="margin-block:20px"><p lang="en" dir="ltr">${weight}</p><h2 style="font-weight:${weight};font-size:clamp(24px,4vw,48px)">${text(phrase)}</h2><p style="font-weight:${weight};font-size:18px">${text(detail)}</p><p style="font-weight:${weight};font-size:18px">${text(mixed)}</p></section>`).join('');
   await p.locator('main').evaluate((el,html)=>{el.innerHTML=`<div class="wrap" style="padding-block:40px" id="specimens">${html}</div>`;},samples);await p.evaluate(async()=>{document.body.getBoundingClientRect();await new Promise(r=>requestAnimationFrame(r));await document.fonts.ready;});
   const check=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,fontErrors:[...document.fonts].filter(f=>f.status==='error').map(f=>f.family),arabicSpacing:[...document.querySelectorAll('#specimens bdi[lang="ar"]')].every(e=>getComputedStyle(e).letterSpacing==='normal'),phonePrefix:[...document.querySelectorAll('#specimens bdi[dir="ltr"]')].filter(e=>e.textContent.includes('966')).every(el=>{if(el.textContent!=='+966 12 639 0000')return false;const node=el.firstChild;const range=document.createRange();range.setStart(node,0);range.setEnd(node,1);const plus=range.getBoundingClientRect().x;range.setStart(node,1);range.setEnd(node,2);return plus<range.getBoundingClientRect().x;})}));
   report.push({engine,locale,width,kind:'weights-and-shaping',...check});
   if([320,1440].includes(width))await p.locator('#specimens').screenshot({path:`${out}/screenshots/${engine}-${locale}-${width}-weights.png`});
   await p.goto(`${base}/${locale}/products/missing-typography-qa-record`);await p.evaluate(async()=>{document.body.getBoundingClientRect();await new Promise(r=>requestAnimationFrame(r));await document.fonts.ready;});
   if([320,1440].includes(width))await p.locator('.error-page').screenshot({path:`${out}/screenshots/${engine}-${locale}-${width}-404.png`});
   report.push({engine,locale,width,kind:'404',overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
   await p.locator('main').evaluate((el,html)=>el.innerHTML=html,error);await p.evaluate(async()=>{document.body.getBoundingClientRect();await new Promise(r=>requestAnimationFrame(r));await document.fonts.ready;});
   if([320,1440].includes(width))await p.locator('.error-page').screenshot({path:`${out}/screenshots/${engine}-${locale}-${width}-error.png`});
   report.push({engine,locale,width,kind:'error-component',overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
  }
  for(const width of [320,390,1440]){
   await p.setViewportSize({width,height:900});await p.goto(`${base}/${locale}`);await p.evaluate(async()=>{document.body.getBoundingClientRect();await new Promise(r=>requestAnimationFrame(r));await document.fonts.ready;});
   await p.locator('.menu-toggle').click();await p.locator('.nav-dialog').screenshot({path:`${out}/screenshots/${engine}-${locale}-${width}-menu.png`});
   if(width<768){await p.goto(`${base}/${locale}/products`);await p.locator('.mobile-filter-toggle').click();await p.locator('.catalogue').screenshot({path:`${out}/screenshots/${engine}-${locale}-${width}-filters.png`});}
  }
  await p.close();
 }
 await browser.close();
}
await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));
const failures=report.filter(r=>r.overflow||r.fontErrors?.length||r.arabicSpacing===false||r.phonePrefix===false);console.log(JSON.stringify({checks:report.length,failures}));if(failures.length)process.exitCode=1;
