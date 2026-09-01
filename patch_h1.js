const fs = require('fs');
const file = 'app/[locale]/acx-checker/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'title: `Free ACX Audio Check Online – Instant Peak, RMS & Noise Floor Analyzer (With PDF Report)`',
  'title: `ACX Audio Checker Online - PDF Report`'
);

const oldH1 = `<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Free ACX Audio Check Online – Instant Peak, RMS &amp; Noise Floor Analyzer (With PDF Report)
          </h1>`;
const newH1 = `<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white">
            <span className="text-orange-500">ACX Audio Checker</span> Online - PDF Report
          </h1>`;

content = content.replace(oldH1, newH1);

fs.writeFileSync(file, content);
console.log('patched');
