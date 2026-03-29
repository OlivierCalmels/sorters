import type { SortSteps } from "./types";

/** Tri cocktail : passes gauche→droite et droite→gauche. */
export function cocktailShakerSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  let lo = 0;
  let hi = a.length - 1;
  let swapped = true;

  while (swapped && lo < hi) {
    swapped = false;
    for (let j = lo; j < hi; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push([...a]);
        swapped = true;
      }
    }
    hi--;
    if (!swapped) {
      break;
    }
    swapped = false;
    for (let j = hi; j > lo; j--) {
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        steps.push([...a]);
        swapped = true;
      }
    }
    lo++;
  }
  return steps;
}
