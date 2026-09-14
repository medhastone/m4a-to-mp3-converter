const fs = require('fs');

const updates = {
  es: {
    alert_wav_only: 'Por favor, selecciona solo archivos WAV.',
    audio_quality: 'Calidad de Audio',
    best: '(Mejor)',
    completed: 'Completado',
    conversion_queue: 'Cola de Conversión',
    converting: 'Convirtiendo...',
    description: 'Codificación del lado del cliente de grado de producción. Cero subidas. Tamaño de archivo ilimitado.',
    download_all: 'Descargar Todo (ZIP)',
    download_mp3: 'Descargar MP3',
    drop_desc: 'Soporta PCM de 16/24/32 bits. Los archivos se procesan instantáneamente en la memoria de tu navegador.',
    drop_title: 'Arrastra tus archivos WAV aquí',
    error_prefix: 'Error',
    kbps: 'kbps',
    select_bitrate: 'Seleccionar tasa de bits de MP3',
    share: 'Compartir',
    share_copied: '¡Enlace copiado al portapapeles!',
    share_text: 'Convierte WAV a MP3 localmente en tu navegador con cero subidas. Soporta tamaños de archivo ilimitados y 320kbps.',
    share_title: 'Convertidor Gratis de WAV a MP3',
    share_title_attr: 'Compartir esta herramienta',
    share_tool: 'Compartir Herramienta',
    share_tool_title: 'Comparte esta herramienta con colegas',
    title_highlight: 'Convertidor',
    title_prefix: 'WAV a MP3',
    waiting_in_queue: 'Esperando en la cola...'
  },
  fr: {
    alert_wav_only: 'Veuillez sélectionner uniquement des fichiers WAV.',
    audio_quality: 'Qualité audio',
    best: '(Meilleur)',
    completed: 'Terminé',
    conversion_queue: "File d'attente de conversion",
    converting: 'Conversion en cours...',
    description: 'Encodage côté client de qualité production. Zéro téléchargement. Tailles de fichiers illimitées.',
    download_all: 'Tout télécharger (ZIP)',
    download_mp3: 'Télécharger MP3',
    drop_desc: 'Prend en charge le PCM 16/24/32 bits. Les fichiers sont traités instantanément dans la mémoire de votre navigateur.',
    drop_title: 'Déposez vos fichiers WAV ici',
    error_prefix: 'Erreur',
    kbps: 'kbps',
    select_bitrate: 'Sélectionner le débit MP3',
    share: 'Partager',
    share_copied: 'Lien copié dans le presse-papiers !',
    share_text: 'Convertissez des WAV en MP3 localement dans votre navigateur, sans téléchargement. Prend en charge les tailles de fichiers illimitées et 320 kbps.',
    share_title: 'Convertisseur WAV en MP3 Gratuit',
    share_title_attr: 'Partager cet outil',
    share_tool: "Partager l'outil",
    share_tool_title: 'Partagez cet outil avec des collègues',
    title_highlight: 'Convertisseur',
    title_prefix: 'WAV en MP3',
    waiting_in_queue: 'En attente...'
  },
  de: {
    alert_wav_only: 'Bitte wählen Sie nur WAV-Dateien aus.',
    audio_quality: 'Audioqualität',
    best: '(Beste)',
    completed: 'Abgeschlossen',
    conversion_queue: 'Konvertierungswarteschlange',
    converting: 'Konvertiere...',
    description: 'Client-seitige Codierung in Produktionsqualität. Keine Uploads. Unbegrenzte Dateigrößen.',
    download_all: 'Alle herunterladen (ZIP)',
    download_mp3: 'MP3 herunterladen',
    drop_desc: 'Unterstützt 16/24/32-Bit PCM. Dateien werden sofort im Speicher Ihres Browsers verarbeitet.',
    drop_title: 'Ziehen Sie Ihre WAV-Dateien hierher',
    error_prefix: 'Fehler',
    kbps: 'kbps',
    select_bitrate: 'MP3-Bitrate auswählen',
    share: 'Teilen',
    share_copied: 'Link in die Zwischenablage kopiert!',
    share_text: 'Konvertieren Sie WAV lokal in Ihrem Browser ohne Uploads in MP3. Unterstützt unbegrenzte Dateigrößen und 320 kbps.',
    share_title: 'Kostenloser WAV zu MP3 Konverter',
    share_title_attr: 'Dieses Tool teilen',
    share_tool: 'Tool teilen',
    share_tool_title: 'Teilen Sie dieses Tool mit Kollegen',
    title_highlight: 'Konverter',
    title_prefix: 'WAV zu MP3',
    waiting_in_queue: 'Warten in der Warteschlange...'
  },
  pt: {
    alert_wav_only: 'Por favor, selecione apenas arquivos WAV.',
    audio_quality: 'Qualidade de Áudio',
    best: '(Melhor)',
    completed: 'Concluído',
    conversion_queue: 'Fila de Conversão',
    converting: 'Convertendo...',
    description: 'Codificação do lado do cliente de nível de produção. Zero uploads. Tamanho de arquivo ilimitado.',
    download_all: 'Baixar Tudo (ZIP)',
    download_mp3: 'Baixar MP3',
    drop_desc: 'Suporta PCM de 16/24/32 bits. Os arquivos são processados instantaneamente na memória do seu navegador.',
    drop_title: 'Solte seus arquivos WAV aqui',
    error_prefix: 'Erro',
    kbps: 'kbps',
    select_bitrate: 'Selecionar taxa de bits do MP3',
    share: 'Compartilhar',
    share_copied: 'Link copiado para a área de transferência!',
    share_text: 'Converta WAV para MP3 localmente no seu navegador com zero uploads. Suporta tamanhos de arquivo ilimitados e 320kbps.',
    share_title: 'Conversor Gratuito de WAV para MP3',
    share_title_attr: 'Compartilhar esta ferramenta',
    share_tool: 'Compartilhar Ferramenta',
    share_tool_title: 'Compartilhe esta ferramenta com colegas',
    title_highlight: 'Conversor',
    title_prefix: 'WAV para MP3',
    waiting_in_queue: 'Aguardando na fila...'
  }
};

for (const lang in updates) {
  const filePath = `./messages/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.wav_to_mp3 = { ...data.wav_to_mp3, ...updates[lang] };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
}
