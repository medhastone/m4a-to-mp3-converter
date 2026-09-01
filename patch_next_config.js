const fs = require('fs');
let content = fs.readFileSync('next.config.mjs', 'utf8');

if (!content.includes('webpack:')) {
  content = content.replace(
    'experimental: {',
    `webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\\/next-intl/ },
      /PackFileCacheStrategy/
    ];
    return config;
  },
  experimental: {`
  );
  fs.writeFileSync('next.config.mjs', content);
  console.log('patched');
}
