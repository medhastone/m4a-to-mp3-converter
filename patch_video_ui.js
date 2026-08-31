const fs = require('fs');

const en = {
  title: "Convert <span className=\"text-orange-500\">MP4 to MP3</span> High Quality",
  subtitle: "Extract high-quality audio from any video. 100% private in-browser WebAssembly processing.",
  audio_quality: "Audio Quality",
  kbps_320: "320 kbps (Studio Best)",
  kbps_256: "256 kbps (High Quality)",
  kbps_192: "192 kbps (Standard)",
  kbps_128: "128 kbps (Compact)",
  vbr_v0: "VBR V0 (Variable)",
  drop_videos: "Drop Videos Here",
  supports: "Supports MP4, MOV, MKV, WEBM, AVI, FLV.",
  select_files: "Select Files",
  failed_to_load: "Failed to load converter",
  processing_files: "Processing {count} file(s)",
  download_zip: "Download ZIP",
  extracting: "Extracting audio... {progress}%",
  waiting: "Waiting for engine...",
  queued: "Queued"
};

const es = {
  title: "Convertir <span className=\"text-orange-500\">MP4 a MP3</span> en Alta Calidad",
  subtitle: "Extrae audio de alta calidad de cualquier video. Procesamiento WebAssembly 100% privado en el navegador.",
  audio_quality: "Calidad de Audio",
  kbps_320: "320 kbps (Mejor Calidad)",
  kbps_256: "256 kbps (Alta Calidad)",
  kbps_192: "192 kbps (Estándar)",
  kbps_128: "128 kbps (Compacto)",
  vbr_v0: "VBR V0 (Variable)",
  drop_videos: "Arrastra los videos aquí",
  supports: "Soporta MP4, MOV, MKV, WEBM, AVI, FLV.",
  select_files: "Seleccionar Archivos",
  failed_to_load: "Error al cargar el convertidor",
  processing_files: "Procesando {count} archivo(s)",
  download_zip: "Descargar ZIP",
  extracting: "Extrayendo audio... {progress}%",
  waiting: "Esperando motor...",
  queued: "En cola"
};

const fr = {
  title: "Convertir <span className=\"text-orange-500\">MP4 en MP3</span> Haute Qualité",
  subtitle: "Extrayez l'audio de n'importe quelle vidéo. Traitement WebAssembly 100% privé dans le navigateur.",
  audio_quality: "Qualité Audio",
  kbps_320: "320 kbps (Meilleure Qualité)",
  kbps_256: "256 kbps (Haute Qualité)",
  kbps_192: "192 kbps (Standard)",
  kbps_128: "128 kbps (Compact)",
  vbr_v0: "VBR V0 (Variable)",
  drop_videos: "Déposez les vidéos ici",
  supports: "Prend en charge MP4, MOV, MKV, WEBM, AVI, FLV.",
  select_files: "Sélectionner des fichiers",
  failed_to_load: "Échec du chargement du convertisseur",
  processing_files: "Traitement de {count} fichier(s)",
  download_zip: "Télécharger le ZIP",
  extracting: "Extraction audio... {progress}%",
  waiting: "En attente du moteur...",
  queued: "En file d'attente"
};

const de = {
  title: "Konvertieren <span className=\"text-orange-500\">MP4 zu MP3</span> in Hoher Qualität",
  subtitle: "Extrahieren Sie hochwertige Audioinhalte aus jedem Video. 100% private WebAssembly-Verarbeitung im Browser.",
  audio_quality: "Audioqualität",
  kbps_320: "320 kbps (Beste Qualität)",
  kbps_256: "256 kbps (Hohe Qualität)",
  kbps_192: "192 kbps (Standard)",
  kbps_128: "128 kbps (Kompakt)",
  vbr_v0: "VBR V0 (Variabel)",
  drop_videos: "Videos hier ablegen",
  supports: "Unterstützt MP4, MOV, MKV, WEBM, AVI, FLV.",
  select_files: "Dateien auswählen",
  failed_to_load: "Konverter konnte nicht geladen werden",
  processing_files: "Verarbeite {count} Datei(en)",
  download_zip: "ZIP herunterladen",
  extracting: "Audio wird extrahiert... {progress}%",
  waiting: "Warten auf Engine...",
  queued: "In Warteschlange"
};

const pt = {
  title: "Converter <span className=\"text-orange-500\">MP4 para MP3</span> em Alta Qualidade",
  subtitle: "Extraia áudio de alta qualidade de qualquer vídeo. Processamento WebAssembly 100% privado no navegador.",
  audio_quality: "Qualidade de Áudio",
  kbps_320: "320 kbps (Melhor Qualidade)",
  kbps_256: "256 kbps (Alta Qualidade)",
  kbps_192: "192 kbps (Padrão)",
  kbps_128: "128 kbps (Compacto)",
  vbr_v0: "VBR V0 (Variável)",
  drop_videos: "Arraste os vídeos aqui",
  supports: "Suporta MP4, MOV, MKV, WEBM, AVI, FLV.",
  select_files: "Selecionar Arquivos",
  failed_to_load: "Falha ao carregar conversor",
  processing_files: "Processando {count} arquivo(s)",
  download_zip: "Baixar ZIP",
  extracting: "Extraindo áudio... {progress}%",
  waiting: "Aguardando motor...",
  queued: "Na fila"
};

const translations = { en, es, fr, de, pt };

for (const [lang, strings] of Object.entries(translations)) {
  const filePath = `messages/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.video_converter = strings;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
