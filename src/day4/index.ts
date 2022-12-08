type Range = [number, number];
type Pair = [Range, Range];

function rangeLength([a, b]: Range): number {
  return b - a;
}

function parsePair(line: string): Pair {
  const [left, right] = line.split(",");
  const [a, b] = left.split("-").map(Number);
  const [c, d] = right.split("-").map(Number);
  return [
    [a, b],
    [c, d],
  ];
}

function rangeContainsOther(r1: Range, r2: Range): boolean {
  const l1 = rangeLength(r1);
  const l2 = rangeLength(r2);
  const sortedPair = l1 < l2 ? [r1, r2] : [r2, r1];
  const [a, b] = sortedPair[0];
  const [c, d] = sortedPair[1];
  return a >= c && b <= d;
}

function rangesOverlap(r1: Range, r2: Range): boolean {
  const sortedPair = r1[0] <= r2[0] ? [r1, r2] : [r2, r1];
  const [a, b] = sortedPair[0];
  const [c, d] = sortedPair[1];
  return a <= c && b <= d && b >= c;
}

export function part1(input: string): any {
  const pairs = input.split("\n").map(parsePair);
  const containedPairs = pairs.filter(([left, right]) => rangeContainsOther(left, right));
  return containedPairs.length;
}
export function part2(input: string): any {
  const pairs = input.split("\n").map(parsePair);
  const containedPairs = pairs.filter(([left, right]) => rangeContainsOther(left, right) || rangesOverlap(left, right));
  return containedPairs.length;
}
export default {
  part1,
  part2,
};
