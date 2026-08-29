import re
with open("app/[locale]/audio-metadata-remover/page.tsx", "r") as f:
    content = f.read()

content = content.replace("import MetadataRemover from '../../components/MetadataRemover';", "import MetadataRemover from '../../components/MetadataRemover';\nimport AudioMetadataSEO from '../../components/AudioMetadataSEO';")

content = content.replace("          <MetadataRemover />\n        </div>", "          <MetadataRemover />\n        </div>\n\n        {/* SEO Article */}\n        <AudioMetadataSEO />")

with open("app/[locale]/audio-metadata-remover/page.tsx", "w") as f:
    f.write(content)
