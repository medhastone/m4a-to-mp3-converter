with open("app/components/Mp3ToM4aSEO.tsx", "r") as f:
    seo = f.read()

seo = seo.replace(
    '        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">\n          Why Convert MP3 to AAC/M4A?\n        </h2>',
    '        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">\n          Why Convert MP3 to AAC/M4A?\n        </h2>'
)

with open("app/components/Mp3ToM4aSEO.tsx", "w") as f:
    f.write(seo)
