const fs = require('fs');

let remover = fs.readFileSync('app/components/MetadataRemover.tsx', 'utf8');
remover = remover.replace(/bg-white text-slate-900 hover:bg-slate-100/g, 'bg-surface text-on-surface hover:bg-surface-dim border border-outline-variant');
fs.writeFileSync('app/components/MetadataRemover.tsx', remover);

let wav = fs.readFileSync('app/components/WavToMp3Converter.tsx', 'utf8');
wav = wav.replace('hover:bg-slate-600', 'hover:bg-outline-variant/30');
fs.writeFileSync('app/components/WavToMp3Converter.tsx', wav);
