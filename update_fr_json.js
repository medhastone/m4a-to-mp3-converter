const fs = require('fs');

const frJson = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));

frJson.acx_article = {
  "h2_barrier": "La Barrière de Soumission ACX : Pourquoi les Livres Audio Échouent",
  "p_barrier_1": "En tant qu'ingénieur principal de mastering audio et coach vocal, j'ai pré-masterisé des centaines de livres audio destinés à ACX, Audible et Findaway Voices.",
  "p_barrier_2": "La réalité frustrante pour de nombreux auteurs indépendants et narrateurs est que jusqu'à 30 % des livres audio auto-narrés sont rejetés lors des contrôles automatisés d'assurance qualité (QA) d'ACX.",
  "p_barrier_3": "Ces rejets se produisent rarement en raison d'une mauvaise performance. Ils se produisent en raison d'exigences techniques strictes concernant la mesure de la puissance acoustique.",
  "p_barrier_4": "Des pics de plosives soudains, des noise gates agressifs qui produisent des espaces de silence mort non naturels, un positionnement erratique du micro affectant le RMS, et un mauvais rognage du bruit ambiant au début et à la fin sont les principaux coupables.",
  "p_barrier_5": "Traditionnellement, les narrateurs s'appuyaient sur des installations de bureau ou des configurations complexes du plugin Audacity Nyquist pour effectuer une vérification ACX.",
  "p_barrier_6": "Cet analyseur de conformité ACX en ligne dans le navigateur résout ce problème. Il sert de solution instantanée et sans téléchargement pour tester gratuitement les chapitres de livres audio par rapport aux exigences officielles d'Audible ACX, ce qui permet d'économiser des heures de frustration.",
  
  "h2_verify": "Comment Vérifier votre Livre Audio en 3 Étapes",
  "step1_title": "01. Ingérer l'Audio du Chapitre",
  "step1_desc": "Déposez votre chapitre finalisé. Nous prenons en charge tous les principaux formats, y compris MP3, WAV, FLAC et M4A.",
  "step2_title": "02. Analyse DSP en Temps Réel",
  "step2_desc": "Le moteur Web Audio analyse les Pics, le RMS, le Bruit de Fond, le Bruit Ambiant, le Décalage DC et le Facteur de Crête.",
  "step3_title": "03. Révision et Exportation",
  "step3_desc": "Vérifiez le tableau de bord interactif Réussite/Échec et téléchargez le PDF du rapport de test audio ACX.",
  
  "h2_matrix": "Matrice Officielle de Conformité à la Norme ACX",
  "matrix_desc": "Pour passer les robots d'Assurance Qualité d'Audible, vos fichiers MP3 ou WAV exportés doivent respecter strictement les seuils acoustiques suivants :",
  "matrix_th_metric": "Métrique Acoustique",
  "matrix_th_acx": "Exigence Officielle d'ACX",
  "matrix_th_why": "Pourquoi c'est important",
  "matrix_rms": "RMS (Volume Moyen)",
  "matrix_rms_val": "Entre -23 dB et -18 dB",
  "matrix_rms_why": "Garantit un volume d'écoute constant sur tous les chapitres.",
  "matrix_peak": "Pic Vrai / Pic Max",
  "matrix_peak_val": "Inférieur à -3.0 dBFS",
  "matrix_peak_why": "Empêche la distorsion numérique et le clipping lors de l'encodage en MP3.",
  "matrix_noise": "Bruit de Fond (Bruit Ambiant)",
  "matrix_noise_val": "Inférieur à -60 dB RMS",
  "matrix_noise_why": "Garantit qu'il n'y a pas de souffle de fond audible ou de bourdonnement AC.",
  "matrix_sample": "Fréquence d'Échantillonnage et Résolution",
  "matrix_sample_val": "44.1 kHz, 16-bit (Minimum)",
  "matrix_sample_why": "Norme de l'industrie pour la voix off et la distribution de livres audio.",
  
  "h2_guide": "Guide de Remédiation Détaillé : Résoudre les 4 Échecs ACX les plus Courants",
  "h3_peak": "1. Comment Résoudre les Échecs de Pics (> -3.0 dB)",
  "p_peak": "Si votre amplitude de crête dépasse -3,0 dBFS, votre livre audio échouera instantanément. La meilleure solution consiste à utiliser un limiteur True Peak brickwall à la toute fin de votre chaîne de mastering. Réglez le plafond à -3,1 dB pour fournir une petite marge de sécurité contre les dépassements d'encodage MP3, et laissez le limiteur attraper les plosives égarées et les expressions vocales fortes.",
  
  "h3_rms": "2. Comment Résoudre les Échecs RMS (< -23 dB ou > -18 dB)",
  "p_rms": "Si votre audio est trop faible ou trop fort, vous devez comprendre comment corriger les niveaux rms pour Audible. Le RMS est une moyenne. Si vous montez simplement le volume (gain), vos pics dépasseront probablement -3,0 dB. La solution est une compression optique ou VCA douce. Utilisez un ratio de 2:1 ou 3:1, une attaque d'environ 30 ms et un relâchement de 100 ms. Compressez la voix doucement, puis utilisez le gain de compensation pour amener le RMS global dans la zone idéale de -20,5 dB.",
  
  "h3_noise": "3. Comment Résoudre les Échecs de Bruit de Fond (> -60 dB)",
  "p_noise_1": "Vous vous demandez comment réparer le bruit de fond acx trop élevé en ligne ? Tout d'abord, comprenez l'algorithme RMS à fenêtre glissante de 500 ms utilisé pour calculer le bruit ambiant. ACX exige que le bruit au repos soit égal ou inférieur à -60 dB RMS. La différence entre le bruit ambiant de la pièce (le son naturel de votre cabine) et le souffle du préampli est critique.",
  "p_noise_2": "N'utilisez pas de noise gates stricts qui coupent complètement l'audio entre les mots. Cela crée un \"silence numérique\" (-∞ dB), que les robots ACX automatisés signalent comme une erreur. Au lieu de cela, utilisez une soustraction spectrale douce (plugins de réduction de bruit) pour abaisser doucement le bruit de fond ambiant à -60 dB tout en le gardant naturel.",
  
  "h3_room": "4. Comment Résoudre les Erreurs de Bruit Ambiant au Début et à la Fin",
  "p_room": "Vous devez laisser 0,5 à 1 seconde de bruit ambiant naturel au début du chapitre, et 1 à 5 secondes à la fin. Si vous effectuez une vérification du bruit ambiant au début et à la fin de l'acx et qu'elle échoue, cela signifie généralement que vous avez coupé l'audio directement sur la première syllabe, ou que vous avez mis en surbrillance le début et appuyé sur \"Supprimer\", laissant un pur silence numérique. Collez toujours le bruit ambiant enregistré dans ces espaces, jamais de silence artificiel.",
  
  "h2_vs": "Analyseur Audio Web dans le Navigateur vs. Plugin Audacity Nyquist",
  "p_vs": "Alors que de nombreux narrateurs recherchent le meilleur outil gratuit pour vérifier l'audio des livres audio avant le téléchargement sur acx, la voie traditionnelle impliquait l'installation d'Audacity et le téléchargement de l'ancien plugin ACX-Check.ny. Voici comment notre outil Web moderne se compare en tant qu'alternative en ligne à la vérification acx d'Audacity.",
  "vs_th_feature": "Fonctionnalité / Capacité de Diagnostic",
  "vs_th_our": "Notre Vérificateur ACX dans le Navigateur",
  "vs_th_trad": "Plugin Audacity ACX-Check.ny Traditionnel",
  "vs_install": "Installation / Configuration",
  "vs_install_our": "Aucune (Chargement Instantané)",
  "vs_install_trad": "Nécessite l'installation d'un logiciel et d'un plugin manuel",
  "vs_cross": "Compatibilité Multiplateforme",
  "vs_cross_our": "Mac, Windows, iOS, Android, ChromeOS",
  "vs_cross_trad": "Mac, Windows, Linux uniquement",
  "vs_pdf": "Exportation PDF Instantanée",
  "vs_pdf_our": "Oui, génère des rapports professionnels",
  "vs_pdf_trad": "Non",
  "vs_dc": "Diagnostics du Décalage DC et du Bruit Ambiant",
  "vs_dc_our": "Oui",
  "vs_dc_trad": "Limité",
  "vs_priv": "Confidentialité et Zéro Téléchargement",
  "vs_priv_our": "Traitement 100% Local en RAM",
  "vs_priv_trad": "Traitement 100% Local sur Bureau",
  
  "h2_pdf": "Qualité Audio et Rapports Clients : La Fonction d'Inspection PDF",
  "p_pdf_1": "Si vous êtes un ingénieur du son indépendant, un coach vocal ou un narrateur fournissant des fichiers à un éditeur, la confiance et les preuves sont essentielles. Lorsque vous exécutez notre vérificateur audio qa audible en ligne, vous pouvez télécharger instantanément le pdf du rapport de test audio acx.",
  "p_pdf_2": "Ce certificat téléchargeable sert de preuve de préparation audio. Vous pouvez envoyer ce rapport détaillé directement à vos auteurs indépendants et éditeurs avec les fichiers WAV ou MP3 terminés. Cela prouve que les chapitres ont été rigoureusement vérifiés et sont garantis pour passer les contrôles ACX automatisés sans rejets.",
  
  "h2_faq": "Foire Aux Questions",
  "faq_q1": "Pourquoi ACX exige-t-il que les niveaux de pointe restent inférieurs à -3.0 dBFS au lieu de 0 dB ?",
  "faq_a1": "Les fichiers de livres audio sont compressés dans des formats tels que MP3 pour la distribution. Le processus d'encodage provoque souvent des changements d'amplitude mineurs appelés « pics inter-échantillons ». La définition d'une crête maximale de -3,0 dBFS garantit que, même après une compression MP3 agressive, l'audio n'atteindra jamais 0 dB (écrêtage numérique) et ne se déformera pas dans les écouteurs de l'auditeur.",
  "faq_q2": "Comment puis-je vérifier la conformité ACX de mes chapitres de livres audio sans installer Audacity ?",
  "faq_a2": "Vous pouvez utiliser cet outil gratuit de vérification ACX en ligne. Il s'exécute entièrement dans votre navigateur Web à l'aide de l'API Web Audio. Faites simplement glisser et déposez votre fichier audio dans la zone de dépôt pour vérifier instantanément le RMS, la Crête et le Bruit de fond sans avoir besoin d'apprendre comment réussir la vérification acx sans audacity à l'aide d'un logiciel de bureau compliqué.",
  "faq_q3": "Quelle est la différence entre RMS et LUFS pour la production de livres audio ACX ?",
  "faq_a3": "Le RMS (Root Mean Square) mesure la moyenne mathématique brute de l'énergie audio électrique au fil du temps. LUFS (Loudness Units relative to Full Scale) intègre un filtre d'audition humaine (la courbe pondérée K) pour mesurer l'intensité sonore perçue. Alors que la télévision et le podcasting utilisent le LUFS (-16 à -23 LUFS), Audible ACX exige strictement le RMS (-23 à -18 dB RMS). L'utilisation de compteurs LUFS pour ACX peut entraîner des soumissions échouées.",
  "faq_q4": "Pourquoi le silence numérique artificiel échoue-t-il au test de bruit de fond ACX ?",
  "faq_a4": "Les contrôles d'assurance qualité automatisés d'ACX recherchent une expérience d'écoute naturelle et cohérente. Si vous utilisez un noise gate dur ou supprimez l'audio entre les phrases, le bruit de fond tombe à l'infini négatif (-∞ dB). Ce changement soudain entre le bruit ambiant naturel et le silence total semble défectueux et distrayant, provoquant un rejet instantané. Vous devez toujours utiliser un bruit ambiant naturel (environ -60 dB) pour combler les lacunes.",
  "faq_q5": "Mes enregistrements audio et fichiers de narration sont-ils téléchargés sur un serveur externe ?",
  "faq_a5": "Non. Lorsque vous testez gratuitement la qualité audio d'un livre audio à l'aide de notre outil, 100 % de l'analyse est effectuée localement dans la RAM de votre appareil. Aucun octet n'est téléchargé vers le cloud, garantissant une confidentialité totale et une sécurité juridique pour les fichiers de livres audio NDA non publiés."
};

fs.writeFileSync('messages/fr.json', JSON.stringify(frJson, null, 2));
console.log('Added acx_article to fr.json');
