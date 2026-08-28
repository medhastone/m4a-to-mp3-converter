const fs = require('fs');

let code = fs.readFileSync('app/components/MetadataViewer.tsx', 'utf8');

// We need to add the warning state
code = code.replace(
  'const [error, setError] = useState<string | null>(null);',
  'const [error, setError] = useState<string | null>(null);\n  const [warning, setWarning] = useState<string | null>(null);'
);

// We need to update reset function to clear warning
code = code.replace(
  'setError(null);',
  'setError(null);\n    setWarning(null);'
);

// We need to update processFile to clear warning
code = code.replace(
  'setError(null);\n    setTags(null);',
  'setError(null);\n    setWarning(null);\n    setTags(null);'
);

// We need to update the onError callback inside processFile
const oldOnError = `onError: function(error: any) {
        console.error('Error reading tags:', error);
        setError('Failed to extract metadata. The file might not contain ID3 tags or is unsupported.');
        setLoading(false);
      }`;

const newOnError = `onError: function(err: any) {
        console.error('Error reading tags:', err);
        if (err && err.type === 'tagFormat') {
          setWarning('No embedded metadata tags found (or format unsupported). Showing basic file info.');
          setTags({}); // Set empty tags so UI still shows file name and size
        } else {
          setError('Failed to extract metadata: ' + (err.info || 'Unknown error.'));
        }
        setLoading(false);
      }`;

code = code.replace(oldOnError, newOnError);

// We need to add the warning UI inside the main return, just above the tags section.
// Look for `{tags && (`
const tagsUI = '{tags && (';
const warningUI = `
      {warning && (
        <div className="w-full p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 flex items-center gap-3 text-sm">
          <Info className="w-5 h-5 shrink-0" />
          <p>{warning}</p>
        </div>
      )}
      {tags && (
`;

code = code.replace(tagsUI, warningUI);

fs.writeFileSync('app/components/MetadataViewer.tsx', code);
console.log('Fixed MetadataViewer.tsx error handling');
