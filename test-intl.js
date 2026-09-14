const { createTranslator } = require('next-intl');
const messages = { test: "Hello <strong>world</strong>" };
const t = createTranslator({ locale: 'en', messages });
console.log(t.raw('test'));
