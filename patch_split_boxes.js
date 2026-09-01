const fs = require('fs');

let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

// Remove outer wrapper
content = content.replace(
  '<div className="w-full max-w-5xl mx-auto mt-24 mb-24 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 xl:p-16">\n      <article className="prose prose-slate prose-invert max-w-none lg:prose-lg mx-auto">',
  '<article className="w-full max-w-5xl mx-auto mt-24 mb-24">'
);
content = content.replace(
  '</article>\n    </div>\n  );',
  '</article>\n  );'
);

// Regex split to handle whitespace gracefully
const regex = /<hr className="my-10 border-slate-800" \/>\s*<h2 className="text-3xl font-bold tracking-tight mb-6">Frequently Asked Questions<\/h2>/;
const parts = content.split(regex);

if(parts.length === 2) {
    let topPart = parts[0];
    let bottomPart = parts[1];
    
    // 1. Start the first box
    topPart = topPart.replace(
      '<article className="w-full max-w-5xl mx-auto mt-24 mb-24">',
      '<article className="w-full max-w-5xl mx-auto mt-24 mb-24">\n      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 xl:p-16 mb-12">\n        <div className="prose prose-slate prose-invert max-w-none lg:prose-lg mx-auto">'
    );
    
    // 2. End the first box, start the FAQ box
    const separator = '\n        </div>\n      </div>\n\n      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 xl:p-16">\n        <h2 className="text-3xl font-bold tracking-tight mb-8">Frequently Asked Questions</h2>';
    
    // 3. End the FAQ box (before </article>)
    bottomPart = bottomPart.replace(
      '</article>',
      '      </div>\n    </article>'
    );
    
    const modifiedContent = topPart + separator + bottomPart;
    
    fs.writeFileSync('app/components/AcxCheckerArticle.tsx', modifiedContent);
    console.log('patched successfully with separate boxes');
} else {
    console.log('regex split failed');
}
