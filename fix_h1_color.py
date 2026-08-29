import re

with open("app/[locale]/mp3-to-m4a/page.tsx", "r") as f:
    page = f.read()

new_h1 = """          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-on-surface">
            Free <span className="text-orange-500">MP3 to M4A</span> Converter Online
          </h1>"""

page = re.sub(r'<h1 className="text-4xl[^>]*>.*?</h1>', new_h1, page, flags=re.DOTALL)

with open("app/[locale]/mp3-to-m4a/page.tsx", "w") as f:
    f.write(page)
