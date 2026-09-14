const { createTranslator } = require('next-intl');
const messages = { test: "Hola <strong>mundo</strong>" };
const t = createTranslator({ locale: 'es', messages });
console.log(t.raw('test'));
