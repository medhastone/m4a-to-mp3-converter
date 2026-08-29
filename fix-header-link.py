import re
with open("app/components/Header.tsx", "r") as f:
    content = f.read()

new_link = """                <Link href="/audio-metadata-remover" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🛡️</span> Metadata Remover
                </Link>
"""

content = content.replace("                </Link>\n                <Link href=\"/client-side-safe\"", "                </Link>\n" + new_link + "                <Link href=\"/client-side-safe\"")

with open("app/components/Header.tsx", "w") as f:
    f.write(content)

