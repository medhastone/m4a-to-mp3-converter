// mock a quick check if t.raw is standard
const { createTranslator } = require('next-intl');
console.log(typeof createTranslator({locale: 'en', messages: {}}).raw);
