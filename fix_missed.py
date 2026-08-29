import re

with open("app/components/Mp3ToM4aSEO.tsx", "r") as f:
    content = f.read()

# Let's just use regex to replace the content
content = re.sub(
    r'>\s*Why Convert MP3 to AAC/M4A\?\s*<',
    r'>{t(\'why_title\')}<',
    content
)

content = re.sub(
    r'>\s*While MP3 has been the standard for decades, it is functionally a legacy format\. Converting your files to the M4A container \(using the advanced AAC codec\) provides significant technical advantages\. AAC was designed to be the successor to MP3, offering superior acoustic efficiency and broader frequency spectrum retention at lower file sizes\.\s*<',
    r'>{t(\'why_p1\')}<',
    content
)

with open("app/components/Mp3ToM4aSEO.tsx", "w") as f:
    f.write(content)
