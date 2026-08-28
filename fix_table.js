const fs = require('fs');
let content = fs.readFileSync('app/components/MetadataSEO.tsx', 'utf8');

content = content.replace(
  '<td className="p-4 align-middle text-on-surface-variant"><div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500" /></div></td>',
  '<td className="p-4 align-middle text-on-surface-variant"><CheckCircle className="w-5 h-5 text-green-500 inline-block align-middle -mt-0.5" /></td>'
);

content = content.replace(
  /<td className="p-4 align-middle bg-primary\/5"><div className="flex items-center"><CheckCircle className="w-5 h-5 text-primary" \/><\/div><\/td>/g,
  '<td className="p-4 align-middle bg-primary/5"><CheckCircle className="w-5 h-5 text-primary inline-block align-middle -mt-0.5" /></td>'
);

fs.writeFileSync('app/components/MetadataSEO.tsx', content);
