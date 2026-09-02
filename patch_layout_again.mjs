import fs from 'fs';

let content = fs.readFileSync('app/[locale]/layout.tsx', 'utf8');

if (!content.includes('BreadcrumbJsonLd')) {
  content = content.replace(
    "import Footer from '../components/Footer';",
    "import Footer from '../components/Footer';\nimport BreadcrumbJsonLd from '../components/BreadcrumbJsonLd';"
  );
  
  content = content.replace(
    "<Footer />",
    "<Footer />\n          <BreadcrumbJsonLd />"
  );
  
  fs.writeFileSync('app/[locale]/layout.tsx', content);
  console.log('Added Breadcrumbs properly');
}
