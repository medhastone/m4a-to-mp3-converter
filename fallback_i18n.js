const fs = require('fs');

const langs = ['es', 'fr', 'pt', 'ru'];
const enData = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));

for (const lang of langs) {
  const targetData = JSON.parse(fs.readFileSync(`./messages/${lang}.json`, 'utf8'));
  
  targetData.error = { ...enData.error };
  targetData.wav_to_mp3_seo = { ...enData.wav_to_mp3_seo };
  targetData.wav_to_mp3_page = { ...enData.wav_to_mp3_page };
  
  fs.writeFileSync(`./messages/${lang}.json`, JSON.stringify(targetData, null, 2));
  console.log(`Updated ${lang}.json with English fallbacks.`);
}
