import json
import os

locales = {
    'en': {
        "title": "M4A to MP3 Converter Online & Free",
        "description": "Convert your M4A audio files to high-fidelity MP3 locally in your browser. 100% free and private.",
        "h1": "M4A to MP3 Converter",
        "h2_how_it_works": "How It Works",
        "h2_specs": "Technical Specifications",
        "h2_faq": "Frequently Asked Questions"
    },
    'es': {
        "title": "Convertidor M4A a MP3 Online y Gratis",
        "description": "Convierte tus archivos de audio M4A a MP3 de alta fidelidad localmente en tu navegador. 100% gratis y privado.",
        "h1": "Convertidor M4A a MP3",
        "h2_how_it_works": "Cómo funciona",
        "h2_specs": "Especificaciones Técnicas",
        "h2_faq": "Preguntas Frecuentes"
    },
    'fr': {
        "title": "Convertisseur M4A en MP3 en ligne et gratuit",
        "description": "Convertissez vos fichiers audio M4A en MP3 haute fidélité localement dans votre navigateur. 100 % gratuit et privé.",
        "h1": "Convertisseur M4A en MP3",
        "h2_how_it_works": "Comment ça marche",
        "h2_specs": "Spécifications Techniques",
        "h2_faq": "Foire Aux Questions"
    },
    'hi': {
        "title": "एम4ए से एमपी3 कनवर्टर ऑनलाइन और मुफ़्त",
        "description": "अपने M4A ऑडियो फ़ाइलों को सीधे अपने ब्राउज़र में उच्च गुणवत्ता वाले MP3 में बदलें। 100% मुफ़्त और सुरक्षित।",
        "h1": "एम4ए से एमपी3 कनवर्टर",
        "h2_how_it_works": "यह कैसे काम करता है",
        "h2_specs": "तकनीकी निर्देश",
        "h2_faq": "अक्सर पूछे जाने वाले प्रश्न"
    },
    'de': {
        "title": "M4A in MP3 Umwandler Online & Kostenlos",
        "description": "Konvertieren Sie Ihre M4A-Audiodateien lokal in Ihrem Browser in hochauflösende MP3s. 100% kostenlos und privat.",
        "h1": "M4A in MP3 Umwandler",
        "h2_how_it_works": "Wie es funktioniert",
        "h2_specs": "Technische Spezifikationen",
        "h2_faq": "Häufig gestellte Fragen"
    },
    'pt': {
        "title": "Conversor M4A para MP3 Online e Grátis",
        "description": "Converta seus arquivos de áudio M4A para MP3 de alta fidelidade localmente no seu navegador. 100% gratuito e privado.",
        "h1": "Conversor M4A para MP3",
        "h2_how_it_works": "Como funciona",
        "h2_specs": "Especificações Técnicas",
        "h2_faq": "Perguntas Frequentes"
    }
}

os.makedirs('messages', exist_ok=True)
for loc, data in locales.items():
    with open(f'messages/{loc}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Messages generated.")
