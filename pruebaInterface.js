const fs = require('fs');

let raw = fs.readFileSync('/home/luis/TFM/v1/Asignatura/output/UpmAsignatura.json');
let parsed = JSON.parse(raw);
//console.log(parsed);
console.log(parsed.bytecode);

