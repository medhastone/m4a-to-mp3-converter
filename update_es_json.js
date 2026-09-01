const fs = require('fs');

const esJson = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

esJson.acx_article = {
  "h2_barrier": "La Barrera de Envío a ACX: Por Qué Fallan los Audiolibros",
  "p_barrier_1": "Como ingeniero principal de masterización de audio y entrenador de locución, he premasterizado cientos de audiolibros destinados a ACX, Audible y Findaway Voices.",
  "p_barrier_2": "La frustrante realidad para muchos autores independientes y narradores es que hasta el 30% de los audiolibros narrados por ellos mismos son rechazados durante los controles automatizados de control de calidad (QA) de ACX.",
  "p_barrier_3": "Estos rechazos rara vez ocurren debido a un mal desempeño. Ocurren debido a requisitos técnicos rígidos en torno a la medición de la potencia acústica.",
  "p_barrier_4": "Los picos oclusivos repentinos, las puertas de ruido agresivas que producen brechas de silencio muerto poco naturales, el posicionamiento errático del micrófono que afecta los RMS y el recorte inadecuado del tono de sala de cabeza / cola son los principales culpables.",
  "p_barrier_5": "Tradicionalmente, los narradores confiaban en instalaciones de escritorio o configuraciones complejas del complemento Audacity Nyquist para ejecutar una verificación ACX.",
  "p_barrier_6": "Este analizador de cumplimiento ACX en línea en el navegador resuelve ese problema. Sirve como una solución instantánea y sin carga para probar capítulos de audiolibros frente a los requisitos oficiales de Audible ACX de forma gratuita, ahorrando horas de frustración.",
  
  "h2_verify": "Cómo Verificar tu Audiolibro en 3 Pasos",
  "step1_title": "01. Ingerir Audio del Capítulo",
  "step1_desc": "Suelta tu capítulo finalizado. Admitimos los formatos principales, incluidos MP3, WAV, FLAC y M4A.",
  "step2_title": "02. Análisis DSP en Tiempo Real",
  "step2_desc": "El motor de Web Audio analiza Pico, RMS, Suelo de Ruido, Tono de Sala, Desplazamiento DC y Factor de Cresta.",
  "step3_title": "03. Revisión y Exportación",
  "step3_desc": "Verifica el panel interactivo de Aprobado/Reprobado y descarga el PDF del informe de prueba de audio ACX.",
  
  "h2_matrix": "Matriz Oficial de Cumplimiento del Estándar ACX",
  "matrix_desc": "Para pasar los robots de Control de Calidad de Audible, tus archivos MP3 o WAV exportados deben adherirse estrictamente a los siguientes umbrales acústicos:",
  "matrix_th_metric": "Métrica Acústica",
  "matrix_th_acx": "Requisito Oficial de ACX",
  "matrix_th_why": "Por qué es importante",
  "matrix_rms": "RMS (Volumen Promedio)",
  "matrix_rms_val": "Entre -23 dB y -18 dB",
  "matrix_rms_why": "Garantiza un volumen de escucha consistente en todos los capítulos.",
  "matrix_peak": "Pico Verdadero / Pico Máximo",
  "matrix_peak_val": "Menor a -3.0 dBFS",
  "matrix_peak_why": "Evita la distorsión digital y el recorte al codificar a MP3.",
  "matrix_noise": "Suelo de Ruido (Tono de Sala)",
  "matrix_noise_val": "Menor a -60 dB RMS",
  "matrix_noise_why": "Asegura que no haya silbidos de fondo audibles ni zumbidos de CA.",
  "matrix_sample": "Frecuencia de Muestreo y Resolución",
  "matrix_sample_val": "44.1 kHz, 16-bit (Mínimo)",
  "matrix_sample_why": "Estándar de la industria para locución y distribución de audiolibros.",
  
  "h2_guide": "Guía de Remediación Profunda: Solucionando las 4 Fallas Comunes de ACX",
  "h3_peak": "1. Cómo Solucionar Fallas de Picos (> -3.0 dB)",
  "p_peak": "Si tu amplitud máxima excede los -3.0 dBFS, tu audiolibro fallará al instante. La mejor solución es usar un limitador de Pico Verdadero brickwall al final de tu cadena de masterización. Establece el límite en -3.1 dB para proporcionar un pequeño margen de seguridad contra los excesos de codificación MP3 y deja que el limitador atrape los picos oclusivos sueltos y las expresiones vocales fuertes.",
  
  "h3_rms": "2. Cómo Solucionar Fallas de RMS (< -23 dB o > -18 dB)",
  "p_rms": "Si tu audio es demasiado bajo o demasiado alto, necesitas comprender cómo corregir los niveles rms para Audible. RMS es un promedio. Si solo subes el volumen (ganancia), es probable que tus picos excedan los -3.0 dB. La solución es una compresión óptica o VCA suave. Usa una proporción de 2:1 o 3:1, un ataque de alrededor de 30ms y una liberación de 100ms. Comprime la voz suavemente, luego usa la ganancia de compensación para elevar el RMS general al punto óptimo de -20.5 dB.",
  
  "h3_noise": "3. Cómo Solucionar Fallas de Suelo de Ruido (> -60 dB)",
  "p_noise_1": "¿Te preguntas cómo solucionar en línea el suelo de ruido acx demasiado alto? Primero, comprende el algoritmo RMS de ventana deslizante de 500 ms utilizado para calcular el tono de la habitación. ACX requiere que el ruido en reposo sea de -60 dB RMS o menos. La diferencia entre el tono ambiental de la habitación (el sonido natural de tu cabina) y el siseo del preamplificador es fundamental.",
  "p_noise_2": "No uses puertas de ruido agresivas que silencien completamente el audio entre palabras. Esto crea \"silencio digital\" (-∞ dB), que los bots automatizados de ACX marcan como un error. En su lugar, usa una sustracción espectral suave (complementos de eliminación de ruido) para reducir suavemente el ruido de fondo del tono de la habitación a -60db mientras mantienes un sonido natural.",
  
  "h3_room": "4. Cómo Solucionar Errores de Tono de Sala en Inicio y Final",
  "p_room": "Debes dejar de 0,5 a 1 segundo de tono de sala natural al inicio del capítulo y de 1 a 5 segundos al final. Si ejecutas una verificación del tono de la sala de cabeza y cola de acx y falla, generalmente significa que cortaste el audio directamente en la primera sílaba, o resaltaste el inicio y presionaste \"Eliminar\", dejando un silencio digital puro. Pega siempre el tono de sala grabado en estos espacios, nunca el silencio artificial.",
  
  "h2_vs": "Analizador de Audio Web en el Navegador vs. Plugin Audacity Nyquist",
  "p_vs": "Si bien muchos narradores buscan la mejor herramienta gratuita para verificar el audio de los audiolibros antes de subirlo a acx, la ruta tradicional implicaba instalar Audacity y descargar el antiguo complemento ACX-Check.ny. Así es como se compara nuestra moderna herramienta web como una alternativa en línea a audacity acx check.",
  "vs_th_feature": "Característica / Capacidad de Diagnóstico",
  "vs_th_our": "Nuestro Verificador ACX en el Navegador",
  "vs_th_trad": "Plugin Audacity ACX-Check.ny Tradicional",
  "vs_install": "Instalación / Configuración",
  "vs_install_our": "Ninguna (Carga Instantánea)",
  "vs_install_trad": "Requiere software y la instalación manual del plugin",
  "vs_cross": "Compatibilidad Multiplataforma",
  "vs_cross_our": "Mac, Windows, iOS, Android, ChromeOS",
  "vs_cross_trad": "Mac, Windows, Linux solamente",
  "vs_pdf": "Exportación PDF Instantánea",
  "vs_pdf_our": "Sí, genera reportes profesionales",
  "vs_pdf_trad": "No",
  "vs_dc": "Diagnósticos de Desplazamiento DC y Tono de Sala",
  "vs_dc_our": "Sí",
  "vs_dc_trad": "Limitado",
  "vs_priv": "Privacidad y Cero Subidas",
  "vs_priv_our": "100% Procesamiento Local en RAM",
  "vs_priv_trad": "100% Procesamiento Local de Escritorio",
  
  "h2_pdf": "Calidad de Audio y Reportes a Clientes: La Función de Inspección PDF",
  "p_pdf_1": "Si eres un ingeniero de sonido independiente, entrenador de locución o narrador que entrega archivos a un editor, la confianza y las pruebas son esenciales. Cuando ejecutas nuestro verificador de audio qa de audible en línea, puedes descargar instantáneamente el pdf del informe de prueba de audio de acx.",
  "p_pdf_2": "Este certificado descargable sirve como prueba de preparación de audio. Puedes enviar este informe detallado directamente a tus autores independientes y editores junto con los archivos WAV o MP3 terminados. Prueba que los capítulos han sido verificados rigurosamente y están garantizados para pasar los controles automatizados de ACX sin rechazos.",
  
  "h2_faq": "Preguntas Frecuentes",
  "faq_q1": "¿Por qué ACX requiere que los niveles de Pico permanezcan por debajo de -3.0 dBFS en lugar de 0 dB?",
  "faq_a1": "Los archivos de audiolibros se comprimen en formatos como MP3 para su distribución. El proceso de codificación a menudo causa cambios menores en la amplitud conocidos como \"picos entre muestras\". Establecer un pico máximo de -3.0 dBFS garantiza que, incluso después de una compresión MP3 agresiva, el audio nunca alcanzará los 0 dB (recorte digital) ni se distorsionará en los auriculares del oyente.",
  "faq_q2": "¿Cómo puedo verificar mis capítulos de audiolibro para el cumplimiento de ACX sin instalar Audacity?",
  "faq_a2": "Puedes usar esta herramienta gratuita de verificación ACX en línea. Se ejecuta completamente dentro de tu navegador web utilizando la Web Audio API. Simplemente arrastra y suelta tu archivo de audio en la zona de colocación para verificar instantáneamente el RMS, Pico y Suelo de Ruido sin necesidad de aprender cómo pasar la verificación ACX sin Audacity usando software de escritorio complicado.",
  "faq_q3": "¿Cuál es la diferencia entre RMS y LUFS para la producción de audiolibros ACX?",
  "faq_a3": "RMS (Root Mean Square - Raíz Cuadrada Media) mide el promedio matemático bruto de la energía de audio eléctrico a lo largo del tiempo. LUFS (Loudness Units relative to Full Scale - Unidades de Sonoridad relativas a Escala Completa) incorpora un filtro de audición humana (la curva ponderada K) para medir la sonoridad percibida. Mientras que la televisión y el podcasting usan LUFS (-16 a -23 LUFS), Audible ACX requiere estrictamente RMS (-23 a -18 dB RMS). El uso de medidores LUFS para ACX puede resultar en envíos fallidos.",
  "faq_q4": "¿Por qué el silencio digital artificial falla la prueba de ruido de fondo de ACX?",
  "faq_a4": "Los controles automáticos de QA de ACX buscan una experiencia de escucha natural y cohesiva. Si usas una puerta de ruido fuerte o eliminas el audio entre frases, el piso de ruido de fondo cae a infinito negativo (-∞ dB). Este cambio abrupto entre el tono natural de la habitación y el silencio total suena defectuoso y distrae, causando un rechazo instantáneo. Siempre debes usar un tono de sala natural (alrededor de -60 dB) para rellenar huecos.",
  "faq_q5": "¿Se suben mis grabaciones de audio y archivos de narración a un servidor externo?",
  "faq_a5": "No. Cuando pruebas la calidad de audio de un audiolibro gratis usando nuestra herramienta, el 100% del análisis ocurre localmente en la RAM de tu dispositivo. No se suben bytes a la nube, asegurando total privacidad y seguridad legal para archivos de audiolibros inéditos bajo acuerdos de confidencialidad."
};

fs.writeFileSync('messages/es.json', JSON.stringify(esJson, null, 2));
console.log('Added acx_article to es.json');
