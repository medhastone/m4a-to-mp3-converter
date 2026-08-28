const fs = require('fs');
const files = process.argv.slice(2);
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/}-e\s*/g, '}');
  fs.writeFileSync(file, content);
}
console.log('Fixed pages');
