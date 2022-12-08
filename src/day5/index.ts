import { splitEvery, derotate } from "../helpers";

type Instruction = {
  move: number;
  from: number;
  to: number;
};

function parseStacks(input: string): Map<number, string[]> {
  return new Map(
    derotate(
      input.split("\n").map((line) => splitEvery([...line], 4).map((chunk) => chunk.join(""))) as string[][]
    ).map((s) => [
      Number(s[0].trim()),
      [...s.slice(1)].filter((s) => s.trim()).map((s) => s.replace(/[\[\]\s]+/gim, "")),
    ])
  );
}

function parseInstructions(input: string): Instruction[] {
  return input.split("\n").map((line) => {
    const [move, from, to] = line
      .split(/(move\s|\sfrom\s|\sto\s)/gim)
      .filter((str) => str.trim() && !isNaN(Number(str)))
      .map(Number);
    return {
      move,
      from,
      to,
    };
  });
}

export function part1(input: string): any {
  const sections = input.split("\n\n");
  const stacks = parseStacks(sections[0]);
  const instructions = parseInstructions(sections[1]);

  for (const { move, from, to } of instructions) {
    for (let i = 0; i < move; i++) {
      const crate = stacks.get(from).pop();
      stacks.get(to).push(crate);
    }
  }

  const tops = [...stacks.values()].map((stack) => stack.pop());

  return tops.join("");
}
export function part2(input: string): any {
  const sections = input.split("\n\n");
  const stacks = parseStacks(sections[0]);
  const instructions = parseInstructions(sections[1]);

  for (const { move, from, to } of instructions) {
    const crates = stacks.get(from).slice(-move);
    stacks.get(to).push(...crates);
    stacks.set(from, stacks.get(from).slice(0, -move));
  }

  const tops = [...stacks.values()].map((stack) => stack.pop());

  return tops.join("");
}
export default {
  part1,
  part2,
};
