const fs = require('fs');
let code = fs.readFileSync('app/components/Converter.tsx', 'utf8');

// Replace dynamic script injection
code = code.replace(/  useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);\n/, '');

// Add import for lamejs at the top
code = code.replace("const ID3Writer = require('browser-id3-writer');", "const ID3Writer = require('browser-id3-writer');\nconst lamejs = require('lamejs');");

// Replace window.lamejs check
code = code.replace(/      const lamejs = \(window as any\)\.lamejs;\n      if \(!lamejs\) \{\n        throw new Error\('LameJS library is still loading\. Please wait a moment\.'\);\n      \}\n/, '');

fs.writeFileSync('app/components/Converter.tsx', code);
