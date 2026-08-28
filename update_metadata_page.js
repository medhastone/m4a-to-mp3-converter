const fs = require('fs');

const pageContent = `import MetadataViewer from '../../components/MetadataViewer';
import MetadataSEO from '../../components/MetadataSEO';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Audio Metadata & Technical Inspector Online | Free Tool',
  description: 'Extract deep low-level stream metadata, codec details, and ID3 tags directly in your browser. No server uploads. Instant WebAssembly & FFmpeg-powered analysis.',
};

export default function MetadataViewerPage() {
  return (
    <main className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface flex flex-col">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-12 md:py-20 flex flex-col items-center">
        
        {/* 1. Hero Section & H1 */}
        <div className="text-center mb-12 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-on-surface to-on-surface-variant">
            Advanced Audio Metadata & Technical Inspector Online
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Uncover deep low-level stream properties, codec parameters, and standard ID3 tags instantly—without installing bloated desktop software like MediaInfo or FFprobe. Perform complete audio forensics and quality checks instantly in your browser with <strong>zero server uploads</strong>.
          </p>
        </div>
        
        {/* The Actual Tool */}
        <div className="w-full mb-10 max-w-[1000px] mx-auto">
          <MetadataViewer />
        </div>

        {/* SEO & Feature Showcase */}
        <MetadataSEO />

      </div>
    </main>
  );
}
`;

fs.writeFileSync('app/[locale]/metadata-viewer/page.tsx', pageContent);
console.log('Updated page');
