const fs = require('fs');
const langs = ['en', 'es', 'fr', 'de', 'pt'];
for (const lang of langs) {
  const file = `messages/${lang}.json`;
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<span className=\\"text-orange-500\\">/g, '<highlight>');
    // The previous script might have saved it as unescaped in JSON if it parsed it as an object
    // Wait, let's just parse the JSON and fix it properly.
    const data = JSON.parse(content);
    if (data.video_converter && data.video_converter.title) {
        data.video_converter.title = data.video_converter.title
            .replace(/<span[^>]*>/, '<highlight>')
            .replace(/<\/span>/, '</highlight>');
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`Fixed ${lang}`);
  }
}
