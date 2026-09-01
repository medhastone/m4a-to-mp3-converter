const fs = require('fs');
const data = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

data.acx_checker = {
  "h1": "ACX Audio <highlight>Compliance Checker</highlight>",
  "subtitle": "Instantly verify your audiobooks against ACX standards. 100% private in-browser analysis.",
  "dropzone_title": "Drop Audio Here",
  "dropzone_subtitle": "Supports MP3, WAV, FLAC, M4A",
  "analyzing": "Analyzing Audio...",
  "overall_pass": "ACX READY: PASSED",
  "overall_fail": "ATTENTION: FAILED",
  "metric_peak": "Peak Level",
  "metric_rms": "RMS Level",
  "metric_noise": "Noise Floor",
  "metric_samplerate": "Sample Rate",
  "status_pass": "PASS",
  "status_fail": "FAIL",
  "advice_peak_fail": "Peak level must be <= -3.0 dB. Lower your master volume or use a true-peak limiter.",
  "advice_rms_fail_high": "RMS is too loud (must be <= -18.0 dB). Lower your overall volume.",
  "advice_rms_fail_low": "RMS is too quiet (must be >= -23.0 dB). Increase your overall volume or use compression.",
  "advice_noise_fail": "Noise floor is too high (must be <= -60.0 dB). Use a gentle noise gate or spectral denoiser to reduce room hum.",
  "advice_samplerate_fail": "Sample rate must be exactly 44.1 kHz. Please resample your audio.",
  "bmc_cta": "Support our free tools"
};

fs.writeFileSync('messages/en.json', JSON.stringify(data, null, 2));
console.log('done!');
