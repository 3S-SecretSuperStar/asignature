const fs = require('fs');

let raw = fs.readFileSync('/home/luis/TFM/v1/Asignatura/output/UpmAsignatura.json');

let parsed = JSON.parse(raw);

fs.writeFileSync('jsonInterface.json', JSON.stringify(parsed.abi));
fs.writeFileSync('bytecode.txt', parsed.bytecode);
fs.writeFileSync('deployedBytecode.txt', parsed.deployedBytecode);

console.log(parsed);