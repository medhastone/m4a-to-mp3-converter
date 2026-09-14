const { createTranslator } = require('next-intl');
const messages = { test: "Hello {name} <strong>world</strong>" };
const t = createTranslator({ locale: 'en', messages });
console.log(t.raw('test'));
try { console.log(t.raw('test', {name: "John"})); } catch (e) { console.log(e.message); }
