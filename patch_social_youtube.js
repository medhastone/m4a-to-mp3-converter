const fs = require('fs');
const file = 'app/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetString = `            <a
              href="https://www.instagram.com/medha_stone?igsi=MXZzaDFta2VwMTNqdQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>`;

const replacementString = `            <a
              href="https://www.instagram.com/medha_stone?igsi=MXZzaDFta2VwMTNqdQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@medhastone?si=bqXCsWFRsJGFUP18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>`;

if (content.includes(targetString)) {
  content = content.replace(targetString, replacementString);
  fs.writeFileSync(file, content);
  console.log("Success patching YouTube icon");
} else {
  console.log("Could not find Instagram block");
}
