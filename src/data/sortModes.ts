import { bitonicSortSteps } from "../algorithms/bitonicSort";
import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { bucketSortSteps } from "../algorithms/bucketSort";
import { cocktailShakerSortSteps } from "../algorithms/cocktailShakerSort";
import { combSortSteps } from "../algorithms/combSort";
import { countingSortSteps } from "../algorithms/countingSort";
import { cycleSortSteps } from "../algorithms/cycleSort";
import { gnomeSortSteps } from "../algorithms/gnomeSort";
import { heapSortSteps } from "../algorithms/heapSort";
import { insertionSortSteps } from "../algorithms/insertionSort";
import { introSortSteps } from "../algorithms/introSort";
import { mergeSortSteps } from "../algorithms/mergeSort";
import { quickSortSteps } from "../algorithms/quickSort";
import { radixSortSteps } from "../algorithms/radixSort";
import { selectionSortSteps } from "../algorithms/selectionSort";
import { shellSortSteps } from "../algorithms/shellSort";
import type { SortSteps } from "../algorithms/types";

export type SortModeId =
  | "bubble"
  | "selection"
  | "insertion"
  | "heap"
  | "merge"
  | "quick"
  | "shell"
  | "cocktail"
  | "comb"
  | "gnome"
  | "counting"
  | "radix"
  | "bucket"
  | "cycle"
  | "bitonic"
  | "intro";

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
  {
    id: "merge",
    title: "Tri fusion",
    shortDescription:
      "Divise le tableau en deux, trie récursivement, puis fusionne deux séquences triées.",
    detail:
      "Chaque fusion recopie les éléments dans l’ordre en une passe linéaire. L’animation enregistre chaque écriture dans le tableau principal : on voit les plages triées se recombiner. Temps O(n log n) dans tous les cas ; espace O(n) pour les tampons de fusion.",
    buildSteps: mergeSortSteps,
  },
  {
    id: "quick",
    title: "Tri rapide",
    shortDescription:
      "Choisit un pivot, partitionne en plus petit / plus grand, trie récursivement.",
    detail:
      "Variante Lomuto : le pivot est en fin de segment ; on permute pour mettre à gauche tout ce qui est strictement plus petit. Chaque swap est une étape. En moyenne O(n log n), pire cas O(n²) si le pivot est toujours mauvais.",
    buildSteps: quickSortSteps,
  },
  {
    id: "shell",
    title: "Tri Shell",
    shortDescription:
      "Tri par insertion avec des écarts (gaps) qui diminuent jusqu’à 1.",
    detail:
      "Suite de gaps de Knuth (1, 4, 13, 40, …). Les éléments comparés sont espacés, ce qui déplace vite les valeurs loin de leur place. Puis gap = 1 : insertion classique. Complexité intermédiaire selon la suite de gaps.",
    buildSteps: shellSortSteps,
  },
  {
    id: "cocktail",
    title: "Tri cocktail",
    shortDescription:
      "Comme le bulle mais une passe vers la droite puis une vers la gauche.",
    detail:
      "Les petites valeurs coincées en fin de tableau remontent plus vite qu’avec un bulle strictement gauche-droite. Toujours O(n²) dans le pire cas ; chaque swap est animé.",
    buildSteps: cocktailShakerSortSteps,
  },
  {
    id: "comb",
    title: "Tri peigne",
    shortDescription:
      "Compare des paires espacées d’un grand gap, puis réduit le gap (~÷1,3).",
    detail:
      "Élimine les « tortues » en échangeant des éléments éloignés avant d’affiner. Gap finit à 1 (phase type bulle). Souvent plus rapide que le bulle naïf en pratique ; pas de garantie n log n.",
    buildSteps: combSortSteps,
  },
  {
    id: "gnome",
    title: "Tri gnome",
    shortDescription:
      "Avance tant que l’ordre local est bon, sinon échange et recule d’un pas.",
    detail:
      "Analogie du jardinier qui replante des pots : beaucoup de petits mouvements. O(n²) pire cas ; logique simple et visuelle.",
    buildSteps: gnomeSortSteps,
  },
  {
    id: "counting",
    title: "Tri par comptage",
    shortDescription:
      "Compte les occurrences puis reconstruit l’ordre (stable) ; ici animé par swaps.",
    detail:
      "Adapté quand les valeurs sont dans un intervalle borné (ici 1…N). Le tri réel est en O(n + k) ; pour garder une permutation à chaque frame, la phase finale est rejouée par échanges vers l’ordre cible calculé par comptage stable.",
    buildSteps: countingSortSteps,
  },
  {
    id: "radix",
    title: "Tri par base (radix LSD)",
    shortDescription:
      "Plusieurs passes stables par chiffre (base 10), du chiffre faible au fort.",
    detail:
      "Chaque passe trie par un digit avec un comptage stable. Un instantané est pris après chaque passe. Complexité liée au nombre de chiffres et à la base.",
    buildSteps: radixSortSteps,
  },
  {
    id: "bucket",
    title: "Tri par paquets",
    shortDescription:
      "Répartit dans des paquets selon la valeur, trie chaque paquet, concatène.",
    detail:
      "Nombre de paquets lié à √n (borné). Insertion dans chaque paquet. La mise en ordre finale du tableau est animée par swaps pour rester une permutation à chaque étape.",
    buildSteps: bucketSortSteps,
  },
  {
    id: "cycle",
    title: "Tri par cycle",
    shortDescription:
      "Place chaque élément en suivant les cycles de la permutation.",
    detail:
      "Peu d’écritures mémoire au total, mais O(n²) comparaisons. Peu adapté aux doublons pathologiques ; avec des valeurs distinctes, chaque échange est une étape.",
    buildSteps: cycleSortSteps,
  },
  {
    id: "bitonic",
    title: "Tri bitonique",
    shortDescription:
      "Construit des séquences bitoniques puis les fusionne (réseau de comparaisons).",
    detail:
      "Implémentation par réseau de Batcher (odd-even mergesort), même famille que les tris bitoniques, valide pour toute taille n. Motifs de comparateurs réguliers ; non stable.",
    buildSteps: bitonicSortSteps,
  },
  {
    id: "intro",
    title: "Introsort",
    shortDescription:
      "Quicksort avec repli en heapsort si la récursion devient trop profonde.",
    detail:
      "Garantit O(n log n) pire cas tout en restant proche du quick en pratique. Petites tranches : insertion. L’animation montre swaps du quick, du tas ou de l’insertion selon la phase.",
    buildSteps: introSortSteps,
  },
];

export function getSortMode(id: string): SortModeInfo | undefined {
  return SORT_MODES.find((m) => m.id === id);
}
