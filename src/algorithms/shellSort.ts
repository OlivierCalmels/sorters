import type { SortSteps } from "./types";

/** Suite de gaps de Knuth : 1, 4, 13, 40, … */
function knuthGaps(n: number): number[] {
  const gaps: number[] = [];
  let h = 1;
  while (h < n) {
    gaps.push(h);
    h = 3 * h + 1;
  }
  return gaps.reverse();
}

/** Tri Shell (insertion par sauts), snapshot après chaque swap. */
export function shellSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  const n = a.length;
  const gaps = knuthGaps(n);

  for (const gap of gaps) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap && a[j - gap] > a[j]) {
        [a[j - gap], a[j]] = [a[j], a[j - gap]];
        steps.push([...a]);
        j -= gap;
      }
    }
  }
  return steps;
}
