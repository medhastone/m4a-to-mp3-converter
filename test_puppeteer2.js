const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await page.waitForFunction('!!window.lamejs');

  // Let's trigger the download flow or test ID3Writer directly
  await page.evaluate(() => {
    try {
      // Find the input file element
      const input = document.querySelector('input[type="file"]');
      console.log('Input accept:', input.accept);
      
      // We can't easily trigger the exact component logic without simulating a file upload
      // But we can check if ID3Writer is somehow exposed, probably not.
    } catch(e) {
      console.error('Test script error:', e.message);
    }
  });

  await browser.close();
})();
