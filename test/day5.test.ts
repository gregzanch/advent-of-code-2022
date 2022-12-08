/// <reference types="jasmine" />

import { part1, part2 } from "../src/day5";
import { readPuzzleInput, readExample } from "../src/util";

describe("Day 5", () => {
  xit("Part 1 Example", () => {
    const { input, output } = readExample(5, 1);
    const res = part1(input); //?
    expect(res.toString()).toBe(output);
  });
  xit("Part 1", () => {
    const input = readPuzzleInput(5, 1);
    const res = part1(input); //?
    expect(res).toBeDefined();
  });
  it("Part 2 Example", () => {
    const { input, output } = readExample(5, 2);
    const res = part2(input); //?
    expect(res.toString()).toBe(output);
  });
  it("Part 2", () => {
    const input = readPuzzleInput(5, 2);
    const res = part2(input); //?
    expect(res).toBeDefined();
  });
});
