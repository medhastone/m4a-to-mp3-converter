with open("app/[locale]/audio-metadata-remover/page.tsx", "r", encoding="utf-8") as f:
    page = f.read()

page = page.replace("const t = await getTranslations({ locale });", "const t = await getTranslations({ locale, namespace: 'audio_metadata_remover' });")
page = page.replace("'Audio Metadata Remover | Strip Tags Losslessly'", "t('meta_title')")
page = page.replace("'Remove ID3 tags, EXIF, and hidden identifiers from MP3, M4A, FLAC, and WAV files 100% locally in your browser.'", "t('meta_desc')")

h1_old = '<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-on-surface to-on-surface-variant">\n            Audio Metadata Remover\n          </h1>'
h1_new = '''<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-on-surface">
            {t.rich('h1', { highlight: (chunks) => <span className="text-orange-500">{chunks}</span> })}
          </h1>'''
page = page.replace(h1_old, h1_new)

p_old = '<p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">\n            Strip hidden tags, ID3 identifiers, and trackers from your audio files instantly. <strong>100% Client-Side</strong> for absolute privacy.\n          </p>'
p_new = '''<p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {t.rich('subtitle', { bold: (chunks) => <strong>{chunks}</strong> })}
          </p>'''
page = page.replace(p_old, p_new)

with open("app/[locale]/audio-metadata-remover/page.tsx", "w", encoding="utf-8") as f:
    f.write(page)
