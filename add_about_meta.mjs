import fs from 'fs';

const files = fs.readdirSync('messages').filter(f => f.endsWith('.json'));

for (const file of files) {
  const path = `messages/${file}`;
  let content = fs.readFileSync(path, 'utf8');
  const data = JSON.parse(content);
  
  if (data.about) {
    if (!data.about.meta_title) {
      if (file === 'en.json') {
        data.about.meta_title = "About Us - M4A to MP3 Converter";
        data.about.meta_description = "Learn about our privacy-first, zero-upload audio conversion engineering mission.";
      } else if (file === 'es.json') {
        data.about.meta_title = "Sobre Nosotros - Convertidor de M4A a MP3";
        data.about.meta_description = "Conozca nuestra misión de ingeniería de conversión de audio sin cargas y con privacidad primero.";
      } else if (file === 'fr.json') {
        data.about.meta_title = "À propos de nous - Convertisseur M4A en MP3";
        data.about.meta_description = "Découvrez notre mission d'ingénierie de conversion audio axée sur la confidentialité et sans téléchargement.";
      } else if (file === 'de.json') {
        data.about.meta_title = "Über Uns - M4A zu MP3 Konverter";
        data.about.meta_description = "Erfahren Sie mehr über unsere datenschutzorientierte Audio-Konvertierungs-Engineering-Mission ohne Uploads.";
      } else if (file === 'pt.json') {
        data.about.meta_title = "Sobre Nós - Conversor de M4A para MP3";
        data.about.meta_description = "Saiba mais sobre nossa missão de engenharia de conversão de áudio sem upload, voltada para a privacidade.";
      } else if (file === 'ru.json') {
        data.about.meta_title = "О нас - Конвертер M4A в MP3";
        data.about.meta_description = "Узнайте о нашей инженерной миссии по конвертации аудио с упором на конфиденциальность и без загрузки.";
      } else {
        data.about.meta_title = "About Us - M4A to MP3 Converter";
        data.about.meta_description = "Learn about our privacy-first, zero-upload audio conversion engineering mission.";
      }
    }
  }
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
console.log('About meta added');
