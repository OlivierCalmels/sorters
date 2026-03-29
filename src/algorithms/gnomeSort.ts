import type { SortSteps } from "./types";

/** Tri gnome : avance ou recule d’un pas après chaque swap. */
export function gnomeSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  let i = 0;
  while (i < a.length) {
    if (i === 0 || a[i] >= a[i - 1]) {
      i++;
    } else {
      [a[i], a[i - 1]] = [a[i - 1], a[i]];
      steps.push([...a]);
      i--;
    }
  }
  return steps;
}
