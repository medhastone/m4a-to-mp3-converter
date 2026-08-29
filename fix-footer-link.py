import re
with open("app/components/Footer.tsx", "r") as f:
    content = f.read()

new_link = """              <li>
                <Link
                  href="/audio-metadata-remover"
                  className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  Metadata Remover
                </Link>
              </li>
"""

content = content.replace('{t("batch_converter")}\n                </Link>\n              </li>', '{t("batch_converter")}\n                </Link>\n              </li>\n' + new_link)

with open("app/components/Footer.tsx", "w") as f:
    f.write(content)

