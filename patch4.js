const fs = require('fs');
const file = '/app/applet/app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('  const __old_processAudioFile = async (file: File) => {');
const endIndex = content.indexOf('  const handleFile = (file: File) => {');
if(startIndex !== -1 && endIndex !== -1) {
  const newContent = content.substring(0, startIndex) + content.substring(endIndex);
  fs.writeFileSync(file, newContent);
  console.log('Successfully removed old function');
} else {
  console.log('Failed to find boundaries');
}
