import { difference, intersection, splitEvery, union } from "../helpers";

type Rucksack = {
  left: Set<number>;
  right: Set<number>;
};

const isUpperCase = (char: string) => char === char.toUpperCase();

function getPriority(item: string) {
  if (isUpperCase(item)) {
    return item.charCodeAt(0) - 38;
  }
  return item.charCodeAt(0) - 96;
}

function parseRucksack(line: string): Rucksack {
  const items = line.split("").map(getPriority);
  const left = new Set(items.slice(0, items.length / 2));
  const right = new Set(items.slice(items.length / 2));
  return { left, right };
}

export function part1(input: string): any {
  const lines = input.split("\n");
  const rucksacks = lines.map(parseRucksack);
  const commons = rucksacks.map((rucksack) => {
    return [...intersection(rucksack.left, rucksack.right)][0];
  });
  return commons.reduce((acc, curr) => acc + curr, 0);
}

export function part2(input: string): any {
  const lines = input.split("\n");
  const groups = splitEvery(lines, 3);
  const commons = groups.map((group) => {
    const rucksacks = group.map((elf) => {
      const { left, right } = parseRucksack(elf);
      return union(left, right);
    });
    const common = [...intersection(intersection(rucksacks[0], rucksacks[1]), rucksacks[2])][0];
    return common;
  });

  return commons.reduce((acc, curr) => acc + curr, 0);
}
export default {
  part1,
  part2,
};

/*

a-1
b-2
c-3
d-4
e-5
f-6
g-7
h-8
i-9
j-10
k-11
l-12
m-13
n-14
o-15
p-16
q-17
r-18
s-19
t-20
u-21
v-22
w-23
x-24
y-25
z-26
A-27
B-28
C-29
D-30
E-31
F-32
G-33
H-34
I-35
J-36
K-37
L-38
M-39
N-40
O-41
P-42
Q-43
R-44
S-45
T-46
U-47
V-48
W-49
X-50
Y-51
Z-52





*/
