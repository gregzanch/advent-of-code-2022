type TreeNode = {
  size: number | null;
  name: string;
  children: TreeNode[] | null;
  parent: TreeNode | null;
};

enum Instruction {
  CD = "cd",
  LIST = "ls",
}

enum LineType {
  INSTRUCTION = "instruction",
  DIRECTORY = "directory",
  FILE = "file",
}

type Line<T extends LineType> = T extends LineType.INSTRUCTION
  ? { type: LineType.INSTRUCTION; instruction: Instruction; name?: string }
  : T extends LineType.FILE
  ? { type: LineType.FILE; size: number; name: string }
  : T extends LineType.DIRECTORY
  ? { type: LineType.DIRECTORY; name: string }
  : never;

function parseInstruction(str: string): Line<LineType.INSTRUCTION> {
  const args = str.split(" ").slice(1);
  if (args[0] === Instruction.LIST) {
    return {
      type: LineType.INSTRUCTION,
      instruction: Instruction.LIST,
    };
  }
  if (args[0] === Instruction.CD) {
    return {
      type: LineType.INSTRUCTION,
      instruction: Instruction.CD,
      name: args[1],
    };
  }
  throw new Error("Invalid instruction");
}

function parseDir(str: string): Line<LineType.DIRECTORY> {
  return {
    type: LineType.DIRECTORY,
    name: str.split(" ")[1],
  };
}

function parseFile(str: string): Line<LineType.FILE> {
  const [size, name] = str.split(" ");
  return {
    type: LineType.FILE,
    size: parseInt(size),
    name,
  };
}

function parseLines(input: string): Line<LineType>[] {
  return input.split("\n").map((line) => {
    if (line.startsWith("$")) return parseInstruction(line);
    if (line.startsWith("dir")) return parseDir(line);
    if (line.match(/^\d+/gim)) return parseFile(line);
    throw new Error("Unknown line");
  });
}

function calculateSizes(root: TreeNode): number[] {
  const sizes: number[] = [];
  function traverse(node: TreeNode) {
    // if theres no children, its a file
    if (node.children === null) {
      return node.size;
    }

    let size = 0;
    for (const child of node.children) {
      size += traverse(child);
    }
    node.size = size;
    sizes.push(node.size as number);
    return size;
  }
  traverse(root);
  return sizes;
}

export function part1(input: string): any {
  const lines = parseLines(input).slice(1);
  const root: TreeNode = {
    name: "/",
    size: null,
    children: [],
    parent: null,
  };
  let currentNode = root;
  for (const line of lines) {
    // [line, currentNode]; //?
    switch (line.type) {
      case LineType.DIRECTORY:
        currentNode.children.push({
          name: line.name,
          size: null,
          children: [],
          parent: currentNode,
        });
        break;
      case LineType.FILE:
        currentNode.children.push({
          name: line.name,
          size: line.size,
          children: null,
          parent: currentNode,
        });
        break;
      case LineType.INSTRUCTION:
        switch (line.instruction) {
          case Instruction.LIST:
            break;
          case Instruction.CD:
            // move current node to the child with the name
            try {
              if (line.name === "..") {
                currentNode = currentNode.parent as TreeNode;
                break;
              } else {
                currentNode = currentNode.children.find((child) => child.name === line.name) as TreeNode;
              }
            } catch (err) {
              console.log(currentNode);
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  const dirSizes = calculateSizes(root);

  return dirSizes.filter((size) => size <= 100000).reduce((a, b) => a + b);
}
export function part2(input: string): any {
  const lines = parseLines(input).slice(1);
  const root: TreeNode = {
    name: "/",
    size: null,
    children: [],
    parent: null,
  };
  let currentNode = root;
  for (const line of lines) {
    // [line, currentNode]; //?
    switch (line.type) {
      case LineType.DIRECTORY:
        currentNode.children.push({
          name: line.name,
          size: null,
          children: [],
          parent: currentNode,
        });
        break;
      case LineType.FILE:
        currentNode.children.push({
          name: line.name,
          size: line.size,
          children: null,
          parent: currentNode,
        });
        break;
      case LineType.INSTRUCTION:
        switch (line.instruction) {
          case Instruction.LIST:
            break;
          case Instruction.CD:
            // move current node to the child with the name
            try {
              if (line.name === "..") {
                currentNode = currentNode.parent as TreeNode;
                break;
              } else {
                currentNode = currentNode.children.find((child) => child.name === line.name) as TreeNode;
              }
            } catch (err) {
              console.log(currentNode);
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  const dirSizes = calculateSizes(root);

  const total = 70000000;
  const targetFree = 30000000;
  const targetSize = total - targetFree;

  let current = root.size;
  let min = Infinity;
  let minSize = null;
  for (const size of dirSizes) {
    const newUsage = current - size;
    if (newUsage > targetSize) continue;
    const diff = targetSize - newUsage;
    if (diff < min) {
      min = diff;
      minSize = size;
    }
  }
  return minSize;
}
export default {
  part1,
  part2,
};
