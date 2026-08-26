import re

with open('app/[locale]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add use hook to top
# Actually page is a server component, we can just await params

# Replace Home component signature
content = content.replace(
    'export default function Home() {',
    "export default async function Home({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {\n"
    "  const resolvedParams = await params;\n"
    "  const locale = resolvedParams.locale;\n"
    "  let messages;\n"
    "  try {\n"
    "    messages = require(`../../messages/${locale}.json`);\n"
    "  } catch (e) {\n"
    "    messages = require(`../../messages/en.json`);\n"
    "  }\n\n"
    "  const jsonLd = {\n"
    "    '@context': 'https://schema.org',\n"
    "    '@graph': [\n"
    "      {\n"
    "        '@type': 'FAQPage',\n"
    "        'mainEntity': [\n"
    "          {\n"
    "            '@type': 'Question',\n"
    "            'name': messages.h2_faq,\n"
    "            'acceptedAnswer': {\n"
    "              '@type': 'Answer',\n"
    "              'text': messages.description\n"
    "            }\n"
    "          }\n"
    "        ]\n"
    "      },\n"
    "      {\n"
    "        '@type': 'HowTo',\n"
    "        'name': messages.h2_how_it_works,\n"
    "        'step': [\n"
    "          {\n"
    "            '@type': 'HowToStep',\n"
    "            'text': 'Upload M4A file'\n"
    "          }\n"
    "        ]\n"
    "      }\n"
    "    ]\n"
    "  };\n"
)

# Replace H1, H2s
content = re.sub(r'<h1 className="[^"]*">M4A to MP3 Converter<span[^>]*>\.com</span></h1>',
                 r'<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-4 sm:mb-6">{messages.h1}</h1>', content)

content = re.sub(r'<h2 className="[^"]*">How It Works</h2>',
                 r'<h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{messages.h2_how_it_works}</h2>', content)

content = re.sub(r'<h2 className="[^"]*">Technical Specifications</h2>',
                 r'<h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{messages.h2_specs}</h2>', content)

content = re.sub(r'<h2 className="[^"]*">Frequently Asked Questions</h2>',
                 r'<h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{messages.h2_faq}</h2>', content)


# Inject JSON-LD
content = content.replace(
    'return (\n    <>',
    "return (\n    <>\n      <script type=\"application/ld+json\" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />"
)

with open('app/[locale]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
