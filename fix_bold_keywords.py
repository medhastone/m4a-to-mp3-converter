import re

with open("app/components/AudioMetadataSEO.tsx", "r") as f:
    content = f.read()

keywords = [
    "lossless mp3 metadata cleaner online free",
    "remove audio metadata online",
    "strip audio tags online without uploading",
    "clear audio metadata free",
    "how to remove metadata from mp3 without software",
    "remove mp3 tags online",
    "anonymize audio file online",
    "strip id3 tags online",
    "delete album art from mp3 online",
    "clean wav header and author tags online",
    "remove wav metadata online",
    "m4a metadata remover online"
]

for kw in keywords:
    # Use regex to do a case-insensitive replacement
    pattern = re.compile(rf"<strong>\s*({re.escape(kw)})\s*</strong>", re.IGNORECASE)
    content = pattern.sub(r"\1", content)

with open("app/components/AudioMetadataSEO.tsx", "w") as f:
    f.write(content)
