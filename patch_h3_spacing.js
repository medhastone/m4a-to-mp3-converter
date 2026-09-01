const fs = require('fs');

let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

// Replace standard h3 tags with styled ones containing top margin
content = content.replace(
  '<h3>1. How to Fix Peak Failures (&gt; -3.0 dB)</h3>',
  '<h3 className="text-2xl font-semibold text-slate-200 mt-12 mb-4">1. How to Fix Peak Failures (&gt; -3.0 dB)</h3>'
);

content = content.replace(
  '<h3>2. How to Fix RMS Failures (&lt; -23 dB or &gt; -18 dB)</h3>',
  '<h3 className="text-2xl font-semibold text-slate-200 mt-12 mb-4">2. How to Fix RMS Failures (&lt; -23 dB or &gt; -18 dB)</h3>'
);

content = content.replace(
  '<h3>3. How to Fix Noise Floor Failures (&gt; -60 dB)</h3>',
  '<h3 className="text-2xl font-semibold text-slate-200 mt-12 mb-4">3. How to Fix Noise Floor Failures (&gt; -60 dB)</h3>'
);

content = content.replace(
  '<h3>4. How to Fix Head &amp; Tail Room Tone Errors</h3>',
  '<h3 className="text-2xl font-semibold text-slate-200 mt-12 mb-4">4. How to Fix Head &amp; Tail Room Tone Errors</h3>'
);

fs.writeFileSync('app/components/AcxCheckerArticle.tsx', content);
console.log('patched h3 spacing');
