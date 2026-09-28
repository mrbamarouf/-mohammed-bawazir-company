import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch();
const results=[];
for (const route of ['/en','/ar','/en/products','/ar/products']) {
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 await page.addInitScript(()=>{
  window.__metrics={lcp:0,cls:0};
  new PerformanceObserver(list=>{for(const e of list.getEntries())window.__metrics.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__metrics.cls+=e.value}).observe({type:'layout-shift',buffered:true});
 });
 await page.goto('http://localhost:3001'+route);
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForTimeout(2500);
 results.push(await page.evaluate(route=>{
  const nav=performance.getEntriesByType('navigation')[0];const resources=performance.getEntriesByType('resource');
  return {route,...window.__metrics,domContentLoaded:nav.domContentLoadedEventEnd,load:nav.loadEventEnd,resourceTransferBytes:resources.reduce((s,r)=>s+r.transferSize,0),scriptTransferBytes:resources.filter(r=>r.initiatorType==='script').reduce((s,r)=>s+r.transferSize,0),requests:resources.length,images:[...document.images].map(i=>({loading:i.loading,complete:i.complete,width:i.naturalWidth}))};
 },route));
 await context.close();
}
await browser.close();
await fs.writeFile('audit/performance.json',JSON.stringify({environment:'Local Chromium, production server, 1440×1000, no network/CPU throttling, new browser context per route. Lab check; not field Core Web Vitals.',results},null,2));
console.log(results.map(({images,...r})=>r));
