import fs from 'fs';

const path = 'app/[locale]/layout.tsx';
let content = fs.readFileSync(path, 'utf8');

const target = `    alternates: {
      canonical: \`\${domain}/\${locale}\`,
      languages: {
        'en': \`\${domain}/en\`,
        'es': \`\${domain}/es\`,
        'fr': \`\${domain}/fr\`,
        'de': \`\${domain}/de\`,
        'pt': \`\${domain}/pt\`,
        'ru': \`\${domain}/ru\`,
        'x-default': \`\${domain}/en\`,
      },
    },
  };`;

const replacement = `    alternates: {
      canonical: \`\${domain}/\${locale}\`,
      languages: {
        'en': \`\${domain}/en\`,
        'es': \`\${domain}/es\`,
        'fr': \`\${domain}/fr\`,
        'de': \`\${domain}/de\`,
        'pt': \`\${domain}/pt\`,
        'ru': \`\${domain}/ru\`,
        'x-default': \`\${domain}/en\`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };`;

content = content.replace(target, replacement);
fs.writeFileSync(path, content);
console.log('Done');
