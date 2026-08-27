const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Wait for lame.min.js to load
  await page.waitForFunction('!!window.lamejs');
  console.log('lamejs loaded');

  // Let's manually trigger the conversion flow from the page context
  await page.evaluate(async () => {
    try {
      // 1. Create a dummy ArrayBuffer for M4A (or just any buffer)
      // Actually we need to test ID3Writer directly in the page to see if it works
      const ID3Writer = require('browser-id3-writer').ID3Writer;
      console.log('ID3Writer:', typeof ID3Writer);
    } catch(e) {
      console.error('Test script error:', e.message);
    }
  });

  await browser.close();
})();
