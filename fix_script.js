const fs = require('fs');
let code = fs.readFileSync('app/components/MetadataViewer.tsx', 'utf8');

// Change import Script to use standard useEffect
code = code.replace("import Script from 'next/script';", "import { useEffect } from 'react';");

code = code.replace(
  '<Script src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js" strategy="beforeInteractive" />',
  ''
);

// Add useEffect
const useEffectCode = `
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).jsmediatags) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
`;

code = code.replace(
  'const [isDragging, setIsDragging] = useState(false);',
  `const [isDragging, setIsDragging] = useState(false);\n${useEffectCode}`
);

fs.writeFileSync('app/components/MetadataViewer.tsx', code);
