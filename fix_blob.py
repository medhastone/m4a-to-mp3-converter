with open("app/components/Mp3ToM4aConverter.tsx", "r") as f:
    text = f.read()

text = text.replace(
    "const blob = new Blob([data as Uint8Array], { type: 'audio/mp4' });",
    "const blob = new Blob([data as any], { type: 'audio/mp4' });"
)

with open("app/components/Mp3ToM4aConverter.tsx", "w") as f:
    f.write(text)
