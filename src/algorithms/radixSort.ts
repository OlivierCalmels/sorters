import type { SortSteps } from "./types";

/** Radix LSD base 10, stable par comptage ; snapshot après chaque passe. */
export function radixSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  let a = [...initial];
  steps.push([...a]);
  if (a.length === 0) {
    return steps;
  }
  const max = Math.max(...a);
  const base = 10;
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= base) {
    const n = a.length;
    const count = new Array<number>(base).fill(0);
    for (let i = 0; i < n; i++) {
      const d = Math.floor(a[i] / exp) % base;
      count[d]++;
    }
    for (let i = 1; i < base; i++) {
      count[i] += count[i - 1];
    }
    const out = new Array<number>(n);
    for (let i = n - 1; i >= 0; i--) {
      const d = Math.floor(a[i] / exp) % base;
      count[d]--;
      out[count[d]] = a[i];
    }
    a = out;
    steps.push([...a]);
  }
  return steps;
}
