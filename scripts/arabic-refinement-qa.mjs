import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const manifest = JSON.parse(await fs.readFile('.next/prerender-manifest.json'));
const routes = Object.keys(manifest.routes).filter(r => r === '/ar' || r.startsWith('/ar/'));
const browser = await chromium.launch();
const results = [];
let next = 0;
await Promise.all(Array.from({length: 3}, async () => {
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
  let errors = [];
  page.on('pageerror', e => errors.push(e.message));
  while (next < routes.length) {
    const route = routes[next++];
    errors = [];
    const response = await page.goto('http://localhost:3001' + route, {waitUntil: 'domcontentloaded'});
    await page.evaluate(() => document.fonts.ready);
    const check = await page.evaluate(() => {
      const main = document.body;
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      const mixed = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = node.textContent.trim();
        const parent = node.parentElement;
        if (/[\u0600-\u06ff]/.test(text) && /[A-Za-z0-9]/.test(text) && !parent.closest('bdi,time,option,script,style,[dir="ltr"]'))
          mixed.push({text: text.slice(0,220), tag: parent.tagName, class: parent.className});
      }
      return {
        dir: document.documentElement.dir,
        lang: document.documentElement.lang,
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenLoadedImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
        nestedOptionMarkup: !!document.querySelector('option bdi'),
        mixedTextCandidates: mixed,
      };
    });
    results.push({route, status: response.status(), errors: [...errors], ...check});
    if (results.length % 50 === 0) console.log(results.length, '/', routes.length);
  }
  await page.close();
}));
await browser.close();
results.sort((a,b) => a.route.localeCompare(b.route));
const failures=results.filter(r=>r.status!==200 || r.dir!=='rtl' || r.lang!=='ar' || r.h1!==1 || r.overflow || r.errors.length || r.brokenLoadedImages.length || r.nestedOptionMarkup);
await fs.writeFile('audit/refinement/arabic-all-routes.json', JSON.stringify({date:'2026-09-28',viewport:'1440 × 1000',routes:results.length,failures,results},null,2));
console.log(results.length, 'Arabic browser routes,', failures.length, 'failures;', results.filter(r=>r.mixedTextCandidates.length).length, 'pages with mixed-text candidates for manual review');
if(failures.length) process.exitCode=1;
