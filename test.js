import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.goto('http://localhost:3000/en/video-to-mp3', { waitUntil: 'domcontentloaded' });
  const content = await page.content();
  console.log(content.includes('Drop Videos Here') ? 'Found "Drop Videos Here" in DOM!' : 'Not found in DOM');
  console.log(content.includes('Downloading WASM') ? 'Found "Downloading WASM" in DOM!' : 'Downloading WASM not found in DOM');
  await browser.close();
})();
