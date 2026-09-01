const fs = require('fs');

const enJson = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

enJson.acx_article = {
  "h2_barrier": "The ACX Submission Barrier: Why Audiobooks Fail",
  "p_barrier_1": "As a principal audio mastering engineer and voiceover coach, I have pre-mastered hundreds of audiobooks destined for ACX, Audible, and Findaway Voices.",
  "p_barrier_2": "The frustrating reality for many indie authors and narrators is that up to 30% of self-narrated audiobooks are rejected during the automated ACX QA (Quality Assurance) checks.",
  "p_barrier_3": "These rejections rarely happen because of a bad performance. They occur due to rigid technical requirements around acoustic power measurement.",
  "p_barrier_4": "Sudden plosive peaks, aggressive noise gates that produce unnatural dead-silence gaps, erratic mic positioning affecting RMS, and improper head/tail room tone trimming are the primary culprits.",
  "p_barrier_5": "Traditionally, narrators relied on desktop installations or complex Audacity Nyquist plugin configurations to run an ACX check.",
  "p_barrier_6": "This online ACX compliance analyzer in browser solves that problem. It serves as an instant, zero-upload solution to test audiobook chapters against official Audible ACX requirements for free—saving hours of frustration.",
  
  "h2_verify": "How to Verify Your Audiobook in 3 Steps",
  "step1_title": "01. Ingest Chapter Audio",
  "step1_desc": "Drop your finalized chapter. We support all major formats including MP3, WAV, FLAC, and M4A.",
  "step2_title": "02. Real-Time DSP Analysis",
  "step2_desc": "The Web Audio engine analyzes Peak, RMS, Noise Floor, Room Tone, DC Offset, and Crest Factor.",
  "step3_title": "03. Review & Export",
  "step3_desc": "Check the interactive Pass/Fail dashboard and download the ACX audio test report PDF.",
  
  "h2_matrix": "Official ACX Standard Compliance Matrix",
  "matrix_desc": "To pass the Audible Quality Assurance robots, your exported MP3 or WAV files must strictly adhere to the following acoustic thresholds:",
  "matrix_th_metric": "Acoustic Metric",
  "matrix_th_acx": "Official ACX Requirement",
  "matrix_th_why": "Why it matters",
  "matrix_rms": "RMS (Average Loudness)",
  "matrix_rms_val": "Between -23 dB and -18 dB",
  "matrix_rms_why": "Ensures consistent listening volume across all chapters.",
  "matrix_peak": "True Peak / Max Peak",
  "matrix_peak_val": "Lower than -3.0 dBFS",
  "matrix_peak_why": "Prevents digital distortion and clipping when encoded to MP3.",
  "matrix_noise": "Noise Floor (Room Tone)",
  "matrix_noise_val": "Lower than -60 dB RMS",
  "matrix_noise_why": "Ensures no audible background hiss or AC hum.",
  "matrix_sample": "Sample Rate & Resolution",
  "matrix_sample_val": "44.1 kHz, 16-bit (Minimum)",
  "matrix_sample_why": "Industry standard for voiceover and audiobook distribution.",
  
  "h2_guide": "Deep-Dive Remediation Guide: Fixing the 4 Most Common ACX Failures",
  "h3_peak": "1. How to Fix Peak Failures (> -3.0 dB)",
  "p_peak": "If your peak amplitude exceeds -3.0 dBFS, your audiobook will instantly fail. The best fix is to use a brickwall True Peak limiter at the very end of your mastering chain. Set the ceiling to -3.1 dB to provide a tiny safety margin against MP3 encoding overshoots, and let the limiter catch the stray plosives and loud vocal expressions.",
  
  "h3_rms": "2. How to Fix RMS Failures (< -23 dB or > -18 dB)",
  "p_rms": "If your audio is too quiet or too loud, you need to understand how to fix rms levels for audible. RMS is an average. If you just turn up the volume (gain), your peaks will likely exceed -3.0 dB. The solution is gentle optical or VCA compression. Use a ratio of 2:1 or 3:1, an attack around 30ms, and a release of 100ms. Compress the vocal gently, then use makeup gain to lift the overall RMS into the sweet spot of -20.5 dB.",
  
  "h3_noise": "3. How to Fix Noise Floor Failures (> -60 dB)",
  "p_noise_1": "Wondering how to fix acx noise floor too high online? First, understand the 500ms sliding-window RMS algorithm used to calculate room tone. ACX requires the resting noise to be at or below -60 dB RMS. The difference between ambient room tone (the natural sound of your booth) and preamp hiss is critical.",
  "p_noise_2": "Do not use harsh noise gates that completely mute the audio between words. This creates \"digital silence\" (-∞ dB), which automated ACX bots flag as an error. Instead, use gentle spectral subtraction (denoising plugins) to smoothly lower room tone noise floor to -60db while keeping it sounding natural.",
  
  "h3_room": "4. How to Fix Head & Tail Room Tone Errors",
  "p_room": "You must leave 0.5 to 1 second of natural room tone at the start of the chapter, and 1 to 5 seconds at the end. If you run an acx head tail room tone check and fail, it usually means you cut the audio directly on the first syllable, or you highlighted the start and pressed \"Delete,\" leaving pure digital silence. Always paste recorded room tone into these gaps, never artificial silence.",
  
  "h2_vs": "In-Browser Web Audio Analyzer vs. Audacity Nyquist Plugin",
  "p_vs": "While many narrators look for the best free tool to check audiobook audio before acx upload, the traditional route involved installing Audacity and downloading the old ACX-Check.ny plugin. Here is how our modern web tool compares as an online audacity acx check alternative.",
  "vs_th_feature": "Feature / Diagnostic Capability",
  "vs_th_our": "Our In-Browser ACX Checker",
  "vs_th_trad": "Traditional Audacity ACX-Check.ny",
  "vs_install": "Installation / Setup",
  "vs_install_our": "None (Instant Load)",
  "vs_install_trad": "Requires software & manual plugin install",
  "vs_cross": "Cross-Platform Compatibility",
  "vs_cross_our": "Mac, Windows, iOS, Android, ChromeOS",
  "vs_cross_trad": "Mac, Windows, Linux only",
  "vs_pdf": "Instant PDF Export",
  "vs_pdf_our": "Yes, generates professional reports",
  "vs_pdf_trad": "No",
  "vs_dc": "DC Offset & Room Tone Diagnostics",
  "vs_dc_our": "Yes",
  "vs_dc_trad": "Limited",
  "vs_priv": "Privacy & Zero Uploads",
  "vs_priv_our": "100% Local RAM Processing",
  "vs_priv_trad": "100% Local Desktop Processing",
  
  "h2_pdf": "Audio Quality & Client Reporting: The PDF Inspection Feature",
  "p_pdf_1": "If you are a freelance sound engineer, voiceover coach, or narrator delivering files to a publisher, trust and proof are essential. When you run our audible qa audio checker online, you can instantly download acx audio test report pdf.",
  "p_pdf_2": "This downloadable certificate serves as proof of audio readiness. You can send this detailed report directly to your indie authors and publishers alongside the finished WAV or MP3 files. It proves that the chapters have been rigorously checked and are guaranteed to pass the automated ACX checks without kickbacks.",
  
  "h2_faq": "Frequently Asked Questions",
  "faq_q1": "Why does ACX require Peak levels to stay below -3.0 dBFS instead of 0 dB?",
  "faq_a1": "Audiobook files are compressed into formats like MP3 for distribution. The encoding process often causes minor amplitude changes known as \"inter-sample peaking.\" Setting a maximum peak of -3.0 dBFS guarantees that even after aggressive MP3 compression, the audio will never hit 0 dB (digital clipping) and distort on the listener's headphones.",
  "faq_q2": "How can I check my audiobook chapters for ACX compliance without installing Audacity?",
  "faq_a2": "You can use this free ACX check online free tool. It runs entirely inside your web browser using the Web Audio API. Simply drag and drop your audio file into the dropzone to instantly check the RMS, Peak, and Noise Floor without needing to learn how to pass acx check without audacity using complicated desktop software.",
  "faq_q3": "What is the difference between RMS and LUFS for ACX audiobook production?",
  "faq_a3": "RMS (Root Mean Square) measures the raw mathematical average of electrical audio energy over time. LUFS (Loudness Units relative to Full Scale) incorporates a human hearing filter (the K-weighted curve) to measure perceived loudness. While TV and podcasting use LUFS (-16 to -23 LUFS), Audible ACX strictly requires RMS (-23 to -18 dB RMS). Using LUFS meters for ACX can result in failed submissions.",
  "faq_q4": "Why does artificial digital silence fail the ACX background noise test?",
  "faq_a4": "ACX's automated QA checks look for a natural, cohesive listening experience. If you use a hard noise gate or delete the audio between phrases, the background noise floor drops to negative infinity (-∞ dB). This abrupt shift between natural room tone and total silence sounds glitchy and distracting, causing an instant rejection. You must always use a natural room tone (around -60 dB) to fill gaps.",
  "faq_q5": "Are my audio recordings and narration files uploaded to an external server?",
  "faq_a5": "No. When you test audiobook audio quality free using our tool, 100% of the analysis happens locally in your device's RAM. Zero bytes are uploaded to the cloud, ensuring total privacy and legal safety for unreleased NDA audiobook files."
};

fs.writeFileSync('messages/en.json', JSON.stringify(enJson, null, 2));
console.log('Added acx_article to en.json');
