import type { SortSteps } from "./types";

/**
 * Tri par insertion (variante par swaps adjacents) : chaque nouvel élément
 * remonte vers la gauche tant qu’il est plus petit que son voisin.
 */
export function insertionSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      steps.push([...a]);
      j--;
    }
  }
  return steps;
}
