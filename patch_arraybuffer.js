const fs = require('fs');
const file = 'app/components/Converter.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = "setRawMp3Buffer(dataArray.buffer.slice(dataArray.byteOffset, dataArray.byteOffset + dataArray.byteLength));";
const replacement = "setRawMp3Buffer(dataArray.buffer.slice(dataArray.byteOffset, dataArray.byteOffset + dataArray.byteLength) as ArrayBuffer);";

if (content.includes(target)) {
  fs.writeFileSync(file, content.replace(target, replacement));
  console.log("Success patching buffer type");
} else {
  console.log("Target not found");
}
