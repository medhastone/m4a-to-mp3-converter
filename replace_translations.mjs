import fs from 'fs';

const files = [
  { file: 'en.json', from: '"mp3_to_m4a_converter": "MP3 to M4A"', to: '"mp3_to_m4a_converter": "MP3 to M4A Converter"' },
  { file: 'de.json', from: '"mp3_to_m4a_converter": "MP3 zu M4A"', to: '"mp3_to_m4a_converter": "MP3 zu M4A Konverter"' },
  { file: 'es.json', from: '"mp3_to_m4a_converter": "MP3 a M4A"', to: '"mp3_to_m4a_converter": "Conversor MP3 a M4A"' },
  { file: 'fr.json', from: '"mp3_to_m4a_converter": "MP3 vers M4A"', to: '"mp3_to_m4a_converter": "Convertisseur MP3 vers M4A"' },
  { file: 'pt.json', from: '"mp3_to_m4a_converter": "MP3 para M4A"', to: '"mp3_to_m4a_converter": "Conversor MP3 para M4A"' },
  { file: 'ru.json', from: '"mp3_to_m4a_converter": "MP3 в M4A"', to: '"mp3_to_m4a_converter": "Конвертер MP3 в M4A"' },
];

for (const {file, from, to} of files) {
  const path = `messages/${file}`;
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(new RegExp(from, 'g'), to);
  fs.writeFileSync(path, content);
}
console.log('Translations updated.');
