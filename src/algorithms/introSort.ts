import type { SortSteps } from "./types";

const INSERTION_THRESHOLD = 16;

/** Introsort : quick + heapsort si profondeur épuisée + insertion sur petites plages. */
export function introSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  const n = a.length;
  if (n === 0) {
    return steps;
  }

  const maxDepth = 2 * Math.floor(Math.log2(n));

  function insertion(lo: number, hi: number) {
    for (let i = lo + 1; i <= hi; i++) {
      let j = i;
      while (j > lo && a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        steps.push([...a]);
        j--;
      }
    }
  }

  function siftDown(lo: number, heapEnd: number, i: number) {
    for (;;) {
      let largest = i;
      const left = 2 * i - lo + 1;
      const right = 2 * i - lo + 2;
      if (left <= heapEnd && a[left] > a[largest]) {
        largest = left;
      }
      if (right <= heapEnd && a[right] > a[largest]) {
        largest = right;
      }
      if (largest === i) {
        break;
      }
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push([...a]);
      i = largest;
    }
  }

  function heapSortRange(lo: number, hi: number) {
    const length = hi - lo + 1;
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
      siftDown(lo, hi, lo + i);
    }
    for (let end = hi; end > lo; end--) {
      [a[lo], a[end]] = [a[end], a[lo]];
      steps.push([...a]);
      siftDown(lo, end - 1, lo);
    }
  }

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

  function sort(lo: number, hi: number, depth: number) {
    const len = hi - lo + 1;
    if (len <= INSERTION_THRESHOLD) {
      insertion(lo, hi);
      return;
    }
    if (depth === 0) {
      heapSortRange(lo, hi);
      return;
    }
    const p = partition(lo, hi);
    if (p - 1 > lo) {
      sort(lo, p - 1, depth - 1);
    }
    if (p + 1 < hi) {
      sort(p + 1, hi, depth - 1);
    }
  }

  sort(0, n - 1, maxDepth);
  return steps;
}
