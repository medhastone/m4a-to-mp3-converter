import re

with open("app/[locale]/mp3-to-m4a/page.tsx", "r") as f:
    page = f.read()

# Update title and description in generateMetadata
page = page.replace(
    "title: 'Free MP3 to M4A Converter Online',",
    "title: t('mp3_to_m4a.meta_title'),"
)
page = page.replace(
    "description: 'Convert MP3 to M4A online for free at up to 256kbps and 320kbps. Fast, client-side batch audio conversion in your browser with zero server uploads.',",
    "description: t('mp3_to_m4a.meta_description'),"
)

# Update H1 and Subtitle
# We use t.rich for H1
h1_text = """          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-on-surface">
            {t.rich('mp3_to_m4a.h1', {
              highlight: (chunks) => <span className="text-orange-500">{chunks}</span>
            })}
          </h1>"""

page = re.sub(r'<h1 className="text-4xl[^>]*>.*?</h1>', h1_text, page, flags=re.DOTALL)

p_text = """          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {t('mp3_to_m4a.subtitle')}
          </p>"""

page = re.sub(r'<p className="text-lg md:text-xl[^>]*>.*?</p>', p_text, page, flags=re.DOTALL)

with open("app/[locale]/mp3-to-m4a/page.tsx", "w") as f:
    f.write(page)
