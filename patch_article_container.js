const fs = require('fs');

let content = fs.readFileSync('app/components/AcxCheckerArticle.tsx', 'utf8');

// Wrap in container
content = content.replace(
  '<article className="prose prose-slate prose-invert max-w-[85ch] mx-auto mt-24 mb-24 lg:prose-lg">',
  '<div className="w-full max-w-5xl mx-auto mt-24 mb-24 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 xl:p-16">\n      <article className="prose prose-slate prose-invert max-w-none lg:prose-lg mx-auto">'
);
content = content.replace(
  '</article>\n  );',
  '</article>\n    </div>\n  );'
);

// Remove <strong> tags to stop highlighting keywords
content = content.replace(/<\/?strong>/g, '');

fs.writeFileSync('app/components/AcxCheckerArticle.tsx', content);
console.log('patched container and strong tags');
