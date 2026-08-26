import re

with open('app/[locale]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<h1[^>]*>.*?</h1>',
                 r'<h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white py-1">{messages.h1}</h1>', content, count=1, flags=re.DOTALL)

content = re.sub(r'<h2[^>]*>How It Works: The Future of Browser-Native Audio Conversion</h2>',
                 r'<h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{messages.h2_how_it_works}</h2>', content)

content = re.sub(r'<h2[^>]*>Deep Technical Specifications & Codec Comparison</h2>',
                 r'<h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight leading-tight">{messages.h2_specs}</h2>', content)

with open('app/[locale]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
