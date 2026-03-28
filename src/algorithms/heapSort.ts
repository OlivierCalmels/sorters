import type { SortSteps } from "./types";

/**
 * Tri par tas (max-heap en place) : snapshot après chaque échange
 * (construction du tas + extractions).
 */
export function heapSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  const n = a.length;

  function siftDown(length: number, i: number) {
    for (;;) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < length && a[left] > a[largest]) {
        largest = left;
      }
      if (right < length && a[right] > a[largest]) {
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

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    steps.push([...a]);
    siftDown(end, 0);
  }

  return steps;
}
