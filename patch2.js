const fs = require('fs');
let content = fs.readFileSync('app/components/VideoToMp3Converter.tsx', 'utf8');

const target = `        {!isFfmpegLoaded && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/10">
            {initError ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-red-500">Failed to load converter: {initError}</span>
              </>
            ) : (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{loadingPhase}</span>
              </>
            )}
          </div>
        )}`;

const replacement = `        {!isFfmpegLoaded && initError && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full border border-red-500/20">
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            <span>Failed to load converter: {initError}</span>
          </div>
        )}`;

content = content.replace(target, replacement);

const target2 = `                      {task.status === 'pending' && !isFfmpegLoaded && <span className="text-primary font-medium animate-pulse">Waiting for engine...</span>}`;
const replacement2 = `                      {task.status === 'pending' && !isFfmpegLoaded && <span className="text-primary font-medium animate-pulse">Preparing engine...</span>}`;

content = content.replace(target2, replacement2);

fs.writeFileSync('app/components/VideoToMp3Converter.tsx', content);
