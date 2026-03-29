import type { SortSteps } from "./types";

/** Partitionnement Lomuto ; snapshot après chaque swap. */
export function quickSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);

  function partition(lo: number, hi: number): number {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (a[j] < pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          steps.push([...a]);
        }
        i++;
      }
    }
    if (i !== hi) {
      [a[i], a[hi]] = [a[hi], a[i]];
      steps.push([...a]);
    }
    return i;
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) {
      return;
    }
    const p = partition(lo, hi);
    sort(lo, p - 1);
    sort(p + 1, hi);
  }

  if (a.length > 0) {
    sort(0, a.length - 1);
  }
  return steps;
}
