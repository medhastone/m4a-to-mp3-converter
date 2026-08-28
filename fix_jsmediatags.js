const fs = require('fs');
let code = fs.readFileSync('app/components/MetadataViewer.tsx', 'utf8');

// Remove import * as jsmediatags
code = code.replace("import * as jsmediatags from 'jsmediatags';", "import Script from 'next/script';");

// Use window.jsmediatags
code = code.replace(
  "jsmediatags.read(",
  "const jsmediatags = (window as any).jsmediatags;\n    if (!jsmediatags) { setError('Library not loaded. Please refresh.'); setLoading(false); return; }\n    jsmediatags.read("
);

// Add script tag before Upload Box
code = code.replace(
  "{/* Upload Box */}",
  `<Script src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js" strategy="beforeInteractive" />\n      {/* Upload Box */}`
);

fs.writeFileSync('app/components/MetadataViewer.tsx', code);
