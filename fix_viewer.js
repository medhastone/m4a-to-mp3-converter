const fs = require('fs');
let content = fs.readFileSync('app/components/MetadataViewer.tsx', 'utf8');

// Looking for the dropzone container class string
// Let's replace the styling to make hover more visible.
content = content.replace(
  "isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/10 hover:border-white/20 hover:bg-white/5'",
  "isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/10 hover:border-primary/50 hover:bg-primary/5 shadow-sm'"
);

// We should also replace the cursor style to strictly pointer if loaded
content = content.replace(
  "style={{ cursor: isScriptLoaded ? 'pointer' : 'not-allowed' }}",
  "style={{ cursor: isScriptLoaded ? 'pointer' : 'not-allowed' }}\n          title={isScriptLoaded ? 'Click to select audio file' : 'Wait for engine loading'}"
);

fs.writeFileSync('app/components/MetadataViewer.tsx', content);
