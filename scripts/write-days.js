const { readdirSync, writeFileSync } = require("fs");
const path = require("path");

module.exports = function writeDays() {
  const cwd = process.cwd();
  const srcDirectory = path.join(cwd, "src");
  const availableDays = readdirSync(srcDirectory).filter((item) => item.match(/^day\d{1,2}$/gim));

  const imports = availableDays.map((day) => `import ${day} from "./${day}";`).join("\n");
  const exports = availableDays.map((day) => `  ${day},`).join("\n");
  const source = `${imports}\nexport default {\n${exports}\n}\n`;

  writeFileSync(path.join(srcDirectory, "days.ts"), source, "utf8");
};
