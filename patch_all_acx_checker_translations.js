const fs = require('fs');

const esJson = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));
esJson.acx_checker.h1 = "<highlight>Verificador de Audio ACX</highlight> en Línea - Reporte PDF";
esJson.acx_checker.subtitle = "Verifique instantáneamente sus audiolibros según los estándares de ACX. Análisis 100% privado en el navegador.";
fs.writeFileSync('messages/es.json', JSON.stringify(esJson, null, 2));

const frJson = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));
frJson.acx_checker.h1 = "<highlight>Vérificateur Audio ACX</highlight> en Ligne - Rapport PDF";
frJson.acx_checker.subtitle = "Vérifiez instantanément vos livres audio selon les normes ACX. Analyse 100% privée dans le navigateur.";
fs.writeFileSync('messages/fr.json', JSON.stringify(frJson, null, 2));

const deJson = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
deJson.acx_checker.h1 = "<highlight>ACX Audio Checker</highlight> Online - PDF-Bericht";
deJson.acx_checker.subtitle = "Überprüfen Sie Ihre Hörbücher sofort auf ACX-Standards. 100% private Analyse im Browser.";
fs.writeFileSync('messages/de.json', JSON.stringify(deJson, null, 2));

const ptJson = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'));
ptJson.acx_checker.h1 = "<highlight>Verificador de Áudio ACX</highlight> Online - Relatório PDF";
ptJson.acx_checker.subtitle = "Verifique instantaneamente seus audiolivros em relação aos padrões ACX. Análise 100% privada no navegador.";
fs.writeFileSync('messages/pt.json', JSON.stringify(ptJson, null, 2));

console.log("Translations for h1 and subtitle restored.");
