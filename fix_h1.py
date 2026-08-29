with open("app/[locale]/mp3-to-m4a/page.tsx", "r") as f:
    page = f.read()

page = page.replace(
    ">            Free MP3 to M4A Converter Online          </h1>",
    ">            Free <span className=\"text-orange-500\">MP3 to M4A</span> Converter Online          </h1>"
)

# And remove text-transparent bg-clip-text if it causes issues, let's see. 
# text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-on-surface to-on-surface-variant

with open("app/[locale]/mp3-to-m4a/page.tsx", "w") as f:
    f.write(page)
