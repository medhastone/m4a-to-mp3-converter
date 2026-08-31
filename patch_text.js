const fs = require('fs');

const files = ['app/components/Header.tsx', 'app/components/Footer.tsx', 'app/components/MobileMenu.tsx'];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Video to MP3 Extractor/g, 'MP4 to MP3 Converter');
    fs.writeFileSync(file, content);
  }
}
