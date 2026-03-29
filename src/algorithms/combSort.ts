import type { SortSteps } from "./types";

const SHRINK = 1.3;

/** Tri peigne : gap réduit par ~1,3 jusqu’à 1. */
export function combSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  const n = a.length;
  let gap = n;
  let swapped = true;

  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / SHRINK));
    swapped = false;
    for (let i = 0; i + gap < n; i++) {
      if (a[i] > a[i + gap]) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        steps.push([...a]);
        swapped = true;
      }
    }
  }
  return steps;
}
