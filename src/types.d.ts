declare global {
  interface DayModule {
    part1: (input: string) => any;
    part2: (input: string) => any;
  }
  type Entries<T> = T extends ArrayLike<infer U> ? [string, U][] : { [K in keyof T]: [K, T[K]] }[keyof T][];
}

export {};