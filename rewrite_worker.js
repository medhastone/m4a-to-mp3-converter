const fs = require('fs');

const path = '/app/applet/app/components/wav-converter/worker.ts';
let code = fs.readFileSync(path, 'utf8');

const newLogic = `
  // 1. Parse WAV Header (Robust Scan)
  // We read the first 1MB to make sure we get the header. Most headers are < 4KB.
  const headerSlice = file.slice(0, 1024 * 1024);
  const headerBuf = await headerSlice.arrayBuffer();
  const dv = new DataView(headerBuf);
  
  let offset = 0;
  
  const readString = (len: number) => {
    let str = '';
    for(let i=0; i<len; i++) {
      str += String.fromCharCode(dv.getUint8(offset++));
    }
    return str;
  };
  
  // Robust scanner to bypass ID3 tags or junk padding
  let waveOffset = -1;
  const maxScan = Math.min(8192, headerBuf.byteLength - 12);
  for (let i = 0; i < maxScan; i++) {
    if (dv.getUint8(i) === 0x52 && dv.getUint8(i+1) === 0x49 && dv.getUint8(i+2) === 0x46 && dv.getUint8(i+3) === 0x46) {
      // Found RIFF
      if (dv.getUint8(i+8) === 0x57 && dv.getUint8(i+9) === 0x41 && dv.getUint8(i+10) === 0x56 && dv.getUint8(i+11) === 0x45) {
        // Found WAVE
        waveOffset = i;
        break;
      }
    }
  }

  if (waveOffset === -1) {
    const first4 = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
    if (first4 === 'RIFF') {
      const formType = String.fromCharCode(dv.getUint8(8), dv.getUint8(9), dv.getUint8(10), dv.getUint8(11));
      throw new Error(\`Not a valid WAVE file (Found RIFF but form type is '\${formType}')\`);
    } else {
      throw new Error(\`Not a valid RIFF/WAVE file (File starts with '\${first4}')\`);
    }
  }

  // Set offset to just after "WAVE" signature
  offset = waveOffset + 12;
`;

// Replace the old parsing logic
const oldLogicStart = code.indexOf('// 1. Parse WAV Header');
const oldLogicEnd = code.indexOf('let fmt = null;');

code = code.substring(0, oldLogicStart) + newLogic + '\n  ' + code.substring(oldLogicEnd);

fs.writeFileSync(path, code);
