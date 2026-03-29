import type { SortSteps } from "./types";

/** Réordonne `a` pour égaler `target` (même multiset) par swaps ; un snapshot par swap. */
export function swapTowardPermutation(
  a: number[],
  target: readonly number[],
  steps: SortSteps
): void {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    while (a[i] !== target[i]) {
      let j = i + 1;
      while (j < n && a[j] !== target[i]) {
        j++;
      }
      if (j === n) {
        return;
      }
      [a[i], a[j]] = [a[j], a[i]];
      steps.push([...a]);
    }
  }
}
