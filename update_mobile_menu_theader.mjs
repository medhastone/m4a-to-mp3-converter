import fs from 'fs';

const path = 'app/components/MobileMenu.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add tHeader
if (!content.includes("const tHeader = useTranslations('header');")) {
  content = content.replace(
    "const t = useTranslations('mobilemenu');",
    "const t = useTranslations('mobilemenu');\n  const tHeader = useTranslations('header');"
  );
}

// Replace t( with tHeader( for the specific keys
const keys = [
  'wav_to_mp3_converter',
  'mp4_to_mp3_converter',
  'mp3_to_m4a_converter',
  'metadata_viewer'
];

keys.forEach(key => {
  const regex = new RegExp(`t\\('${key}'\\)`, 'g');
  content = content.replace(regex, `tHeader('${key}')`);
});

fs.writeFileSync(path, content);
console.log('MobileMenu updated with tHeader.');
