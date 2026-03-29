import type { SortSteps } from "./types";
import { swapTowardPermutation } from "./swapTowardPermutation";

function stableCountingSorted(a: readonly number[]): number[] {
  const n = a.length;
  if (n === 0) {
    return [];
  }
  const min = Math.min(...a);
  const max = Math.max(...a);
  const range = max - min + 1;
  const count = new Array<number>(range).fill(0);
  for (const x of a) {
    count[x - min]++;
  }
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  const out = new Array<number>(n);
  for (let i = n - 1; i >= 0; i--) {
    const x = a[i];
    const idx = x - min;
    count[idx]--;
    out[count[idx]] = x;
  }
  return out;
}

/**
 * Tri par comptage stable (histogramme + reconstruction), puis animation par swaps
 * pour garder une permutation à chaque étape (clés uniques pour l’UI).
 */
export function countingSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  if (a.length === 0) {
    return steps;
  }
  const target = stableCountingSorted(a);
  swapTowardPermutation(a, target, steps);
  return steps;
}
