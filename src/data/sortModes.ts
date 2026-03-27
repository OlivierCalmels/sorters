import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { selectionSortSteps } from "../algorithms/selectionSort";
import type { SortSteps } from "../algorithms/types";

export type SortModeId = "bubble" | "selection";

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
];

export function getSortMode(id: string): SortModeInfo | undefined {
  return SORT_MODES.find((m) => m.id === id);
}
