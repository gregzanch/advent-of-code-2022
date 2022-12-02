// To do this, count the number of times a depth measurement increases from the previous measurement.

export function part1(input: string): any {
  const sumCalories = (elf) => {
    return elf
      .split("\n")
      .map(Number)
      .reduce((a, b) => a + b);
  };
  const calories = input.split("\n\n").map(sumCalories);
  return Math.max(...calories);
}
export function part2(input: string): any {
  const sumCalories = (elf) => {
    return elf
      .split("\n")
      .map(Number)
      .reduce((a, b) => a + b);
  };
  const calories = input.split("\n\n").map(sumCalories);
  return calories
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
}

export default {
  part1,
  part2,
};
