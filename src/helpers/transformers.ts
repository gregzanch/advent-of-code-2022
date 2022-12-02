type Entries<T> = T extends ArrayLike<infer U> ? [string, U][] : { [K in keyof T]: [K, T[K]] }[keyof T][];

export function invertObject<T extends Record<string | number, string | number>>(
  obj: T
): Record<string | number, keyof T> {
  const oldKeys = Object.keys(obj) as Array<keyof T>;
  const newObject = {} as Record<string | number, keyof T>;
  const entries = Object.entries(obj) as Entries<T>;
  entries.forEach(([key, value]) => {
    newObject[value] = key;
  });
  return newObject;
}
