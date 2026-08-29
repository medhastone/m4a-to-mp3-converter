with open("app/[locale]/layout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# strip out everything between "twitter: {" and "alternates: {"
start_idx = content.find("twitter: {")
end_idx = content.find("alternates: {")

replacement = """twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }
      ],
      apple: '/apple-touch-icon.png',
    },
    """

content = content[:start_idx] + replacement + content[end_idx:]

with open("app/[locale]/layout.tsx", "w", encoding="utf-8") as f:
    f.write(content)
