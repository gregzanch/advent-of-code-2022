export function convolve(a: number[], b: number[]): number[] {
  const c = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      c[i + j] += a[i] * b[j];
    }
  }
  return c;
}
