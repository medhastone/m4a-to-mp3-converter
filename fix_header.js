const fs = require('fs');
let code = fs.readFileSync('app/components/Header.tsx', 'utf8');

const badBlock = `              </div>            </div>                          <Link href="/acx-checker" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">                  <span className="text-lg">🎙️</span> ACX Audio Checker                </Link>              </div>            </div>          </nav>`;

const goodBlock = `                <Link href="/acx-checker" className="px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-dim transition-colors flex items-center gap-2">
                  <span className="text-lg">🎙️</span> ACX Audio Checker
                </Link>
              </div>
            </div>
          </nav>`;

if (code.includes(badBlock)) {
    code = code.replace(badBlock, goodBlock);
    fs.writeFileSync('app/components/Header.tsx', code);
    console.log('Fixed Header.tsx');
} else {
    console.log('Could not find bad block');
}
