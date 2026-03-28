import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { heapSortSteps } from "../algorithms/heapSort";
import { insertionSortSteps } from "../algorithms/insertionSort";
import { selectionSortSteps } from "../algorithms/selectionSort";
import type { SortSteps } from "../algorithms/types";

export type SortModeId = "bubble" | "selection" | "insertion" | "heap";

export interface SortModeInfo {
  id: SortModeId;
  title: string;
  shortDescription: string;
  detail: string;
  buildSteps: (initial: number[]) => SortSteps;
}

export const SORT_MODES: SortModeInfo[] = [
  {
    id: "bubble",
    title: "Tri à bulles",
    shortDescription:
      "Compare les voisins et fait remonter les grandes valeurs comme des bulles.",
    detail:
      "Chaque passe parcourt le tableau de gauche à droite : si deux éléments côte à côte sont dans le mauvais ordre, on les échange. Les étapes animées correspondent exactement à ces swaps. Les barres gardent leur couleur (liée à la valeur) mais changent de place : quand tout est trié, le spectre arc-en-ciel se lit de gauche à droite.",
    buildSteps: bubbleSortSteps,
  },
  {
    id: "selection",
    title: "Tri par sélection",
    shortDescription:
      "À chaque étape, on place le plus petit élément non trié à sa position définitive.",
    detail:
      "Pour chaque index i, on cherche le minimum dans la partie droite du tableau et on l’échange avec la position i. Moins de swaps que le tri à bulles, mais le nombre de comparaisons reste quadratique. L’animation montre chaque échange ; les couleurs permettent de suivre les valeurs qui se déplacent.",
    buildSteps: selectionSortSteps,
  },
  {
    id: "insertion",
    title: "Tri par insertion",
    shortDescription:
      "Insère chaque valeur dans la partie déjà triée en la faisant glisser vers la gauche.",
    detail:
      "On parcourt le tableau à partir du second élément : tant que l’élément courant est plus petit que son voisin de gauche, on échange. Visuellement, une barre « remonte » dans la zone déjà ordonnée. Complexité O(n²) dans le pire cas, mais très efficace si les données sont presque triées.",
    buildSteps: insertionSortSteps,
  },
  {
    id: "heap",
    title: "Tri par tas",
    shortDescription:
      "Construit un tas binaire (max-heap) puis extrait la racine une à une.",
    detail:
      "D’abord le tableau est réorganisé en tas : le plus grand est à la racine. Ensuite on échange la racine avec la fin du segment non trié et on rééquilibre le tas. Chaque échange est une étape d’animation. Complexité O(n log n) en temps, en place ; beaucoup moins d’étapes que les tris quadratiques pour n grand.",
    buildSteps: heapSortSteps,
  },
];

export function getSortMode(id: string): SortModeInfo | undefined {
  return SORT_MODES.find((m) => m.id === id);
}
