const sharp = require('sharp');
const fs = require('fs');

async function generate() {
  const svg = fs.readFileSync('public/icon.svg');
  
  // High-res icon.png
  await sharp(svg)
    .resize(512, 512)
    .png()
    .toFile('app/icon.png');
    
  // Apple touch icon
  await sharp(svg)
    .resize(180, 180)
    .png()
    .toFile('app/apple-icon.png');

  // fallback favicon.ico
  await sharp(svg)
    .resize(32, 32)
    .png()
    .toFile('app/favicon.ico');
    
  console.log('Icons generated successfully.');
}

generate().catch(console.error);
