const fs = require('fs');

let header = fs.readFileSync('app/components/Header.tsx', 'utf8');

// Replace Header hardcoded texts
header = header.replace(
  /<span className="text-lg">🌊<\/span> WAV to MP3 Converter/g,
  `<span className="text-lg">🌊</span> {t('wav_to_mp3_converter')}`
);
header = header.replace(
  /<span className="text-lg">🎬<\/span> MP4 to MP3 Converter/g,
  `<span className="text-lg">🎬</span> {t('mp4_to_mp3_converter')}`
);
header = header.replace(
  /<span className="text-lg">🔄<\/span> MP3 to M4A/g,
  `<span className="text-lg">🔄</span> {t('mp3_to_m4a_converter')}`
);
header = header.replace(
  /<span className="text-lg">🏷️<\/span> Metadata Remover/g,
  `<span className="text-lg">🏷️</span> {t('metadata_remover')}`
);

fs.writeFileSync('app/components/Header.tsx', header);

let footer = fs.readFileSync('app/components/Footer.tsx', 'utf8');

// Replace Footer hardcoded texts
footer = footer.replace(
  />\s*MP4 to MP3 Converter\s*<\/Link>/g,
  `>{t('mp4_to_mp3_converter')}</Link>`
);
footer = footer.replace(
  />\s*WAV to MP3 Converter\s*<\/Link>/g,
  `>{t('wav_to_mp3_converter')}</Link>`
);
footer = footer.replace(
  />\s*MP3 to M4A Converter\s*<\/Link>/g,
  `>{t('mp3_to_m4a_converter')}</Link>`
);
footer = footer.replace(
  />\s*Metadata Remover\s*<\/Link>/g,
  `>{t('metadata_remover')}</Link>`
);

fs.writeFileSync('app/components/Footer.tsx', footer);
