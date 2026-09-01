const fs = require('fs');

const path = 'app/[locale]/acx-checker/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '    title: `ACX Audio Checker Online - PDF Report`,',
  '    title: t(\'meta_title\'),'
);

content = content.replace(
  '    description: `Test audiobook chapters against official Audible ACX requirements for free. Instant in-browser check for Peak (≤ -3.0 dB), RMS (-23 to -18 dB), Noise Floor (≤ -60 dB), and Room Tone spacing with downloadable PDF reports.`,',
  '    description: t(\'meta_desc\'),'
);

content = content.replace(
  '<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white">\n            <span className="text-orange-500">ACX Audio Checker</span> Online - PDF Report\n          </h1>',
  '<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white">\n            {t.rich(\'h1\', { highlight: (chunks) => <span className="text-orange-500">{chunks}</span> })}\n          </h1>'
);

fs.writeFileSync(path, content);
console.log('Patched page.tsx');
