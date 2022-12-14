export type FromEntries<T> = T extends [PropertyKey, infer V] ? { [X in T[0]]?: V } : never;
export type Entries<T> = T extends { [K in keyof T]: infer V } ? [keyof T, V] : never;

export function intersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  // intersect can be simulated via
  return new Set([...set1].filter((x) => set2.has(x)));
}

export function difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  // difference can be simulated via
  return new Set([...set1].filter((x) => !set2.has(x)));
}

export function union<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  // union can be simulated via
  return new Set([...set1, ...set2]);
}



export const getIndex = (i: string | number) => (x: any) => x[i];
export const ascending = <T extends number | string>(a: T, b: T) => (a < b ? -1 : +1);
export const descending = <T extends number | string>(a: T, b: T) => (a < b ? +1 : -1);
export const via =
  (i: string | number) =>
  (fn: Function) =>
  (...args: any[][]) =>
    fn(...args.map(getIndex(i)));
export const applyAt =
  (i: number) =>
  (fn: Function) =>
  <T>(x: T[]) =>
    fn(x[i]);
export const match = (expr: string | RegExp) => (str: string) => str.match(expr);

export const swap =
  (a: number, b: number) =>
  <T>(arr: T[]) =>
    [...arr.slice(0, a), arr[b], ...arr.slice(a + 1, b), arr[a], ...arr.slice(b + 1)];

export const add = (a: number, b: number) => a + b;
export const subtract = (a: number, b: number) => a - b;
export const multiply = (a: number, b: number) => a * b;
export const divide = (a: number, b: number) => a / b;
export const max = (a: number, b: number) => (a > b ? a : b);
export const min = (a: number, b: number) => (a < b ? a : b);

export const truthy = (x: any) => !!x;
export const falsey = (x: any) => !x;

export const maps = {
  length: (x: any[]) => x.length,
  split: (x: string) => x.split(""),
  splitBy: (expr: string | RegExp) => (x: string) => x.split(expr),
  join: (x: any[]) => x.join(""),
  joinWith: (str: string) => (x: string[] | number[]) => x.join(str),
};

export const toIndexed = <T>(x: T, i: number, a: T[]): [number, T] => [i, x];

export const regularExpressions = {
  hexColor: /\#[a-z0-9]{6}/gim,
  comma: /,/g,
  digit: /\d/g,
  digits: /\d+/g,
};

export function splitEvery(arr: Array<any>, n: number) {
  return arr.reduce(
    (a, b) => {
      if (a[a.length - 1].length < n) {
        a[a.length - 1].push(b);
      } else {
        a.push([b]);
      }
      return a;
    },
    [[]]
  );
}

export const multiMap = (fn) => (a, b) => a.map((x, i) => fn(x, b[i]));

export const addArray = multiMap(add);
export const subtractArray = multiMap(subtract);
export const multiplyArray = multiMap(multiply);

export const toNumbers = <T extends string | number | boolean>(x: T[]) => x.map(Number);
export const between = (v: number, a: number, b: number) => v >= a && v <= b;
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set<T>(array));
};
export const diff = (A: any[], B: any[]) => {
  return [A, B].map((x, i, a) => x.filter((y) => !a[(i + 1) % 2].includes(y)));
};

export const transpose = <T>(array: T[][]) => array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
export const flipHor = <T>(array: T[][]) => array.map((x) => x.reverse());
export const flipVer = <T>(array: T[][]) => array.map((x) => [...x]).reverse();
export const rotate = <T>(array: T[][]) => flipVer(transpose(array));
export const derotate = <T>(array: T[][]) => transpose(flipVer(array));

export const clamp =
  (a: number, b: number) =>
  (v: number): number => {
    return v < a ? a : v > b ? b : v;
  };

export const mod = (n: number, m: number): number => ((n % m) + m) % m;

/**
 * reflected modulus operation. instead of wrapping it reflects like so:
 * ```text
 *   /\    /\
 *  /  \  /  \
 * /    \/    \
 * ```
 *
 * @param n dividend
 * @param m divisor
 */
export const rmod = (n: number, m: number) => {
  return m - 2 * Math.abs(mod(0.5 * n, m) - 1);
};

export const int = Math.trunc;

export const isInteger = Number.isInteger;

//@ts-ignore
export const at = (obj: any, path: string) => {
  let keys = path.split(".");
  if (keys.length > 1) {
    return at(obj[keys[0]], keys.slice(1).join("."));
  }
  return obj[keys[0]];
};

export function derivative(arr: number[]) {
  const temp = [] as number[];
  for (let i = 1; i < arr.length; i++) {
    temp.push(arr[i] - arr[i - 1]);
  }
  return temp;
}

export const countIf = (condition: { (x: any): boolean; (arg0: any): any }) => (arr: string | any[]) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (condition(arr[i])) {
      count += 1;
    }
  }
  return count;
};

export const makeObject = (fields: [string, any][]) => fields.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {});

export interface GraphNode<T> {
  value: T;
  children: Set<GraphNode<T>>;
  parents: Set<GraphNode<T>>;
}

export class GraphNode<T> implements GraphNode<T> {
  constructor(value: T) {
    this.value = value;
    this.children = new Set<GraphNode<T>>();
    this.parents = new Set<GraphNode<T>>();
  }
  addChild(child: T | GraphNode<T>): Set<GraphNode<T>> {
    if (child instanceof GraphNode) {
      if (!this.children.has(child)) {
        this.children.add(child);
        child.parents.add(this);
      }
    } else {
      const childNode = new GraphNode<T>(child);
      if (!this.children.has(childNode)) {
        this.children.add(childNode);
        childNode.parents.add(this);
      }
    }
    return this.children;
  }
}

export interface Range {
  [0]: number;
  [1]: number;
}

export class Range implements Range {
  constructor(min: number, max: number) {
    this[0] = Math.min(min, max);
    this[1] = Math.max(min, max);
  }
  get min() {
    return this[0];
  }
  set min(m: number) {
    if (m > this[1]) {
      console.warn(`new value (${m}) for min (${this[0]}) is greater than max ${this[1]}, switching automatically`);
      this[0] = this[1];
      this[1] = m;
    } else {
      this[0] = m;
    }
  }

  get max() {
    return this[1];
  }
  set max(m: number) {
    if (m < this[0]) {
      console.warn(`new value (${m}) for max (${this[1]}) is less than min ${this[0]}, switching automatically`);
      this[1] = this[0];
      this[0] = m;
    } else {
      this[1] = m;
    }
  }

  get delta() {
    return this[1] - this[0];
  }

  contains(val: number) {
    return val > this.min && val < this.max;
  }
}

export class ClosedRange extends Range {
  contains(val: number) {
    return val >= this.min && val <= this.max;
  }
}

interface ReversedArray<T> {
  [index: number]: T;
}

export function* getAdjacentIterator(n: number, range: [number, number]) {
  const m = range[1] - range[0] + 1;
  for (let i = 0; i < m ** n; i++) {
    yield i
      .toString(m)
      .padStart(n, "0")
      .split("")
      .map((x) => Number(x) + range[0]);
  }
  return;
}

const isObject = (x) => typeof x === "object";
const nonNull = (x) => x != null;
const isNonNullObject = (x) => isObject(x) && nonNull(x);
export function deepEqual(x: any, y: any) {
  if (Object.is(x, y) || x === y) return true;
  else if (isNonNullObject(x) && isNonNullObject(y)) {
    if (Object.keys(x).length != Object.keys(y).length) return false;
    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
}
export const charFrequency = (input: string): { [k: string]: number } => {
  return input.split("").reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {} as ReturnType<typeof charFrequency>);
};

export const memoize = <P extends any[], R, K extends P[number]>(
  fn: (...args: P) => R,
  key: (...args: P) => K
): ((...args: P) => R) => {
  const memo = {} as Record<K, R>;
  return (...args: P) => {
    const k = key(...args);
    if (isDefined(memo[k])) {
      return memo[k];
    }

    memo[k] = fn(...args);
    return memo[k];
  };
};

export const splitArr = <T>(array: T[], on: T): [T[], T[]] => {
  return splitAt(array, array.indexOf(on) - 1);
};

type Sliceable = {
  slice: (start?: number, end?: number) => any;
  length: number;
};
export const splitAt = <T extends Sliceable>(xs: T, i: number): [ReturnType<T["slice"]>, ReturnType<T["slice"]>] => [
  xs.slice(0, i),
  xs.slice(i, xs.length),
];

export const isDefined = <T>(x: T | undefined): x is T => x !== undefined;

export function* map<T, U>(data: Iterable<T>, fn: (curr: T) => U): Iterable<U> {
  for (const x of data) {
    yield fn(x);
  }
}

export async function* mapAsync<T, U>(data: AsyncIterable<T>, fn: (curr: T) => Promise<U>): AsyncIterableIterator<U> {
  for await (const x of data) {
    yield await fn(x);
  }
}

export const reduce = <T, U>(data: Iterable<T>, seed: U, fn: (acc: U, curr: T) => U): U => {
  let acc = seed;
  for (const x of data) {
    acc = fn(acc, x);
  }

  return acc;
};

export const reduceAsync = async <T, U>(
  data: AsyncIterable<T>,
  seed: U,
  fn: (acc: U, curr: T) => Promise<U>
): Promise<U> => {
  let acc = seed;
  for await (const x of data) {
    acc = await fn(acc, x);
  }

  return acc;
};

export const countBy = <T>(data: Iterable<T>, fn: (x: T) => boolean): number =>
  reduce(data, 0, (acc, curr) => acc + (fn(curr) ? 1 : 0));

export const fromEntries = <T extends [PropertyKey, any]>(entries: Iterable<T>): FromEntries<T> =>
  Object.fromEntries(entries) as FromEntries<T>;

/**
 * returns an iterable iterator with form [seen items, current item, unseen items]
 * @param data iterable
 */
export function* zipper<T>(data: Iterable<T>): IterableIterator<[T[], T, T[]]> {
  let init: T[] = [];
  let [head, ...tail] = data;
  while (tail.length >= 0) {
    yield [init, head, tail];
    if (tail.length === 0) {
      break;
    }

    init = [...init, head];
    [head, ...tail] = tail;
  }
}

export const arrayFromAsyncGenerator = <T>(gen: AsyncIterableIterator<T>): Promise<T[]> =>
  reduceAsync(gen, [] as T[], async (acc, curr) => [...acc, curr]);

export function isValidRecordKey(key: any): key is string | number | symbol {
  return ["number", "string", "symbol"].includes(typeof key);
}

/**
 * `countUnique` counts all of the unique instances of a value in an array
 * @param {any[]} array array of any type
 * @param {(item: any, index: number, array: any[]) => number|string|symbol} accessor function to access the desired value to count
 * @returns {Object}
 */
export function countUnique<T>(
  array: T[],
  accessor?: (item: T, index: number, array: T[]) => number | string | symbol
): object {
  const bag = {} as Record<string | number | symbol, number>;
  (array || []).forEach((item, index) => {
    const key = accessor ? accessor(item, index, array) : item;
    if (isValidRecordKey(key)) {
      if (!bag[key]) {
        bag[key] = 0;
      }
      bag[key]++;
    }
  });
  return bag;
}

export const isNotEmpty = <T>(x: T[]) => x.length > 0;

export const frequency = <T extends PropertyKey>(input: Iterable<T>): Record<T, number> =>
  reduce(input, {} as ReturnType<typeof frequency>, (acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  });

export const repeatFn = <T>(x: T, times: number, fn: (x: T) => T): T => {
  for (let i = 0; i < times; ++i) {
    x = fn(x);
  }

  return x;
};

export const sum = (data: Iterable<number>): number => reduce(data, 0, (acc, curr) => acc + curr);

export function factorial(n: number): number {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

// generate an array of linearly spaced numbers
export function linspace(start: number, end: number, n?: number): number[] {
  n = n || end - start + 1;
  const step = (end - start) / (n - 1);
  return Array.from({ length: n }, (_, i) => start + i * step);
}

export const ensureArray = <T>(value: T | T[]) => (value instanceof Array ? value : [value]);
