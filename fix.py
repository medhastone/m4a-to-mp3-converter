import re

# Update Header (wait, no, Footer!)
with open("app/components/Footer.tsx", "r") as f:
    footer = f.read()

new_link = """              <li>
                <Link
                  href="/mp3-to-m4a"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  MP3 to M4A Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/batch-converter"
"""
footer = footer.replace('              <li>\n                <Link\n                  href="/batch-converter"', new_link)

with open("app/components/Footer.tsx", "w") as f:
    f.write(footer)

# Update page.tsx
with open("app/[locale]/mp3-to-m4a/page.tsx", "r") as f:
    page = f.read()

page = page.replace(
    "Free MP3 to M4A Converter Online – Fast, High Quality & 100% Private",
    "Free MP3 to M4A Converter Online"
)

with open("app/[locale]/mp3-to-m4a/page.tsx", "w") as f:
    f.write(page)
