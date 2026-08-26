import re

with open('app/[locale]/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

static_params_func = """
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'hi' },
    { locale: 'de' },
    { locale: 'pt' },
  ];
}
"""

if 'generateStaticParams' not in content:
    content = content.replace("export async function generateMetadata", static_params_func + "\nexport async function generateMetadata")
    with open('app/[locale]/layout.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
        print("Updated layout.tsx")
else:
    print("Already has generateStaticParams")
