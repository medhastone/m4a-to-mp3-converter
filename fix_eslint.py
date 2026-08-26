import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix react/no-unescaped-entities
# Instead of regex, I'll just use next build output. Let me just replace the exact text fragments.
content = content.replace("browser's", "browser&apos;s")
content = content.replace("device's", "device&apos;s")
content = content.replace("it's", "it&apos;s")
content = content.replace('download "converter.exe"', 'download &quot;converter.exe&quot;')
content = content.replace('shady "freeware"', 'shady &quot;freeware&quot;')
content = content.replace("You're", "You&apos;re")
content = content.replace("you're", "you&apos;re")

# 2. Fix no-html-link-for-pages
# Any `<a href="/...` that goes to `.html` is fine, but Next complains about `<a href="/">`
content = content.replace('<a href="/"', '<a href="/" prefetch={false}')
content = content.replace('<a href="https://m4atomp3converter.com/"', '<a href="https://m4atomp3converter.com/" prefetch={false}')
content = content.replace('<a href="/iphone-voice-memos.html"', '<a href="/iphone-voice-memos.html" prefetch={false}')
content = content.replace('<a href="/320kbps.html"', '<a href="/320kbps.html" prefetch={false}')
content = content.replace('<a href="/batch-converter.html"', '<a href="/batch-converter.html" prefetch={false}')
content = content.replace('<a href="/windows.html"', '<a href="/windows.html" prefetch={false}')
content = content.replace('<a href="/mac.html"', '<a href="/mac.html" prefetch={false}')
content = content.replace('<a href="/client-side-safe.html"', '<a href="/client-side-safe.html" prefetch={false}')


with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
