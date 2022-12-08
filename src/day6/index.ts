export function part1(input: string): any {
  let start: number;
  for (start = 0; start < input.length - 3; start++) {
    if ([...new Set([...input.slice(start, start + 4)])].length === 4) {
      break;
    }
  }
  return start + 4;
}
export function part2(input: string): any {
  let start: number;
  for (start = 0; start < input.length - 13; start++) {
    if ([...new Set([...input.slice(start, start + 14)])].length === 14) {
      break;
    }
  }
  return start + 14;
}
export default {
  part1,
  part2,
};
