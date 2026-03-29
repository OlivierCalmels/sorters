import { bitonicSortSteps } from "./bitonicSort";
import { bubbleSortSteps } from "./bubbleSort";
import { bucketSortSteps } from "./bucketSort";
import { cocktailShakerSortSteps } from "./cocktailShakerSort";
import { combSortSteps } from "./combSort";
import { countingSortSteps } from "./countingSort";
import { cycleSortSteps } from "./cycleSort";
import { gnomeSortSteps } from "./gnomeSort";
import { heapSortSteps } from "./heapSort";
import { insertionSortSteps } from "./insertionSort";
import { introSortSteps } from "./introSort";
import { mergeSortSteps } from "./mergeSort";
import { quickSortSteps } from "./quickSort";
import { radixSortSteps } from "./radixSort";
import { selectionSortSteps } from "./selectionSort";
import { shellSortSteps } from "./shellSort";

const builders = [
  ["bubble", bubbleSortSteps],
  ["selection", selectionSortSteps],
  ["insertion", insertionSortSteps],
  ["heap", heapSortSteps],
  ["merge", mergeSortSteps],
  ["quick", quickSortSteps],
  ["shell", shellSortSteps],
  ["cocktail", cocktailShakerSortSteps],
  ["comb", combSortSteps],
  ["gnome", gnomeSortSteps],
  ["counting", countingSortSteps],
  ["radix", radixSortSteps],
  ["bucket", bucketSortSteps],
  ["cycle", cycleSortSteps],
  ["bitonic", bitonicSortSteps],
  ["intro", introSortSteps],
] as const;

function sortedCopy(a: number[]): number[] {
  return [...a].sort((x, y) => x - y);
}

function shuffleCopy(a: number[]): number[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

describe("tris — état final", () => {
  const fixedSeeds: number[][] = [
    [],
    [1],
    [1, 2, 3],
    [3, 2, 1],
    [3, 1, 4, 1, 5],
  ];

  for (const [name, build] of builders) {
    test(`${name} trie correctement`, () => {
      for (const input of fixedSeeds) {
        const steps = build([...input]);
        expect(steps.length).toBeGreaterThan(0);
        expect(steps[steps.length - 1]).toEqual(sortedCopy(input));
      }
      for (let t = 0; t < 5; t++) {
        const base = Array.from({ length: 32 }, (_, i) => i + 1);
        const input = shuffleCopy(base);
        const steps = build([...input]);
        expect(steps[steps.length - 1]).toEqual(sortedCopy(input));
      }
    });
  }
});
