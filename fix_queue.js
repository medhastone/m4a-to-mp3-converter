const fs = require('fs');
const langs = ['en', 'de', 'es', 'fr', 'pt', 'ru'];
for (const lang of langs) {
  const targetData = JSON.parse(fs.readFileSync(`./messages/${lang}.json`, 'utf8'));
  if (targetData.wav_to_mp3) {
    targetData.wav_to_mp3.waiting_in_queue = "Waiting in queue...";
  }
  fs.writeFileSync(`./messages/${lang}.json`, JSON.stringify(targetData, null, 2));
  console.log(`Updated ${lang}.json`);
}
