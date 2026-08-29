with open("app/[locale]/layout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target = """    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },"""
replacement = """    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }
      ]
    },"""

if target in content:
    with open("app/[locale]/layout.tsx", "w", encoding="utf-8") as f:
        f.write(content.replace(target, replacement))
    print("Updated layout.tsx")
else:
    print("Target not found")
