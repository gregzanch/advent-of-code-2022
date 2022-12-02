const { existsSync, readFileSync, writeFileSync } = require("fs");
const path = require("path");

module.exports = function writeTest(day) {
  const cwd = process.cwd();
  const outPath = path.join(cwd, "test", `day${day}.test.ts`);
  if (existsSync(outPath)) {
    console.warn(`${outPath} already exists`);
    return;
  }

  const testTemplatePath = path.join(cwd, "templates", "day.test.template");
  const testTemplate = readFileSync(testTemplatePath, "utf8");
  const testSource = testTemplate.replace(/\$DAY/gm, day);
  writeFileSync(outPath, testSource, "utf8");
};
