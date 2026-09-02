import fs from 'fs';
import path from 'path';

const pagesDir = 'app/[locale]';
const tools = [
  '320kbps', 'batch-converter', 'client-side-safe', 'iphone-voice-memos',
  'mac', 'windows', 'acx-checker', 'audio-metadata-remover', 'metadata-viewer',
  'mp3-to-m4a', 'video-to-mp3', 'wav-to-mp3'
];

for (const tool of tools) {
  const pagePath = path.join(pagesDir, tool, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Update main tag
    content = content.replace(
      /<main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">/g,
      '<main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-12 md:gap-16">'
    );
    content = content.replace(
      /<main className="flex-1 relative z-10 w-full max-w-\[1400px\] mx-auto px-4 sm:px-8 xl:px-12 pt-12 lg:pt-20 pb-24">/g,
      '<main className="flex-1 relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col gap-12 md:gap-16">'
    );
    
    // Add grid wrapper around hero and converter
    // Replace:
    //      {/* Hero Section */}
    //      <section className="text-center max-w-3xl mx-auto">
    //        ...
    //      </section>
    //      {/* Interactive Workspace */}
    //      <Converter />
    
    // Let's use regex
    const regex = /({\/\*\s*Hero Section\s*\*\/}\s*<section className=")text-center max-w-3xl mx-auto(">)((?:.|\n)*?)(<\/section>\s*{\/\*\s*Interactive Workspace\s*\*\/}\s*<(?:Converter|Mp3ToM4aConverter|VideoToMp3Converter|WavToMp3Converter|MetadataViewer|MetadataRemover|AcxChecker)[^>]*\/>)/g;
    
    content = content.replace(regex, (match, p1, p2, p3, p4) => {
      // p1 is {/* Hero Section */} <section className="
      // p2 is ">
      // p3 is the inside of the section
      // p4 is </section> \n {/* Interactive Workspace */} \n <Converter />
      
      return `<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">\n      ${p1}text-left${p2}${p3}\n      <div className="w-full flex flex-col gap-4">\n${p4.replace(/<\/section>\s*{\/\*\s*Interactive Workspace\s*\*\/}/, '</section>\n      {/* Interactive Workspace */}')}\n      </div>\n    </div>`;
    });
    
    // Wait, AcxChecker / MetadataViewer might have different components
    
    fs.writeFileSync(pagePath, content);
    console.log('Updated', pagePath);
  }
}
