const fs = require('fs');
const path = require('path');

const pages = [
  { route: 'iphone-voice-memos', title: 'Convert iPhone Voice Memos to MP3' },
  { route: '320kbps', title: 'Convert to 320kbps Studio Master MP3' },
  { route: 'batch-converter', title: 'Batch Convert M4A to MP3' },
  { route: 'windows', title: 'M4A to MP3 Converter for Windows' },
  { route: 'mac', title: 'M4A to MP3 Converter for Mac' },
  { route: 'client-side-safe', title: '100% Client-Side Safe Converter' },
  { route: 'privacy-policy', title: 'Privacy Policy' },
  { route: 'terms', title: 'Terms of Service' },
  { route: 'about', title: 'About Us & Contact' }
];

pages.forEach(page => {
  const dir = path.join(__dirname, 'app', page.route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ${page.route.replace(/-/g, '')}Page() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">${page.title}</h1>
        <p className="text-neutral-600 mb-8">This page is currently under construction. Check back soon for detailed guides and information.</p>
        <Link href="/" className="inline-flex items-center justify-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Converter</span>
        </Link>
      </div>
    </div>
  );
}
`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});
console.log('Pages created successfully.');
