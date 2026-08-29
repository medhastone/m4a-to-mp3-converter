import re

with open("app/components/Header.tsx", "r") as f:
    content = f.read()

new_link = """                <Link href="/mp3-to-m4a" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🔄</span> MP3 to M4A
                </Link>
"""

content = content.replace(
    '<Link href="/iphone-voice-memos"',
    new_link + '                <Link href="/iphone-voice-memos"'
)

with open("app/components/Header.tsx", "w") as f:
    f.write(content)
