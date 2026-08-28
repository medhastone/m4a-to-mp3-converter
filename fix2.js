const fs = require('fs');
const glob = require('child_process').execSync;
const files = glob('find app/\\[locale\\] -name "page.tsx"').toString().trim().split('\n');
files.push('app/[locale]/layout.tsx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/=>\s*\(\{\s*locale\s*\}\)/g, '=> ({ locale, "/[locale]": locale })');
  fs.writeFileSync(file, content);
}
console.log('Fixed params');
