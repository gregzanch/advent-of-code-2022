/// <reference types="jasmine" />

import { part1, part2 } from "../src/day7";
import { readPuzzleInput, readExample } from "../src/util";

describe("Day 7", () => {
  xit("Part 1 Example", () => {
    const { input, output } = readExample(7, 1);
    const res = part1(input); //?
    expect(res.toString()).toBe(output);
  });
  xit("Part 1", () => {
    const input = readPuzzleInput(7, 1);
    const res = part1(input); //?
    expect(res).toBeDefined();
  });
  xit("Part 2 Example", () => {
    const { input, output } = readExample(7, 2);
    const res = part2(input); //?
    expect(res.toString()).toBe(output);
  });
  it("Part 2", () => {
    const input = readPuzzleInput(7, 2);
    const res = part2(input); //?
    expect(res).toBeDefined();
  });
});
