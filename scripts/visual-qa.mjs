import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch();const page=await browser.newPage();const dir='audit/screenshots';await fs.mkdir(dir,{recursive:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const locale of ['en','ar']){
 for(const [width,height] of [[1920,1080],[1728,1117],[1440,1000],[1366,900]]){
  await page.setViewportSize({width,height});await page.goto(`http://localhost:3001/${locale}`);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(250);
  await page.screenshot({path:`${dir}/home-${locale}-${width}.jpg`,type:'jpeg',quality:85});
  if(width===1440){await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}});await page.waitForTimeout(900);await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo(0,0)});await page.screenshot({path:`${dir}/home-${locale}-full.jpg`,type:'jpeg',quality:85,fullPage:true});}
 }
}
for(const [locale,route] of [['en','products'],['ar','products'],['en','about'],['ar','contact'],['en','brands'],['en','profile']]){await page.setViewportSize({width:1440,height:1000});await page.goto(`http://localhost:3001/${locale}/${route}`);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(900);await page.screenshot({path:`${dir}/${route}-${locale}.jpg`,type:'jpeg',quality:85});}
await fs.writeFile('audit/visual-errors.json',JSON.stringify(errors,null,2));await browser.close();console.log('Saved desktop visual QA screenshots. Page errors:',errors.length);
