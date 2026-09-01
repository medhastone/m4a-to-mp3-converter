const fs = require('fs');

let content = fs.readFileSync('app/components/Header.tsx', 'utf8');

// Replace the Support Us link with empty string
content = content.replace(
  /<a href="https:\/\/buymeacoffee\.com\/medhastone".*?Support Us<\/a>/g,
  ''
);

fs.writeFileSync('app/components/Header.tsx', content);
console.log('patched header');
