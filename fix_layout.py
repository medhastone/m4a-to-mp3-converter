import re

with open('app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """export const metadata: Metadata = {
  metadataBase: new URL('https://m4atomp3converter.com'),
  title: 'M4A to MP3 Converter.com - 100% Free, Fast & Client-Side Local Audio Transcoder',
  description: 'Locally transcode M4A to high-fidelity MP3. Zero server uploads.',
  openGraph: {
    siteName: 'M4A to MP3 Converter.com',
  },
  icons: {
    icon: '/icon.svg',
  },
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
      'en': '/',
      'ja': '/ja/',
      'es': '/es/',
      'de': '/de/',
      'pt': '/pt/',
      'fr': '/fr/',
    },
  },
};"""

content = re.sub(r'export const metadata: Metadata = \{.*?\};', replacement, content, flags=re.DOTALL)

with open('app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
