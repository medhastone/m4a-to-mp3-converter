import re
with open("app/components/AudioMetadataSEO.tsx", "r") as f:
    content = f.read()

# Replace quotes inside the JSX text
# Specifically: 
# "Strip All Metadata" -> &quot;Strip All Metadata&quot;
# device's -> device&apos;s
# browser's -> browser&apos;s

content = content.replace('"Strip All Metadata"', '&quot;Strip All Metadata&quot;')
content = content.replace("device's", "device&apos;s")
content = content.replace("browser's", "browser&apos;s")

with open("app/components/AudioMetadataSEO.tsx", "w") as f:
    f.write(content)
