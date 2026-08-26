import re

with open('app/[locale]/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the static metadata block
content = re.sub(r'export const metadata: Metadata = \{.*?\};\n', '', content, flags=re.DOTALL)

# Change RootLayout signature
content = content.replace(
    'export default function RootLayout({children}: {children: React.ReactNode}) {',
    "import { Metadata } from 'next';\n"
    "export async function generateMetadata({ params }: { params: Promise<{ locale: string }> | { locale: string } }): Promise<Metadata> {\n"
    "  const resolvedParams = await params;\n"
    "  const locale = resolvedParams.locale;\n"
    "  let messages;\n"
    "  try {\n"
    "    messages = require(`../../messages/${locale}.json`);\n"
    "  } catch (e) {\n"
    "    messages = require(`../../messages/en.json`);\n"
    "  }\n"
    "  const domain = 'https://m4atomp3converter.com';\n"
    "  return {\n"
    "    metadataBase: new URL(domain),\n"
    "    title: messages.title,\n"
    "    description: messages.description,\n"
    "    openGraph: {\n"
    "      title: messages.title,\n"
    "      description: messages.description,\n"
    "      siteName: 'M4A to MP3 Converter.com',\n"
    "      locale: locale,\n"
    "      type: 'website',\n"
    "    },\n"
    "    twitter: {\n"
    "      card: 'summary_large_image',\n"
    "      title: messages.title,\n"
    "      description: messages.description,\n"
    "    },\n"
    "    icons: {\n"
    "      icon: '/icon.svg',\n"
    "    },\n"
    "    alternates: {\n"
    "      canonical: `${domain}/${locale}`,\n"
    "      languages: {\n"
    "        'en': `${domain}/en`,\n"
    "        'es': `${domain}/es`,\n"
    "        'fr': `${domain}/fr`,\n"
    "        'hi': `${domain}/hi`,\n"
    "        'de': `${domain}/de`,\n"
    "        'pt': `${domain}/pt`,\n"
    "        'x-default': `${domain}/en`,\n"
    "      },\n"
    "    },\n"
    "  };\n"
    "}\n\n"
    "export default async function RootLayout({children, params}: {children: React.ReactNode, params: Promise<{ locale: string }> | { locale: string }}) {\n"
    "  const resolvedParams = await params;\n"
    "  const locale = resolvedParams.locale;\n"
)

content = content.replace('<html lang="en"', '<html lang={locale}')

with open('app/[locale]/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
