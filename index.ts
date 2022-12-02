//@ts-nocheck
const parser = require("yargs-parser");
import { run } from "./src/runner";
import { readdirSync } from "fs";

interface Args extends parser.Arguments {
  day: number | "all";
  part: 1 | 2 | "all";
  test?: boolean;
}

const defaultArgs: Args = {
  $0: undefined,
  _: [],
  day: "all",
  part: "all",
  test: false,
};

const args: Args = {
  ...defaultArgs,
  ...parser(process.argv.slice(2)),
};

const srcDirectory = "src";
const availableDays = readdirSync(srcDirectory)
  .filter((item) => item.match(/^day\d{1,2}$/gim))
  .map((item) => parseInt(item.replace("day", "")));

const daysToRun = args.day === "all" ? availableDays : [args.day];
const partsToRun: Array<1 | 2> = args.part === "all" ? [1, 2] : [args.part];

for (const day of daysToRun) {
  for (const part of partsToRun) {
    console.log(`${args.test ? "Testing" : "Running"} part ${part} of day ${day}`);
    run(day, part, args.test);
  }
}
