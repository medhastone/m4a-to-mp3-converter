const fs = require('fs');
const file = 'app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports
const newImports = `import { usePathname } from 'next/navigation';
import { FileAudio, Download, RotateCcw, Music, Smartphone, Layers, ShieldCheck, Monitor } from 'lucide-react';`;
content = content.replace("import { FileAudio, Download, RotateCcw, Music } from 'lucide-react';", newImports);

// Inside Converter
const oldComponentStart = "export default function Converter() {";
const newComponentStart = `export default function Converter() {
  const pathname = usePathname() || '';
  let DropIcon = FileAudio;
  if (pathname.includes('iphone-voice-memos')) DropIcon = Smartphone;
  else if (pathname.includes('batch-converter')) DropIcon = Layers;
  else if (pathname.includes('client-side-safe')) DropIcon = ShieldCheck;
  else if (pathname.includes('mac') || pathname.includes('windows')) DropIcon = Monitor;
  else if (pathname.includes('320kbps')) DropIcon = Music;
`;

content = content.replace(oldComponentStart, newComponentStart);

// Replace icon rendering
const oldIconUsage = "<FileAudio className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary-container' : 'text-primary'}`} />";
const newIconUsage = "<DropIcon className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary-container' : 'text-primary'}`} />";

content = content.replace(oldIconUsage, newIconUsage);

fs.writeFileSync(file, content);
console.log("Success patching icons");
