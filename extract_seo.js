const fs = require('fs');

const content = fs.readFileSync('app/components/VideoToMp3SEO.tsx', 'utf8');

// I will just use a generic regex to extract the text content of tags, or I can manually define the mapping.
// Actually, I can manually write a replacement script.
