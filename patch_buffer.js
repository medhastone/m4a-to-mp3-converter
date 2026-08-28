const fs = require('fs');
const file = '/app/applet/app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = "setRawMp3Buffer(data.buffer);";
const replacement = "const dataArray = data as Uint8Array;\n      setRawMp3Buffer(dataArray.buffer.slice(dataArray.byteOffset, dataArray.byteOffset + dataArray.byteLength));";

if (content.includes(target)) {
  fs.writeFileSync(file, content.replace(target, replacement));
  console.log("Success patching buffer copy");
} else {
  console.log("Target not found");
}
