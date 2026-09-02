import fs from 'fs';
import path from 'path';

const p = 'app/[locale]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(
  'w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
  'w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center'
);

fs.writeFileSync(p, c);
