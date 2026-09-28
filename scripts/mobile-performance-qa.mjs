import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://localhost:3003';
const run = process.env.QA_RUN || 'local';
const browser = await chromium.launch();
const report = [];
for (const locale of ['ar', 'en']) for (const route of ['', 'products']) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.mobileMetrics = { lcp: 0, cls: 0 };
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.mobileMetrics.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.mobileMetrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  const response = await page.goto(`${base}/${locale}/${route}`);
  await page.waitForTimeout(4500);
  const metrics = await page.evaluate(() => ({ ...window.mobileMetrics, requests: performance.getEntriesByType('resource').length, transferBytes: performance.getEntriesByType('resource').reduce((n, r) => n + r.transferSize, 0), imageRequests: performance.getEntriesByType('resource').filter(r => r.initiatorType === 'img').length, renderedProducts: document.querySelectorAll('.product-item').length, preloadImages: document.querySelectorAll('link[rel="preload"][as="image"]').length }));
  report.push({ locale, route: route || 'home', status: response.status(), ...metrics });
  console.log(report.at(-1));
  await context.close();
}
await browser.close();
await fs.mkdir(`audit/mobile/${run}`, { recursive: true });
await fs.writeFile(`audit/mobile/${run}/performance.json`, JSON.stringify({ base, conditions: 'Chromium mobile 390x844 DPR2, 4x CPU slowdown, 1.6 Mbps down, 750 Kbps up, 150ms latency; synthetic lab sample, not field data', report }, null, 2));
