const fs = require('fs');

let component = fs.readFileSync('app/components/VideoToMp3Converter.tsx', 'utf8');
component = component.replace(
  /{!isFfmpegLoaded && \(\s*<div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium bg-primary\/5 text-primary px-3 py-1\.5 rounded-full border border-primary\/10">\s*{initError \? \(\s*<>\s*<AlertCircle className="w-3\.5 h-3\.5 text-red-500" \/>\s*<span className="text-red-500">Failed to load converter: {initError}<\/span>\s*<\/>\s*\) : \(\s*<>\s*<Loader2 className="w-3\.5 h-3\.5 animate-spin" \/>\s*<span>{loadingPhase}<\/span>\s*<\/>\s*\)}\s*<\/div>\s*\)}/,
  `{!isFfmpegLoaded && initError && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full border border-red-500/20">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Failed to load converter: {initError}</span>
          </div>
        )}`
);

fs.writeFileSync('app/components/VideoToMp3Converter.tsx', component);
