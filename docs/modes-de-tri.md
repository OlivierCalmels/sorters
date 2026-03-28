# Modes de tri — panorama

Ce document regroupe les principales familles d’algorithmes de tri sur des clés comparables (ici des entiers). Les complexités sont données pour \(n\) éléments, en notation asymptotique.

## Tri à bulles (*bubble sort*)

- **Idée** : parcourir le tableau en comparant les paires d’éléments adjacents ; si l’ordre est incorrect, les échanger. Répéter jusqu’à ce qu’une passe complète ne fasse aucun échange.
- **En pratique** : simple à comprendre et à implémenter ; très lent sur de grandes entrées.
- **Temps** : \(O(n^2)\) dans le pire cas et en moyenne ; \(O(n)\) si le tableau est déjà trié et qu’on arrête dès qu’une passe est sans swap (version optimisée).
- **Espace** : \(O(1)\) auxiliaire.
- **Stabilité** : stable si on ne swap que quand `a[j] > a[j+1]` strictement.

## Tri par sélection (*selection sort*)

- **Idée** : à chaque iteration \(i\), chercher l’indice du plus petit élément dans le suffixe `[i, n-1]`, puis l’échanger avec l’élément en position \(i\).
- **En pratique** : peu d’écritures mémoire ; nombre de swaps au plus \(O(n)\).
- **Temps** : \(O(n^2)\) dans tous les cas (nombre de comparaisons).
- **Espace** : \(O(1)\).
- **Stabilité** : en général **non stable** selon la façon d’échanger (échange distant).

## Tri par insertion (*insertion sort*)

- **Idée** : maintenir un préfixe trié ; insérer chaque nouvel élément à sa place en décalant les plus grands d’un cran.
- **Cas d’usage** : petits tableaux, ou tableaux déjà presque triés ; souvent utilisé en hybride dans des tri bibliothèque.
- **Temps** : \(O(n^2)\) pire cas ; \(O(n)\) si déjà trié ; \(O(nk)\) si chaque élément est à distance \(k\) de sa place.
- **Espace** : \(O(1)\).
- **Stabilité** : stable.

## Tri Shell (*Shell sort*)

- **Idée** : généralisation du tri par insertion avec des pas (*gaps*) qui décroissent jusqu’à 1.
- **Temps** : dépend de la suite de pas ; meilleure que \(O(n^2)\) pour certaines suites connues.
- **Espace** : \(O(1)\).
- **Stabilité** : non stable en général.

## Tri par tas (*heapsort*)

- **Idée** : construire un tas binaire (max-heap) puis extraire la racine \(n\) fois.
- **Temps** : \(O(n \log n)\) dans le pire cas.
- **Espace** : \(O(1)\) si le tas est en place.
- **Stabilité** : non stable.

## Tri fusion (*merge sort*)

- **Idée** : diviser pour régner — diviser le tableau en deux moitiés, trier récursivement, fusionner deux listes triées en \(O(n)\).
- **Temps** : \(O(n \log n)\) pire cas et en moyenne.
- **Espace** : \(O(n)\) pour la fusion classique en tableaux.
- **Stabilité** : stable si la fusion préserve l’ordre relatif en cas d’égalité.

## Tri rapide (*quicksort*)

- **Idée** : choisir un pivot, partitionner en éléments `< pivot`, `= pivot`, `> pivot`, trier récursivement les côtés.
- **Temps** : \(O(n \log n)\) en moyenne ; \(O(n^2)\) pire cas (pivot mal choisi) — atténué par pivot aléatoire ou *median-of-three*.
- **Espace** : \(O(\log n)\) pile en moyenne pour la récursion, \(O(n)\) pire cas.
- **Stabilité** : dépend de la partition ; la variante classique en place n’est en général pas stable.

## Tri par comptage (*counting sort*)

- **Idée** : compter les occurrences de chaque clé dans un intervalle d’entiers borné, puis reconstruire le tableau trié.
- **Condition** : clés dans un petit intervalle \([0, k]\).
- **Temps** : \(O(n + k)\).
- **Espace** : \(O(k)\).
- **Stabilité** : stable si la reconstruction parcourt les entrées dans l’ordre.

## Tri par base (*radix sort*)

- **Idée** : trier successivement par chiffre / octet (souvent avec un tri auxiliaire stable par chiffre).
- **Temps** : \(O(d \cdot (n + r))\) avec \(d\) « passes » et base \(r\).
- **Espace** : dépend de l’implémentation du tri par chiffre.
- **Stabilité** : stable si chaque passe l’est.

## Tri bitonique / réseaux de tri

- **Contexte** : parallélisme, circuits de tri ; utile pour le GPU ou le hardware.
- **Complexité** : varie ; intéressant quand on peut comparer/échanger en parallèle fixe.

## *Timsort* (Python, Java `Arrays.sort` sur objets, etc.)

- **Idée** : hybride fusion + insertion, exploite des « runs » naturellement triés dans les données réelles.
- **Temps** : \(O(n \log n)\) pire cas ; très bon sur données du monde réel.
- **Espace** : \(O(n)\) dans les implémentations courantes.
- **Stabilité** : stable.

---

## Récapitulatif des modes implémentés dans l’application

| Mode dans l’app | Algorithme   | Intérêt pédagogique |
|-----------------|-------------|---------------------|
| Tri à bulles    | Bubble sort | Voir les swaps adjacents et la lenteur sur \(n\) grand. |
| Tri par sélection | Selection sort | Minimum global puis placement ; contraste avec le bulle. |
| Tri par insertion | Insertion sort (swaps adjacents) | Préfixe trié qui grandit ; efficace si données presque ordonnées. |
| Tri par tas | Heapsort | Tas max en place puis extractions ; \(O(n \log n)\), moins d’étapes que les tris naïfs. |

Pour modifier le nombre \(N\) d’éléments visualisés, voir la constante `SORT_ITEM_COUNT` dans `src/config/sortConfig.ts`.
