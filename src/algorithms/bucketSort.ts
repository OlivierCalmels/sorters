import type { SortSteps } from "./types";
import { swapTowardPermutation } from "./swapTowardPermutation";

/** Tri par paquets + insertion dans chaque paquet ; animation finale par swaps. */
export function bucketSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  if (a.length === 0) {
    return steps;
  }

  const min = Math.min(...a);
  const max = Math.max(...a);
  const bucketCount = Math.min(10, Math.max(2, Math.ceil(Math.sqrt(a.length))));
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (const v of a) {
    const raw = ((v - min) / (max - min + 1)) * bucketCount;
    let b = Math.floor(raw);
    if (b >= bucketCount) {
      b = bucketCount - 1;
    }
    buckets[b].push(v);
  }

  for (const bucket of buckets) {
    for (let i = 1; i < bucket.length; i++) {
      let j = i;
      while (j > 0 && bucket[j - 1] > bucket[j]) {
        [bucket[j - 1], bucket[j]] = [bucket[j], bucket[j - 1]];
        j--;
      }
    }
  }

  const sorted = buckets.flat();
  swapTowardPermutation(a, sorted, steps);
  return steps;
}
