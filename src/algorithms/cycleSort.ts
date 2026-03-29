import type { SortSteps } from "./types";

/** Tri par cycle : minimise les écritures ; snapshot après chaque échange. */
export function cycleSortSteps(initial: number[]): SortSteps {
  const steps: SortSteps = [];
  const a = [...initial];
  steps.push([...a]);
  const n = a.length;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = a[cycleStart];
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      if (a[i] < item) {
        pos++;
      }
    }
    if (pos === cycleStart) {
      continue;
    }
    while (item === a[pos]) {
      pos++;
    }
    if (pos === cycleStart) {
      continue;
    }
    [a[pos], item] = [item, a[pos]];
    steps.push([...a]);

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (a[i] < item) {
          pos++;
        }
      }
      while (item === a[pos]) {
        pos++;
      }
      [a[pos], item] = [item, a[pos]];
      steps.push([...a]);
    }
  }
  return steps;
}
