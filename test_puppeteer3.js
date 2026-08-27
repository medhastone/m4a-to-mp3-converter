const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await page.waitForFunction('!!window.lamejs');

  await page.evaluate(() => {
    // try to fetch and create id3writer from the bundle
    try {
      console.log('Evaluating ID3...');
      const ID3Writer = require('browser-id3-writer').ID3Writer;
      console.log('Got ID3Writer via require?', !!ID3Writer);
    } catch(e) {
      console.log('require failed', e.message);
    }
  });

  await browser.close();
})();
