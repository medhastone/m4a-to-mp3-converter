const fs = require('fs');

const enJson = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
enJson.acx_checker.h1 = "<highlight>ACX Audio Checker</highlight> Online - PDF Report";
enJson.acx_checker.subtitle = "Instantly verify your audiobooks against ACX standards. 100% private in-browser analysis.";
enJson.acx_checker.meta_title = "ACX Audio Checker Online - PDF Report";
enJson.acx_checker.meta_desc = "Test audiobook chapters against official Audible ACX requirements for free. Instant in-browser check for Peak (≤ -3.0 dB), RMS (-23 to -18 dB), Noise Floor (≤ -60 dB), and Room Tone spacing with downloadable PDF reports.";
fs.writeFileSync('messages/en.json', JSON.stringify(enJson, null, 2));

const esJson = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));
esJson.acx_checker.h1 = "<highlight>Verificador de Audio ACX</highlight> en Línea - Reporte PDF";
esJson.acx_checker.subtitle = "Verifique instantáneamente sus audiolibros según los estándares de ACX. Análisis 100% privado en el navegador.";
esJson.acx_checker.meta_title = "Verificador de Audio ACX en Línea - Reporte PDF";
esJson.acx_checker.meta_desc = "Pruebe capítulos de audiolibros frente a los requisitos oficiales de Audible ACX gratis. Comprobación instantánea en el navegador de Pico (≤ -3.0 dB), RMS (-23 a -18 dB), Piso de Ruido (≤ -60 dB) y espacio de Tono de Sala con reportes en PDF.";
fs.writeFileSync('messages/es.json', JSON.stringify(esJson, null, 2));

const frJson = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));
frJson.acx_checker.h1 = "<highlight>Vérificateur Audio ACX</highlight> en Ligne - Rapport PDF";
frJson.acx_checker.subtitle = "Vérifiez instantanément vos livres audio selon les normes ACX. Analyse 100% privée dans le navigateur.";
frJson.acx_checker.meta_title = "Vérificateur Audio ACX en Ligne - Rapport PDF";
frJson.acx_checker.meta_desc = "Testez gratuitement les chapitres de livres audio selon les exigences officielles d'Audible ACX. Vérification instantanée de Crête (≤ -3.0 dB), RMS (-23 à -18 dB), Bruit de Fond (≤ -60 dB) avec rapports PDF.";
fs.writeFileSync('messages/fr.json', JSON.stringify(frJson, null, 2));

const deJson = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
deJson.acx_checker.h1 = "<highlight>ACX Audio Checker</highlight> Online - PDF-Bericht";
deJson.acx_checker.subtitle = "Überprüfen Sie Ihre Hörbücher sofort auf ACX-Standards. 100% private Analyse im Browser.";
deJson.acx_checker.meta_title = "ACX Audio Checker Online - PDF-Bericht";
deJson.acx_checker.meta_desc = "Testen Sie Hörbuchkapitel kostenlos auf die offiziellen Audible ACX-Anforderungen. Sofortige Überprüfung im Browser auf Peak (≤ -3,0 dB), RMS (-23 bis -18 dB), Grundrauschen (≤ -60 dB) mit herunterladbaren PDF-Berichten.";
fs.writeFileSync('messages/de.json', JSON.stringify(deJson, null, 2));

const ptJson = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'));
ptJson.acx_checker.h1 = "<highlight>Verificador de Áudio ACX</highlight> Online - Relatório PDF";
ptJson.acx_checker.subtitle = "Verifique instantaneamente seus audiolivros em relação aos padrões ACX. Análise 100% privada no navegador.";
ptJson.acx_checker.meta_title = "Verificador de Áudio ACX Online - Relatório PDF";
ptJson.acx_checker.meta_desc = "Teste capítulos de audiolivros em relação aos requisitos oficiais do Audible ACX gratuitamente. Verificação instantânea no navegador para Pico (≤ -3,0 dB), RMS (-23 a -18 dB), Ruído de Fundo (≤ -60 dB) com relatórios PDF.";
fs.writeFileSync('messages/pt.json', JSON.stringify(ptJson, null, 2));

console.log("Updated dictionaries.");
