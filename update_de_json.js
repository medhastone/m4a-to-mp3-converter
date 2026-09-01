const fs = require('fs');

const deJson = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

deJson.acx_article = {
  "h2_barrier": "Die ACX-Einreichungsbarriere: Warum Hörbücher durchfallen",
  "p_barrier_1": "Als leitender Audio-Mastering-Ingenieur und Voiceover-Coach habe ich hunderte von Hörbüchern für ACX, Audible und Findaway Voices vorab gemastert.",
  "p_barrier_2": "Die frustrierende Realität für viele Indie-Autoren und Erzähler ist, dass bis zu 30 % der selbst erzählten Hörbücher bei den automatisierten ACX-Qualitätssicherungsprüfungen (QA) abgelehnt werden.",
  "p_barrier_3": "Diese Ablehnungen erfolgen selten aufgrund einer schlechten Leistung. Sie treten aufgrund strenger technischer Anforderungen an die akustische Leistungsmessung auf.",
  "p_barrier_4": "Plötzliche Plosiv-Spitzen, aggressive Noise Gates, die unnatürliche Totstille-Lücken erzeugen, unregelmäßige Mikrofonpositionierung, die den RMS-Wert beeinflusst, und unsachgemäßes Trimmen des Raumtons an Anfang und Ende sind die Hauptursachen.",
  "p_barrier_5": "Traditionell verließen sich Erzähler auf Desktop-Installationen oder komplexe Audacity-Nyquist-Plugin-Konfigurationen, um eine ACX-Prüfung durchzuführen.",
  "p_barrier_6": "Dieser Online-ACX-Compliance-Analysator im Browser löst dieses Problem. Er dient als sofortige, upload-freie Lösung, um Hörbuchkapitel kostenlos auf die offiziellen Audible ACX-Anforderungen zu testen – und spart so Stunden an Frustration.",
  
  "h2_verify": "So überprüfen Sie Ihr Hörbuch in 3 Schritten",
  "step1_title": "01. Kapitel-Audio aufnehmen",
  "step1_desc": "Legen Sie Ihr fertiges Kapitel ab. Wir unterstützen alle gängigen Formate wie MP3, WAV, FLAC und M4A.",
  "step2_title": "02. Echtzeit-DSP-Analyse",
  "step2_desc": "Die Web-Audio-Engine analysiert Peak, RMS, Grundrauschen, Raumton, DC-Offset und Crest-Faktor.",
  "step3_title": "03. Überprüfen & Exportieren",
  "step3_desc": "Überprüfen Sie das interaktive Pass/Fail-Dashboard und laden Sie den PDF-Bericht zum ACX-Audiotest herunter.",
  
  "h2_matrix": "Offizielle ACX-Standard-Compliance-Matrix",
  "matrix_desc": "Um die Audible Quality Assurance-Roboter zu passieren, müssen Ihre exportierten MP3- oder WAV-Dateien die folgenden akustischen Schwellenwerte strikt einhalten:",
  "matrix_th_metric": "Akustische Metrik",
  "matrix_th_acx": "Offizielle ACX-Anforderung",
  "matrix_th_why": "Warum es wichtig ist",
  "matrix_rms": "RMS (Durchschnittliche Lautstärke)",
  "matrix_rms_val": "Zwischen -23 dB und -18 dB",
  "matrix_rms_why": "Sorgt für eine konstante Hörlautstärke über alle Kapitel hinweg.",
  "matrix_peak": "True Peak / Max Peak",
  "matrix_peak_val": "Niedriger als -3,0 dBFS",
  "matrix_peak_why": "Verhindert digitale Verzerrungen und Übersteuerungen bei der MP3-Codierung.",
  "matrix_noise": "Grundrauschen (Raumton)",
  "matrix_noise_val": "Niedriger als -60 dB RMS",
  "matrix_noise_why": "Sorgt dafür, dass kein hörbares Hintergrundrauschen oder AC-Brummen auftritt.",
  "matrix_sample": "Abtastrate & Auflösung",
  "matrix_sample_val": "44,1 kHz, 16-Bit (Minimum)",
  "matrix_sample_why": "Industriestandard für Voiceover- und Hörbuchvertrieb.",
  
  "h2_guide": "Deep-Dive-Lösungsleitfaden: Behebung der 4 häufigsten ACX-Fehler",
  "h3_peak": "1. So beheben Sie Peak-Fehler (> -3,0 dB)",
  "p_peak": "Wenn Ihre Spitzenamplitude -3,0 dBFS überschreitet, fällt Ihr Hörbuch sofort durch. Die beste Lösung ist die Verwendung eines Brickwall-True-Peak-Limiters ganz am Ende Ihrer Mastering-Kette. Stellen Sie die Obergrenze auf -3,1 dB ein, um einen winzigen Sicherheitsspielraum gegen MP3-Codierungsüberschwinger zu schaffen, und lassen Sie den Limiter die verirrten Plosive und lauten stimmlichen Ausdrücke abfangen.",
  
  "h3_rms": "2. So beheben Sie RMS-Fehler (< -23 dB oder > -18 dB)",
  "p_rms": "Wenn Ihr Audio zu leise oder zu laut ist, müssen Sie verstehen, wie Sie die RMS-Pegel für Audible korrigieren. RMS ist ein Durchschnitt. Wenn Sie nur die Lautstärke (Gain) aufdrehen, werden Ihre Peaks wahrscheinlich -3,0 dB überschreiten. Die Lösung ist eine sanfte optische oder VCA-Kompression. Verwenden Sie ein Verhältnis von 2:1 oder 3:1, einen Attack von etwa 30 ms und ein Release von 100 ms. Komprimieren Sie die Stimme sanft und verwenden Sie dann Make-up-Gain, um den Gesamt-RMS in den Sweet Spot von -20,5 dB anzuheben.",
  
  "h3_noise": "3. So beheben Sie Fehler beim Grundrauschen (> -60 dB)",
  "p_noise_1": "Fragen Sie sich, wie Sie einen zu hohen ACX-Rauschpegel online beheben können? Verstehen Sie zunächst den 500-ms-Schiebefenster-RMS-Algorithmus, der zur Berechnung des Raumtons verwendet wird. ACX erfordert, dass das Ruhegeräusch bei oder unter -60 dB RMS liegt. Der Unterschied zwischen dem Umgebungsraumton (dem natürlichen Klang Ihrer Kabine) und dem Vorverstärkerrauschen ist entscheidend.",
  "p_noise_2": "Verwenden Sie keine harten Noise Gates, die das Audio zwischen den Wörtern vollständig stumm schalten. Dies erzeugt eine \"digitale Stille\" (-∞ dB), die von automatisierten ACX-Bots als Fehler markiert wird. Verwenden Sie stattdessen eine sanfte spektrale Subtraktion (Denoising-Plugins), um das Rauschen des Raumtons sanft auf -60 dB abzusenken und ihn gleichzeitig natürlich klingen zu lassen.",
  
  "h3_room": "4. So beheben Sie Fehler beim Raumton am Anfang und Ende",
  "p_room": "Sie müssen zu Beginn des Kapitels 0,5 bis 1 Sekunde natürlichen Raumton und am Ende 1 bis 5 Sekunden belassen. Wenn Sie eine Überprüfung des Raumtons für ACX durchführen und diese fehlschlägt, bedeutet dies normalerweise, dass Sie das Audio direkt bei der ersten Silbe abgeschnitten haben oder den Anfang markiert und auf \"Löschen\" gedrückt haben, wodurch pure digitale Stille entsteht. Fügen Sie immer aufgenommenen Raumton in diese Lücken ein, niemals künstliche Stille.",
  
  "h2_vs": "In-Browser Web Audio Analyzer vs. Audacity Nyquist Plugin",
  "p_vs": "Während viele Sprecher nach dem besten kostenlosen Tool suchen, um Hörbuch-Audio vor dem ACX-Upload zu überprüfen, beinhaltete der traditionelle Weg die Installation von Audacity und das Herunterladen des alten Plugins ACX-Check.ny. Hier sehen Sie, wie sich unser modernes Web-Tool als Online-Alternative zum Audacity ACX-Check vergleicht.",
  "vs_th_feature": "Funktion / Diagnosefunktion",
  "vs_th_our": "Unser In-Browser ACX Checker",
  "vs_th_trad": "Traditionelles Audacity ACX-Check.ny Plugin",
  "vs_install": "Installation / Einrichtung",
  "vs_install_our": "Keine (Sofortiges Laden)",
  "vs_install_trad": "Erfordert Software & manuelle Plugin-Installation",
  "vs_cross": "Plattformübergreifende Kompatibilität",
  "vs_cross_our": "Mac, Windows, iOS, Android, ChromeOS",
  "vs_cross_trad": "Nur Mac, Windows, Linux",
  "vs_pdf": "Sofortiger PDF-Export",
  "vs_pdf_our": "Ja, generiert professionelle Berichte",
  "vs_pdf_trad": "Nein",
  "vs_dc": "Diagnose von DC-Offset & Raumton",
  "vs_dc_our": "Ja",
  "vs_dc_trad": "Begrenzt",
  "vs_priv": "Datenschutz & Keine Uploads",
  "vs_priv_our": "100 % lokale RAM-Verarbeitung",
  "vs_priv_trad": "100 % lokale Desktop-Verarbeitung",
  
  "h2_pdf": "Audioqualität & Kundenberichterstattung: Die PDF-Inspektionsfunktion",
  "p_pdf_1": "Wenn Sie ein freiberuflicher Toningenieur, Voiceover-Coach oder Sprecher sind, der Dateien an einen Verlag liefert, sind Vertrauen und Nachweise unerlässlich. Wenn Sie unseren Audible QA Audio Checker online ausführen, können Sie sofort den PDF-Bericht zum ACX-Audiotest herunterladen.",
  "p_pdf_2": "Dieses herunterladbare Zertifikat dient als Nachweis der Audiobereitschaft. Sie können diesen detaillierten Bericht zusammen mit den fertigen WAV- oder MP3-Dateien direkt an Ihre Indie-Autoren und Verleger senden. Er beweist, dass die Kapitel streng geprüft wurden und garantiert ohne Zurückweisungen durch die automatisierten ACX-Prüfungen kommen.",
  
  "h2_faq": "Häufig gestellte Fragen",
  "faq_q1": "Warum verlangt ACX, dass die Spitzenpegel unter -3,0 dBFS statt 0 dB bleiben?",
  "faq_a1": "Hörbuchdateien werden zur Verteilung in Formate wie MP3 komprimiert. Der Kodierungsprozess verursacht oft geringfügige Amplitudenänderungen, die als \"Inter-Sample Peaking\" bezeichnet werden. Das Festlegen eines maximalen Peaks von -3,0 dBFS garantiert, dass das Audio selbst nach einer aggressiven MP3-Komprimierung niemals 0 dB (digitales Clipping) erreicht und auf den Kopfhörern des Hörers nicht verzerrt.",
  "faq_q2": "Wie kann ich meine Hörbuchkapitel auf ACX-Konformität prüfen, ohne Audacity zu installieren?",
  "faq_a2": "Sie können dieses kostenlose Online-Tool zur ACX-Prüfung verwenden. Es läuft vollständig in Ihrem Webbrowser mithilfe der Web Audio API. Ziehen Sie Ihre Audiodatei einfach in die Dropzone, um RMS, Peak und Grundrauschen sofort zu überprüfen, ohne lernen zu müssen, wie Sie den ACX-Check ohne Audacity mit komplizierter Desktop-Software bestehen.",
  "faq_q3": "Was ist der Unterschied zwischen RMS und LUFS bei der ACX-Hörbuchproduktion?",
  "faq_a3": "RMS (Root Mean Square) misst den rohen mathematischen Durchschnitt der elektrischen Audioenergie im Zeitverlauf. LUFS (Loudness Units relative to Full Scale) integriert einen menschlichen Hörfilter (die K-bewertete Kurve), um die wahrgenommene Lautheit zu messen. Während Fernsehen und Podcasting LUFS verwenden (-16 bis -23 LUFS), verlangt Audible ACX strikt RMS (-23 bis -18 dB RMS). Die Verwendung von LUFS-Metern für ACX kann zu fehlgeschlagenen Einreichungen führen.",
  "faq_q4": "Warum fällt künstliche digitale Stille beim ACX-Hintergrundgeräuschtest durch?",
  "faq_a4": "Die automatisierten QA-Prüfungen von ACX suchen nach einem natürlichen, zusammenhängenden Hörerlebnis. Wenn Sie ein hartes Noise Gate verwenden oder das Audio zwischen den Phrasen löschen, fällt das Grundrauschen im Hintergrund auf negativ unendlich (-∞ dB). Dieser abrupte Wechsel zwischen natürlichem Raumton und totaler Stille klingt fehlerhaft und lenkt ab, was zu einer sofortigen Ablehnung führt. Sie müssen immer einen natürlichen Raumton (ca. -60 dB) verwenden, um Lücken zu füllen.",
  "faq_q5": "Werden meine Audioaufnahmen und Sprachdateien auf einen externen Server hochgeladen?",
  "faq_a5": "Nein. Wenn Sie die Audioqualität von Hörbüchern kostenlos mit unserem Tool testen, erfolgt die Analyse zu 100 % lokal im RAM Ihres Geräts. Es werden null Bytes in die Cloud hochgeladen, was absolute Privatsphäre und rechtliche Sicherheit für unveröffentlichte NDA-Hörbuchdateien gewährleistet."
};

fs.writeFileSync('messages/de.json', JSON.stringify(deJson, null, 2));
console.log('Added acx_article to de.json');
