import { readFileSync } from "fs";
import { join } from "path";

export function readPuzzleInput(day: number, part: 1 | 2) {
  const partDir = join("src", `day${day}`, `part${part}`);
  return readFileSync(join(partDir, "input.txt"), "utf8");
}

export function readExample(day: number, part: 1 | 2) {
  const partDir = join("src", `day${day}`, `part${part}`);
  return {
    input: readFileSync(join(partDir, "test-input.txt"), "utf8"),
    output: readFileSync(join(partDir, "test-output.txt"), "utf8"),
  };
}
