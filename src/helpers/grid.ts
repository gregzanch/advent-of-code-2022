import { clamp, mod, rmod, addArray } from "./helpers";

export enum GridBoundaryCondition {
  NONE = "none",
  CLAMP = "clamp",
  REFLECT = "reflect",
  MODULO = "modulo",
}

export class Grid<T> {
  data: T[][];
  boundaryCondition: GridBoundaryCondition;
  editing: boolean;
  changes: Map<[number, number], T>;
  constructor(data?: T[][], boundaryCondition = GridBoundaryCondition.NONE) {
    this.data = data || ([[]] as T[][]);
    this.boundaryCondition = boundaryCondition;
    this.editing = false;
  }
  edit() {
    this.editing = true;
  }
  save() {
    this.editing = false;
    this.changes.forEach((value, [x, y]) => {
      this.set(x, y, value);
    });
    this.changes.clear();
  }

  forEach(kernel: (value: T, index: [number, number], data: T[][]) => void) {
    this.data.forEach((line, y) => {
      line.forEach((value, x) => {
        kernel(value, [x, y], this.data);
      });
    });
  }
  get transposed() {
    return this.data[0].map((_, colIndex) => this.data.map((row) => row[colIndex]));
  }
  has(x: number, y: number) {
    return !(x < 0 || y < 0 || x >= this.lx || y >= this.ly);
  }
  set(x: number, y: number, value: T) {
    switch (this.boundaryCondition) {
      case GridBoundaryCondition.CLAMP: {
        const [_y, _x] = [clamp(0, this.lx - 1)(x), clamp(0, this.ly - 1)(y)];
        if (this.editing) {
          this.changes.set([_x, _y], value);
        } else {
          this.data[_y][_x] = value;
        }
      }
      case GridBoundaryCondition.REFLECT: {
        const [_y, _x] = [rmod(x, this.lx - 1), rmod(y, this.ly - 1)];
        if (this.editing) {
          this.changes.set([_x, _y], value);
        } else {
          this.data[_y][_x] = value;
        }
      }
      case GridBoundaryCondition.MODULO: {
        const [_y, _x] = [mod(x, this.lx - 1), mod(y, this.ly - 1)];
        if (this.editing) {
          this.changes.set([_x, _y], value);
        } else {
          this.data[_y][_x] = value;
        }
      }
      case GridBoundaryCondition.NONE:
      default: {
        if (x < 0 || y < 0 || x >= this.lx || y >= this.ly) {
          throw new Error("out of bounds");
        }
        if (this.editing) {
          this.changes.set([x, y], value);
        } else {
          this.data[y][x] = value;
        }
      }
    }
  }
  get(x: number, y: number) {
    switch (this.boundaryCondition) {
      case GridBoundaryCondition.CLAMP: {
        return this.data[clamp(0, this.ly - 1)(y)][clamp(0, this.lx - 1)(x)];
      }
      case GridBoundaryCondition.REFLECT: {
        return this.data[rmod(y, this.ly - 1)][rmod(x, this.lx - 1)];
      }
      case GridBoundaryCondition.MODULO: {
        return this.data[mod(y, this.ly - 1)][mod(x, this.lx - 1)];
      }
      case GridBoundaryCondition.NONE:
      default: {
        if (x < 0 || y < 0 || x >= this.lx || y >= this.ly) {
          throw new Error("out of bounds");
        }
        return this.data[y][x];
      }
    }
  }

  get lx() {
    if (!this.isEmpty) {
      return this.data[0].length;
    }
    return 0;
  }
  get ly() {
    if (!this.isEmpty) {
      return this.data.length;
    }
    return 0;
  }
  get isEmpty() {
    return this.data.every((y) => y.length === 0);
  }
}

const getAdjacentCoords2 = (diagonal = false): [number, number][] => {
  return diagonal
    ? [
        [-1, -1],
        [-1, 0],
        [-1, +1],
        [0, -1],
        [0, +1],
        [+1, -1],
        [+1, 0],
        [+1, +1],
      ]
    : [
        [-1, 0],
        [0, -1],
        [0, +1],
        [+1, 0],
      ];
};
export function adjacent2<T extends Array<number>>(coord: T, diagonal = false): T[] {
  const offsets = getAdjacentCoords2(diagonal);
  return offsets.map((offset) => addArray(coord, offset));
}

export function gradient(grid: Grid<number>, x: number, y: number) {
  if (grid.boundaryCondition === GridBoundaryCondition.NONE && !grid.has(x, y)) {
    throw new Error("out of bounds");
  }
  const val = grid.get(x, y);

  const dx = val - grid.get(x - 1, y) + (grid.get(x + 1, y) - val);
  const dy = val - grid.get(x, y - 1) + (grid.get(x, y + 1) - val);
  return [-dx / 2, -dy / 2];
}
