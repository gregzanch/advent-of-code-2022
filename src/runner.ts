import { readFileSync, existsSync, lstatSync } from "fs";
import { join } from "path";
import days from "./days";

function directoryExists(directoryPath: string): boolean {
  // ensure path exists
  if (!existsSync(directoryPath)) {
    console.error(new Error(`'${directoryPath}' does not exist.`));
    return false;
  }
  // ensure path is directory
  else if (!lstatSync(directoryPath).isDirectory()) {
    console.error(new Error(`'${directoryPath}' was found, but is not a directory.`));
    return false;
  }
  return true;
}

export function run(day: number, part: 1 | 2, isTestCase: boolean = false) {
  const srcDirectory = "src"; //?
  const dayDirectory = join(srcDirectory, `day${day}`);
  const partDirectory = join(dayDirectory, `part${part}`);
  const inputPath = join(partDirectory, "input.txt");
  const testInputPath = join(partDirectory, "test-input.txt");
  const testOutputPath = join(partDirectory, "test-output.txt");

  if (!(directoryExists(dayDirectory) && Object.hasOwnProperty.call(days, `day${day}`))) {
    throw new Error(`invalid day: ${day}`);
  }
  if (!(directoryExists(partDirectory) && Object.hasOwnProperty.call(days[`day${day}`], `part${part}`))) {
    throw new Error(`invalid part: ${part}`);
  }
  if (isTestCase) {
    if (!existsSync(testInputPath)) {
      throw new Error("Missing test input");
    }
    if (!existsSync(testOutputPath)) {
      throw new Error("Missing test output");
    }
    const testInput = readFileSync(testInputPath, "utf8");
    const testOutput = readFileSync(testOutputPath, "utf8");
    const solutionOutput = days[`day${day}`][`part${part}`](testInput);
    if (solutionOutput != null && solutionOutput.toString() === testOutput.trim()) {
      console.log("✅ Passed");
      return {
        passed: true,
        output: solutionOutput,
        expected: testOutput,
      };
    } else {
      console.log("❌ Failed");
      console.log(`Solution Output: ${solutionOutput}`);
      console.log(`Expected Output: ${testOutput}`);
      return {
        passed: false,
        output: solutionOutput,
        expected: testOutput,
      };
    }
  } else {
    if (!existsSync(inputPath)) {
      throw new Error("Missing problem input");
    }
    const problemInput = readFileSync(inputPath, "utf8");
    const result = days[`day${day}`][`part${part}`](problemInput); //?
    console.log(result);
    return result;
  }
}
