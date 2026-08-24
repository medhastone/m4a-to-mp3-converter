const fs = require('fs');
let content = fs.readFileSync('public/client-side-safe.html', 'utf8');

const newFooterColumn = `            <div>
                <h4 class="font-bold text-white mb-4">Platform & Legal</h4>
                <ul class="flex flex-col gap-2 text-sm text-slate-400">
                    <li><a href="https://m4atomp3converter.com/privacy-policy.html" class="hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="https://m4atomp3converter.com/terms.html" class="hover:text-primary transition-colors">Terms of Service</a></li>
                    <li><a href="https://m4atomp3converter.com/about.html" class="hover:text-primary transition-colors">About M4A to MP3 Converter.com</a></li>
                </ul>
            </div>`;
            
content = content.replace('grid-cols-2 md:grid-cols-4', 'grid-cols-2 lg:grid-cols-5 md:grid-cols-3');
content = content.replace('max-w-5xl mx-auto', 'max-w-7xl mx-auto');

content = content.replace(/<\/div>(\s*<div class="text-center text-slate-600 text-sm border-t border-white\/5 pt-8)/, newFooterColumn + '\n        </div>$1');
fs.writeFileSync('public/client-side-safe.html', content);
