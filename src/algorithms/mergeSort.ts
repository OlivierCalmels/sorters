import type { SortSteps } from "./types";

/** Tri fusion : snapshot après chaque écriture lors des fusions. */
export function mergeSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  const aux = new Array<number>(a.length);

  function merge(lo: number, mid: number, hi: number) {
    for (let k = lo; k <= hi; k++) {
      aux[k] = a[k];
    }
    let i = lo;
    let j = mid + 1;
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        a[k] = aux[j++];
      } else if (j > hi) {
        a[k] = aux[i++];
      } else if (aux[j] < aux[i]) {
        a[k] = aux[j++];
      } else {
        a[k] = aux[i++];
      }
      steps.push([...a]);
    }
  }

  function sort(lo: number, hi: number) {
    if (hi <= lo) {
      return;
    }
    const mid = lo + Math.floor((hi - lo) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  if (a.length > 0) {
    sort(0, a.length - 1);
  }
  return steps;
}
