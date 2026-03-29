import type { SortSteps } from "./types";

/**
 * Réseau de tri de Batcher (odd–even mergesort), adapté de Knuth / Wikipedia.
 * Même famille que les tris en réseau bitonique ; valide pour toute longueur n.
 */
export function bitonicSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  const n = a.length;

  let p = 1;
  while (p < n) {
    let k = p;
    while (k >= 1) {
      for (let j = k % p; j <= n - 1 - k; j += 2 * k) {
        const iMax = Math.min(k - 1, n - j - k - 1);
        for (let i = 0; i <= iMax; i++) {
          const ix = i + j;
          const iy = i + j + k;
          if (
            ix < n &&
            iy < n &&
            Math.floor(ix / (p * 2)) === Math.floor(iy / (p * 2))
          ) {
            if (a[ix] > a[iy]) {
              [a[ix], a[iy]] = [a[iy], a[ix]];
              steps.push([...a]);
            }
          }
        }
      }
      k = Math.floor(k / 2);
    }
    p *= 2;
  }

  return steps;
}
