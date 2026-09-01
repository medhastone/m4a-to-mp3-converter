const fs = require('fs');

const esJson = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));
Object.assign(esJson.acx_checker, {
  "dropzone_title": "Suelta el Audio Aquí",
  "dropzone_subtitle": "Soporta MP3, WAV, FLAC, M4A",
  "analyzing": "Analizando Audio...",
  "overall_pass": "LISTO PARA ACX: APROBADO",
  "overall_fail": "ATENCIÓN: REPROBADO",
  "metric_peak": "Nivel de Pico",
  "metric_rms": "Nivel RMS",
  "metric_noise": "Piso de Ruido",
  "metric_samplerate": "Frecuencia de Muestreo",
  "status_pass": "APROBADO",
  "status_fail": "REPROBADO",
  "advice_peak_fail": "El nivel de pico debe ser <= -3.0 dB. Baje su volumen maestro o use un limitador de pico verdadero.",
  "advice_rms_fail_high": "RMS demasiado alto (debe ser <= -18.0 dB). Reduzca su volumen general.",
  "advice_rms_fail_low": "RMS demasiado bajo (debe ser >= -23.0 dB). Aumente su volumen general o use compresión.",
  "advice_noise_fail": "El piso de ruido es muy alto (debe ser <= -60.0 dB). Use una puerta de ruido suave o un reductor de ruido espectral.",
  "advice_samplerate_fail": "La frecuencia de muestreo debe ser exactamente 44.1 kHz. Por favor, vuelva a muestrear su audio.",
  "bmc_cta": "Apoya nuestras herramientas gratuitas"
});
fs.writeFileSync('messages/es.json', JSON.stringify(esJson, null, 2));

const frJson = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));
Object.assign(frJson.acx_checker, {
  "dropzone_title": "Déposez l'Audio Ici",
  "dropzone_subtitle": "Prend en charge MP3, WAV, FLAC, M4A",
  "analyzing": "Analyse de l'Audio...",
  "overall_pass": "PRÊT POUR ACX: RÉUSSI",
  "overall_fail": "ATTENTION: ÉCHEC",
  "metric_peak": "Niveau de Crête",
  "metric_rms": "Niveau RMS",
  "metric_noise": "Bruit de Fond",
  "metric_samplerate": "Taux d'Échantillonnage",
  "status_pass": "RÉUSSI",
  "status_fail": "ÉCHEC",
  "advice_peak_fail": "Le niveau de crête doit être <= -3.0 dB. Baissez votre volume principal ou utilisez un limiteur true-peak.",
  "advice_rms_fail_high": "Le RMS est trop fort (doit être <= -18.0 dB). Baissez votre volume global.",
  "advice_rms_fail_low": "Le RMS est trop faible (doit être >= -23.0 dB). Augmentez votre volume global ou utilisez une compression.",
  "advice_noise_fail": "Le bruit de fond est trop élevé (doit être <= -60.0 dB). Utilisez un noise gate doux ou un denoiser spectral.",
  "advice_samplerate_fail": "Le taux d'échantillonnage doit être exactement de 44.1 kHz. Veuillez rééchantillonner votre audio.",
  "bmc_cta": "Soutenez nos outils gratuits"
});
fs.writeFileSync('messages/fr.json', JSON.stringify(frJson, null, 2));

const deJson = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
Object.assign(deJson.acx_checker, {
  "dropzone_title": "Audio Hier Ablegen",
  "dropzone_subtitle": "Unterstützt MP3, WAV, FLAC, M4A",
  "analyzing": "Audio wird analysiert...",
  "overall_pass": "ACX-BEREIT: BESTANDEN",
  "overall_fail": "ACHTUNG: FEHLGESCHLAGEN",
  "metric_peak": "Spitzenpegel (Peak)",
  "metric_rms": "RMS-Pegel",
  "metric_noise": "Grundrauschen",
  "metric_samplerate": "Abtastrate",
  "status_pass": "BESTANDEN",
  "status_fail": "FEHLGESCH.",
  "advice_peak_fail": "Der Spitzenpegel muss <= -3,0 dB sein. Verringern Sie die Masterlautstärke oder verwenden Sie einen True-Peak-Limiter.",
  "advice_rms_fail_high": "RMS ist zu laut (muss <= -18,0 dB sein). Verringern Sie die Gesamtlautstärke.",
  "advice_rms_fail_low": "RMS ist zu leise (muss >= -23,0 dB sein). Erhöhen Sie die Gesamtlautstärke oder verwenden Sie Kompression.",
  "advice_noise_fail": "Das Grundrauschen ist zu hoch (muss <= -60,0 dB sein). Verwenden Sie ein sanftes Noise Gate oder einen Spektral-Denoiser.",
  "advice_samplerate_fail": "Die Abtastrate muss genau 44,1 kHz betragen. Bitte sampeln Sie Ihr Audio neu.",
  "bmc_cta": "Unterstützen Sie unsere kostenlosen Tools"
});
fs.writeFileSync('messages/de.json', JSON.stringify(deJson, null, 2));

const ptJson = JSON.parse(fs.readFileSync('messages/pt.json', 'utf8'));
Object.assign(ptJson.acx_checker, {
  "dropzone_title": "Solte o Áudio Aqui",
  "dropzone_subtitle": "Suporta MP3, WAV, FLAC, M4A",
  "analyzing": "Analisando Áudio...",
  "overall_pass": "PRONTO PARA ACX: APROVADO",
  "overall_fail": "ATENÇÃO: REPROVADO",
  "metric_peak": "Nível de Pico",
  "metric_rms": "Nível RMS",
  "metric_noise": "Ruído de Fundo",
  "metric_samplerate": "Taxa de Amostragem",
  "status_pass": "APROVADO",
  "status_fail": "REPROVADO",
  "advice_peak_fail": "O nível de pico deve ser <= -3.0 dB. Abaixe o volume master ou use um limitador true-peak.",
  "advice_rms_fail_high": "O RMS está muito alto (deve ser <= -18.0 dB). Abaixe o volume geral.",
  "advice_rms_fail_low": "O RMS está muito baixo (deve ser >= -23.0 dB). Aumente o volume geral ou use compressão.",
  "advice_noise_fail": "O ruído de fundo é muito alto (deve ser <= -60.0 dB). Use um noise gate suave ou um redutor de ruído espectral.",
  "advice_samplerate_fail": "A taxa de amostragem deve ser exatamente 44.1 kHz. Por favor, reamostre seu áudio.",
  "bmc_cta": "Apoie nossas ferramentas gratuitas"
});
fs.writeFileSync('messages/pt.json', JSON.stringify(ptJson, null, 2));

console.log("Updated remaining acx_checker dictionary fields.");
