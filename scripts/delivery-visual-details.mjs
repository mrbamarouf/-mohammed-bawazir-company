/** Captures the real intro climax and all location states, without substituting artwork. */
import {chromium,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3003';
const engine=process.env.QA_ENGINE||'chromium';
const dir=`audit/delivery/screenshots/${engine}`;await fs.mkdir(dir,{recursive:true});
const browser=await(engine==='webkit'?webkit:chromium).launch();
const widths=[320,360,375,390,393,414,430,1366,1440,1728,1920];
for(const locale of ['ar','en'])for(const width of widths){
 const p=await browser.newPage({viewport:{width,height:width===320?568:width<768?844:1000}});
 await p.goto(`${base}/${locale}`);await p.locator('.corporate-intro[open]').waitFor();await p.evaluate(()=>document.fonts.ready);
 // Inspect the actual final keyframe; timings and completion behavior are covered by the functional tests.
 await p.evaluate(()=>{for(const a of document.querySelector('.corporate-intro').getAnimations({subtree:true})){a.pause();a.currentTime=4800;}});
 await p.screenshot({path:`${dir}/intro-${locale}-${width}.png`});
 await p.locator('.intro-skip').click();await p.locator('.corporate-intro[open]').waitFor({state:'hidden'});
 await p.goto(`${base}/${locale}/distribution`);await p.evaluate(()=>document.fonts.ready);
 if(width<768){await p.locator('.portrait-map').screenshot({path:`${dir}/map-${locale}-${width}.png`});if(width===390){for(const city of ['jeddah','riyadh','dammam','tabuk','qassim','madinah','khamis','jizan']){await p.locator('.city-'+city).click();await p.locator('.mobile-network').screenshot({path:`${dir}/location-${locale}-${city}.png`});}}}
 else await p.locator('.network').screenshot({path:`${dir}/map-${locale}-${width}.png`});
 await p.close();console.log(engine,locale,width);
}
await browser.close();
