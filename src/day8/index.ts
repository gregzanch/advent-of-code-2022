import { Grid, transpose } from "../helpers";

function parseInput(input: string): any {
  return input.split("\n").map((line) => {
    return line.split("").map(Number);
  });
}

export function part1(input: string): any {
  const trees = parseInput(input);
  let visibleTrees = 0;
  for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
    const row = trees[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const tree = row[colIndex];
      if (colIndex === 0 || colIndex === row.length - 1) {
        visibleTrees++;
        continue;
      }
      if (rowIndex === 0 || rowIndex === trees.length - 1) {
        visibleTrees++;
        continue;
      }
      // visible from top
      const transposed = transpose(trees);
      if (transposed[colIndex].slice(0, rowIndex).every((otherTree) => otherTree < tree)) {
        visibleTrees++;
        continue;
      }
      if (transposed[colIndex].slice(rowIndex + 1).every((otherTree) => otherTree < tree)) {
        visibleTrees++;
        continue;
      }
      if (trees[rowIndex].slice(0, colIndex).every((otherTree) => otherTree < tree)) {
        visibleTrees++;
        continue;
      }
      if (trees[rowIndex].slice(colIndex + 1).every((otherTree) => otherTree < tree)) {
        visibleTrees++;
        continue;
      }
    }
  }
  return visibleTrees; //?
}

function visibleTrees(tree: number, direction: number[]) {
  let visibleTrees = 0;
  // let maxHeight = ;
  for (let i = 0; i < direction.length; i++) {
    visibleTrees++;
    if (direction[i] >= tree) break;
  }
  return visibleTrees;
}

export function part2(input: string): any {
  const trees = parseInput(input);
  let maxScore = 0;
  for (let rowIndex = 0; rowIndex < trees.length; rowIndex++) {
    const row = trees[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const tree = row[colIndex];
      if (colIndex === 0 || colIndex === row.length - 1) continue;
      if (rowIndex === 0 || rowIndex === trees.length - 1) continue;
      const views: number[] = [];
      // visible from top
      const transposed: number[][] = transpose(trees);
      views.push(visibleTrees(tree, transposed[colIndex].slice(0, rowIndex).reverse()));
      // visible from bottom
      views.push(visibleTrees(tree, transposed[colIndex].slice(rowIndex + 1)));
      // visible from left
      views.push(visibleTrees(tree, trees[rowIndex].slice(0, colIndex).reverse()));
      // visible from right
      views.push(visibleTrees(tree, trees[rowIndex].slice(colIndex + 1)));

      const scenicScore = views.reduce((acc, cur) => acc * cur, 1);
      if (scenicScore > maxScore) maxScore = scenicScore;
    }
  }
  return maxScore;
}
export default {
  part1,
  part2,
};
