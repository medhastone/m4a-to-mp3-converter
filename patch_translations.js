const fs = require('fs');

const translations = {
  en: {
    mp4_to_mp3_converter: "MP4 to MP3 Converter",
    wav_to_mp3_converter: "WAV to MP3 Converter",
    mp3_to_m4a_converter: "MP3 to M4A",
    metadata_remover: "Metadata Remover"
  },
  es: {
    mp4_to_mp3_converter: "Conversor de MP4 a MP3",
    wav_to_mp3_converter: "Conversor de WAV a MP3",
    mp3_to_m4a_converter: "MP3 a M4A",
    metadata_remover: "Eliminador de Metadatos"
  },
  fr: {
    mp4_to_mp3_converter: "Convertisseur MP4 en MP3",
    wav_to_mp3_converter: "Convertisseur WAV en MP3",
    mp3_to_m4a_converter: "MP3 vers M4A",
    metadata_remover: "Suppresseur de Métadonnées"
  },
  de: {
    mp4_to_mp3_converter: "MP4 zu MP3 Konverter",
    wav_to_mp3_converter: "WAV zu MP3 Konverter",
    mp3_to_m4a_converter: "MP3 zu M4A",
    metadata_remover: "Metadaten-Entferner"
  },
  pt: {
    mp4_to_mp3_converter: "Conversor MP4 para MP3",
    wav_to_mp3_converter: "Conversor WAV para MP3",
    mp3_to_m4a_converter: "MP3 para M4A",
    metadata_remover: "Removedor de Metadados"
  }
};

for (const [lang, strings] of Object.entries(translations)) {
  const filePath = `messages/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Inject into header
    if (!data.header) data.header = {};
    Object.assign(data.header, strings);
    
    // Inject into footer
    if (!data.footer) data.footer = {};
    Object.assign(data.footer, strings);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
}
