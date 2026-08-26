import fs from 'fs';

let en = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));

const files = ['core_keys.json', 'converter_keys.json', 'recovered_keys.json', 'remaining_keys.json'];

for (const file of files) {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    Object.assign(en, data);
  }
}

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
console.log('Merged all available keys into messages/en.json');
