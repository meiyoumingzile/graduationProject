const fs = require("fs");
let v = process.argv[2];
let file = "src/utils/Constant.ts";
let content = fs.readFileSync(file).toString();
let match = content.match(/VERSION = "(.+)?";/g)[0];
let replaced = `VERSION = "${v}";`;
console.log(match, " >>> ", replaced);
content = content.replace(match, replaced);
fs.writeFileSync(file, content);