/** Every public route, both engines and the complete requested width matrix.
 * DOM checks identify candidates; screenshots remain the visual acceptance gate.
 */
import {chromium,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const base=process.env.TEST_BASE_URL||'http://localhost:3003';
const engine=process.env.QA_ENGINE||'chromium';
const out=`audit/typography/${process.env.QA_RUN||'local'}/${engine}`;
await fs.mkdir(`${out}/screenshots`,{recursive:true});
const manifest=JSON.parse(await fs.readFile('.next/prerender-manifest.json'));
const all=Object.keys(manifest.routes).filter(r=>/^\/(ar|en)(\/|$)/.test(r)).sort();
const routes=process.env.QA_ROUTES?all.filter(r=>process.env.QA_ROUTES.split(',').includes(r)):all;
const widths=(process.env.QA_WIDTHS||'320,360,375,390,393,414,430,1366,1440,1728,1920').split(',').map(Number);
const browser=await (engine==='webkit'?webkit:chromium).launch();
const results=[],visual=[],seen=new Set();let cursor=0;
const scan=()=>{
 const failures=[],headings=[],families=new Set();let count=0;
 const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility==='visible'&&!e.closest('.sr-only,svg,script,style,nextjs-portal,[aria-hidden="true"]');
 const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walk.nextNode()){
  const node=walk.currentNode,e=node.parentElement,t=node.textContent.trim();
  if(!t||!visible(e))continue;
  const s=getComputedStyle(e);families.add(`${s.fontFamily}|${s.fontWeight}`);count++;
  if(/[\u0620-\u065f]/.test(t)&&!['normal','0px'].includes(s.letterSpacing))failures.push({kind:'arabic-tracking',text:t,spacing:s.letterSpacing});
  if(s.fontSynthesis!=='none')failures.push({kind:'synthesis',text:t});
 }
 for(const e of document.querySelectorAll('h1,h2,h3')){
  if(!visible(e))continue;
  const s=getComputedStyle(e),box=e.getBoundingClientRect();const lines=[];
  const walker=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
   const n=walker.currentNode;
   for(const m of n.textContent.matchAll(/\S+/gu)){
    const range=document.createRange();range.setStart(n,m.index);range.setEnd(n,m.index+m[0].length);
    for(const r of range.getClientRects()){
     if(!r.width)continue;
     let line=lines.find(l=>Math.abs(l.y-r.y)<Math.min(12,parseFloat(s.fontSize)*.3));
     if(!line){line={y:r.y,left:r.left,right:r.right,words:[]};lines.push(line);}
     line.left=Math.min(line.left,r.left);line.right=Math.max(line.right,r.right);line.words.push(m[0]);
     if(r.left<box.left-2||r.right>box.right+2)failures.push({kind:'heading-overflow',text:e.textContent,word:m[0],amount:Math.max(box.left-r.left,r.right-box.right)});
    }
   }
  }
  lines.sort((a,b)=>a.y-b.y);
  const text=e.innerText.trim();headings.push({tag:e.tagName,text,font:s.fontFamily,weight:s.fontWeight,size:s.fontSize,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,lines:lines.map(l=>l.words.join(' '))});
  if(lines.some(l=>l.words.every(w=>/^[\p{P}\p{S}]+$/u.test(w))))failures.push({kind:'punctuation-line',text});
  if(e.tagName!=='H3'&&lines.length>1&&text.split(/\s+/u).length>=5&&lines.at(-1).words.length===1&&(lines.at(-1).right-lines.at(-1).left)<box.width*.4)failures.push({kind:'orphan-candidate',text,lines:lines.map(l=>l.words.join(' '))});
 }
 return {overflow:document.documentElement.scrollWidth>innerWidth+1,count,families:[...families],failures,headings,fonts:[...document.fonts].filter(f=>f.status==='error').map(f=>f.family)};
};
await Promise.all(Array.from({length:Number(process.env.QA_WORKERS||3)},async()=>{
 const p=await browser.newPage({viewport:{width:320,height:844},deviceScaleFactor:1,reducedMotion:'reduce'});let errors=[];
 await p.addInitScript(()=>sessionStorage.setItem('mbt-intro-v2','seen'));
 p.on('pageerror',e=>errors.push(e.message));
 // Do not load photos during a text-only geometry sweep; font requests are real.
 // Full visual captures use the separate normal-network template sweep.
 await p.route('**/*',route=>route.request().resourceType()==='image'?route.abort():route.continue());
 while(cursor<routes.length){
  const path=routes[cursor++];errors=[];const row={path,checks:[]};
  try{
   const response=await p.goto(base+path,{waitUntil:'load',timeout:60000});row.status=response.status();await p.evaluate(()=>document.fonts.ready);
   await p.addStyleTag({content:'html{scroll-behavior:auto!important}nextjs-portal{display:none!important}*,*::before,*::after{animation:none!important;transition:none!important}'});
   for(const width of widths){
    await p.setViewportSize({width,height:width===320?568:1000});await p.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(r));});
    const check=await p.evaluate(scan);row.checks.push({width,...check});
    if(process.env.QA_CAPTURE!=="0"&&(width===320||width===1440)){
     // Capture each unique heading/content block at its actual page position.
     // Duplicate global header/footer text is reviewed once per locale/template.
     const blocks=p.locator('main h1, main h2, main h3, main p, main dt, main dd, main address');
     for(let i=0;i<await blocks.count();i++){
      const el=blocks.nth(i);if(!await el.isVisible())continue;
      const data=await el.evaluate(e=>{const s=getComputedStyle(e);return{text:e.textContent,font:s.fontFamily,size:s.fontSize,weight:s.fontWeight,html:e.innerHTML,width:e.getBoundingClientRect().width,spacing:s.letterSpacing,line:s.lineHeight,capture:2}});
      const key=crypto.createHash('sha256').update(JSON.stringify({...data,width})).digest('hex').slice(0,16);
      if(seen.has(key))continue;seen.add(key);
      const file=`${width}-${key}.png`;await el.scrollIntoViewIfNeeded();const rect=await el.boundingBox();const x=Math.max(0,rect.x-4),y=Math.max(0,rect.y-4);await p.screenshot({path:`${out}/screenshots/${file}`,clip:{x,y,width:Math.min(width-x,rect.width+8),height:rect.height+8},timeout:10000});visual.push({path,file,...data,viewport:width});
     }
    }
   }
   row.errors=[...errors];
  }catch(e){row.error=String(e);}
  results.push(row);
  if(results.length%25===0){console.log(engine,results.length,'/',routes.length);await fs.writeFile(`${out}/report.json`,JSON.stringify({base,engine,widths,total:routes.length,results,visual},null,2));}
 }
 await p.close();
}));
await browser.close();
await fs.writeFile(`${out}/report.json`,JSON.stringify({base,engine,widths,total:routes.length,results,visual},null,2));
console.log('COMPLETE',engine,results.length,'routes',visual.length,'unique rendered crops');
