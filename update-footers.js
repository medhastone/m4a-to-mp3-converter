const fs = require('fs');
const files = [
  'iphone-voice-memos.html',
  'windows.html',
  'mac.html',
  '320kbps.html',
  'batch-converter.html',
  'client-side-safe.html'
].map(f => 'public/' + f);

const newFooterColumn = `            <div>
                <h4 class="font-bold text-white mb-4">Platform & Legal</h4>
                <ul class="flex flex-col gap-2 text-sm text-slate-400">
                    <li><a href="https://m4atomp3converter.com/privacy-policy.html" class="hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="https://m4atomp3converter.com/terms.html" class="hover:text-primary transition-colors">Terms of Service</a></li>
                    <li><a href="https://m4atomp3converter.com/about.html" class="hover:text-primary transition-colors">About M4A to MP3 Converter.com</a></li>
                </ul>
            </div>`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Change grid
  content = content.replace('grid-cols-2 md:grid-cols-4', 'grid-cols-2 lg:grid-cols-5 md:grid-cols-3');
  content = content.replace('max-w-5xl mx-auto', 'max-w-7xl mx-auto');
  
  // Find where the grid ends
  const footerEndPattern = /<\/div>\s*<div class="text-center text-slate-600 text-sm border-t border-white\/5 pt-8">/;
  
  if(footerEndPattern.test(content)) {
     content = content.replace(footerEndPattern, newFooterColumn + '\n        </div>\n        <div class="text-center text-slate-600 text-sm border-t border-white/5 pt-8">');
     fs.writeFileSync(file, content);
     console.log('Updated ' + file);
  } else {
     console.log('Failed to find footer end in ' + file);
  }
}
