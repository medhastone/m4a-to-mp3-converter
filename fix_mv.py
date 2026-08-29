import json
import re

files = {
    "messages/en.json": ("Free Audio Metadata Viewer & Stream Inspector", "Free Audio <highlight>Metadata Viewer</highlight> & Stream Inspector"),
    "messages/de.json": ("Kostenloser Audio-Metadaten-Viewer & Stream Inspektor", "Kostenloser Audio-<highlight>Metadaten-Viewer</highlight> & Stream Inspektor"),
    "messages/es.json": ("Visor de metadatos de audio e inspector de secuencias gratuito", "<highlight>Visor de metadatos</highlight> de audio e inspector de secuencias gratuito"),
    "messages/fr.json": ("Visionneuse de Métadonnées Audio et Inspecteur de Flux Gratuit", "<highlight>Visionneuse de Métadonnées</highlight> Audio et Inspecteur de Flux Gratuit"),
    "messages/pt.json": ("Visualizador Gratuito de Metadados de Áudio e Inspetor de Stream", "<highlight>Visualizador Gratuito de Metadados</highlight> de Áudio e Inspetor de Stream")
}

for filepath, (old_text, new_text) in files.items():
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    if data.get("mv_h1") == old_text:
        data["mv_h1"] = new_text
        
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Update page.tsx
with open("app/[locale]/metadata-viewer/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

new_h1 = """          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-on-surface">
            {t.rich('mv_h1', { highlight: (chunks) => <span className="text-orange-500">{chunks}</span> })}
          </h1>"""

page = re.sub(r'<h1 className="text-4xl[^>]*>.*?</h1>', new_h1, page, flags=re.DOTALL)

with open("app/[locale]/metadata-viewer/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)

print("Done")
