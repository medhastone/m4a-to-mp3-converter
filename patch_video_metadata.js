const fs = require('fs');

const en = {
  meta_title: "Free MP4 to MP3 Converter Online (320kbps)",
  meta_description: "Convert MP4 to MP3 online for free at up to 320kbps with zero file size limits. Batch convert large videos locally in your browser with no upload lag."
};

const es = {
  meta_title: "Convertidor de MP4 a MP3 Gratis Online (320kbps)",
  meta_description: "Convierte MP4 a MP3 online gratis hasta 320kbps sin límite de tamaño. Convierte videos grandes localmente en tu navegador sin subirlos."
};

const fr = {
  meta_title: "Convertisseur MP4 en MP3 Gratuit en Ligne (320kbps)",
  meta_description: "Convertissez MP4 en MP3 en ligne gratuitement jusqu'à 320kbps sans limite de taille. Traitement local sans téléversement."
};

const de = {
  meta_title: "Kostenloser MP4 zu MP3 Konverter Online (320kbps)",
  meta_description: "Konvertieren Sie MP4 zu MP3 online kostenlos mit bis zu 320kbps ohne Größenlimit. Lokale Verarbeitung ohne Hochladen."
};

const pt = {
  meta_title: "Conversor MP4 para MP3 Grátis Online (320kbps)",
  meta_description: "Converta MP4 para MP3 online grátis com até 320kbps sem limites de tamanho. Processe vídeos grandes localmente sem envio."
};

const translations = { en, es, fr, de, pt };

for (const [lang, strings] of Object.entries(translations)) {
  const filePath = `messages/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.video_page) data.video_page = {};
    Object.assign(data.video_page, strings);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
