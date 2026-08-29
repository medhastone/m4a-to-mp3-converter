with open("app/components/Mp3ToM4aSEO.tsx", "r") as f:
    content = f.read()

content = content.replace(r"{t(\'why_title\')}", "{t('why_title')}")
content = content.replace(r"{t(\'why_p1\')}", "{t('why_p1')}")

with open("app/components/Mp3ToM4aSEO.tsx", "w") as f:
    f.write(content)
