const fs = require('fs');

const engH1 = "<highlight>ACX Audio Checker</highlight> Online - PDF Report";
const engSubtitle = "Instantly verify your audiobooks against ACX standards. 100% private in-browser analysis.";

['en', 'es', 'fr', 'de', 'pt'].forEach(lang => {
  const json = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
  json.acx_checker.h1 = engH1;
  json.acx_checker.subtitle = engSubtitle;
  fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(json, null, 2));
});

console.log("Fixed H1 and subtitle to be English everywhere.");
