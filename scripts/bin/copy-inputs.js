const { existsSync, createReadStream, createWriteStream, readdirSync, lstatSync } = require("fs");
const { join } = require("path");
const cwd = process.cwd();
const day = process.argv[2];

if (Number.isNaN(parseInt(day))) {
  console.error(`Expected a day (given as a number, ex: '4' for 'day4'). Received: '${day}'`);
  process.exit(1);
}

const dayDirectory = join(cwd, "src", `day${day}`);
if (!existsSync(dayDirectory) || !lstatSync(dayDirectory).isDirectory()) {
  console.error(`Could not find directory for day ${day}`);
  process.exit(1);
}

const part1Directory = join(dayDirectory, "part1");
if (!existsSync(part1Directory) || !lstatSync(part1Directory).isDirectory()) {
  console.error(`Could not find directory for day ${day} part 1`);
  process.exit(1);
}

const part2Directory = join(dayDirectory, "part2");
if (!existsSync(part2Directory) || !lstatSync(part2Directory).isDirectory()) {
  console.error(`Could not find directory for day ${day} part 2`);
  process.exit(1);
}

const transfers = readdirSync(part1Directory)
  .filter((file) => file.endsWith(".txt"))
  .map((file) => ({
    from: join(part1Directory, file),
    to: join(part2Directory, file),
  }));

for (const transfer of transfers) {
  createReadStream(transfer.from).pipe(createWriteStream(transfer.to));
}
