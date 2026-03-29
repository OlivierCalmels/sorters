# Autres modes de tri — référence pour implémentations futures

Ce document liste des algorithmes **non encore branchés** dans l’UI (ou seulement évoqués ailleurs), avec assez de détail pour en faire des modes plus tard : complexité, stabilité, idée d’animation et difficulté estimée.

**Convention** : \(n\) = nombre d’éléments. Les complexités sont asymptotiques.

---

## 1. Tri fusion (*merge sort*)

- **Idée** : diviser le tableau en deux moitiés, trier récursivement, fusionner deux séquences triées en une passe linéaire.
- **Temps** : \(O(n \log n)\) dans tous les cas (implémentation classique).
- **Espace** : \(O(n)\) pour les tampons de fusion (version tableaux simples).
- **Stabilité** : stable si la fusion ne réordonne pas à égalité.
- **Animation** : montrer les fusions (deux plages → une) ; beaucoup d’étapes si on snapshot à chaque écriture — à regrouper ou à sous-échantillonner pour \(n = 100\).
- **Difficulté** : moyenne (récursion + indices de plages).

---

## 2. Tri rapide (*quicksort*)

- **Idée** : choisir un pivot, partitionner en `< pivot` et `≥ pivot`, trier récursivement les segments.
- **Temps** : \(O(n \log n)\) en moyenne, \(O(n^2)\) pire cas (pivot pathologique).
- **Espace** : \(O(\log n)\) pile en moyenne pour la récursion.
- **Stabilité** : en général non stable (partition en place).
- **Animation** : chaque swap de partition ; variante Lomuto ou Hoare selon clarté visuelle.
- **Difficulté** : moyenne.

---

## 3. Tri Shell (*Shell sort*)

- **Idée** : tri par insertion sur des sous-suites espacées d’un *gap* ; on diminue les gaps jusqu’à 1 (insertion classique).
- **Temps** : dépend de la suite de gaps (ex. Sedgewick, Knuth) ; entre \(O(n^{1.3})\) et \(O(n^2)\) selon les cas.
- **Espace** : \(O(1)\).
- **Stabilité** : non stable en général.
- **Animation** : swaps / décalages comme l’insertion mais avec des « sauts » visibles.
- **Difficulté** : faible à moyenne.

---

## 4. Tri cocktail (*cocktail shaker sort*)

- **Idée** : variante du bulle qui alterne une passe gauche→droite et droite→gauche pour mieux remonter les petits éléments coincés en fin de tableau.
- **Temps** : \(O(n^2)\) pire cas ; peut gagner sur le bulle naïf sur certaines entrées.
- **Espace** : \(O(1)\).
- **Stabilité** : stable si swaps stricts comme le bulle.
- **Animation** : identique au bulle (swaps adjacents), sens alterné pédagogique.
- **Difficulté** : très faible.

---

## 5. Tri peigne (*comb sort*)

- **Idée** : comparer-échanger des paires espacées d’un grand *gap* au départ, puis réduire le gap (souvent facteur ~1.3) jusqu’à 1 ; finition type bulle.
- **Temps** : pratique souvent proche de \(O(n^2)\) mais meilleur que bulle sur de nombreux jeux ; pas de garantie \(O(n \log n)\) simple.
- **Espace** : \(O(1)\).
- **Stabilité** : non stable.
- **Animation** : swaps entre indices distants puis localement — visuellement distinct du bulle.
- **Difficulté** : faible.

---

## 6. Tri gnome (*gnome sort*)

- **Idée** : parcourir avec un « nain » : si l’ordre local est bon, avancer ; sinon échanger et reculer d’un pas (comme replanter un pot de fleurs).
- **Temps** : \(O(n^2)\) pire cas.
- **Espace** : \(O(1)\).
- **Stabilité** : stable avec comparaisons strictes.
- **Animation** : beaucoup de petits mouvements, style insertion mais logique différente.
- **Difficulté** : très faible.

---

## 7. Tri par comptage (*counting sort*)

- **Idée** : pour des clés entières dans un intervalle \([0, k]\), compter les occurrences puis reconstruire le tableau trié par préfixes.
- **Temps** : \(O(n + k)\).
- **Espace** : \(O(k)\) pour le tableau de comptes.
- **Stabilité** : stable si on reconstruit en parcourant l’entrée dans l’ordre.
- **Animation** : phases « histogramme » puis placement ; adapté quand les valeurs sont bornées (ici les barres sont \(1..N\) : \(k = N\) est acceptable).
- **Difficulté** : faible à moyenne (affichage des phases).

---

## 8. Tri par base (*radix sort* — LSD)

- **Idée** : trier successivement par chiffre (ou par groupe de bits), du moins significatif au plus significatif, avec un tri auxiliaire **stable** par passe (souvent comptage).
- **Temps** : \(O(d \cdot (n + r))\) avec \(d\) passes et base \(r\).
- **Espace** : dépend du tri par chiffre.
- **Stabilité** : stable si chaque passe l’est.
- **Animation** : une passe par « digit » ; pour \(1..N\) on peut utiliser des chiffres en base 10 ou des bits.
- **Difficulté** : moyenne à élevée (plusieurs passes à expliquer).

---

## 9. Tri par paquets (*bucket sort*)

- **Idée** : répartir les éléments dans des paquets selon la valeur (souvent uniforme sur \([0,1)\)), trier chaque paquet (ex. insertion), puis concaténer.
- **Temps** : \(O(n)\) en moyenne si répartition équilibrée ; \(O(n^2)\) pire cas.
- **Espace** : \(O(n)\) pour les paquets.
- **Stabilité** : stable si les paquets et le tri interne le sont.
- **Animation** : phase « dispersion » puis tri local puis fusion — très parlant visuellement.
- **Difficulté** : moyenne (choix du nombre de paquets pour entiers \(1..N\)).

---

## 10. Tri par cycle (*cycle sort*)

- **Idée** : minimiser le nombre d’écritures en plaçant chaque élément à sa position définitive en suivant des cycles de permutation.
- **Temps** : \(O(n^2)\) comparaisons, mais \(O(n)\) écritures (utile quand une écriture coûte cher — peu courant en UI).
- **Espace** : \(O(1)\).
- **Stabilité** : non stable.
- **Animation** : cycles longs peu clairs pour un grand public ; intéressant pour un mode « expert ».
- **Difficulté** : moyenne.

---

## 11. Tri bitonique (*bitonic sort*)

- **Idée** : construire des séquences bitoniques puis les fusionner ; adapté au **parallélisme** ou à \(n\) puissance de 2.
- **Temps** : \(O(\log^2 n)\) passes de comparateurs en modèle parallèle fixe ; version séquentielle classique \(O(n \log^2 n)\).
- **Espace** : \(O(1)\) ou \(O(n)\) selon implémentation.
- **Stabilité** : non stable.
- **Animation** : réseau de comparaisons régulier — beau motif géométrique, mais contrainte \(n = 2^k\) ou padding.
- **Difficulté** : élevée pour une explication courte.

---

## 12. *Introsort*

- **Idée** : hybride — commencer en quicksort, basculer vers heapsort si la profondeur de récursion dépasse un seuil (évite le pire cas \(O(n^2)\) du quicksort) ; petite plage → insertion.
- **Temps** : \(O(n \log n)\) pire cas garanti (avec bornes correctes).
- **Espace** : \(O(\log n)\) typique.
- **Stabilité** : non stable (comme les briques utilisées).
- **Animation** : montrer d’abord le comportement quick puis bascule — complexe à expliquer en une page.
- **Difficulté** : élevée.

---

## Synthèse rapide (pour prioriser)

| # | Algorithme        | Temps typique   | Animation « barres » | Priorité suggérée |
|---|-------------------|-----------------|----------------------|-------------------|
| 1 | Fusion            | \(n \log n\)    | Fusions de plages    | Haute             |
| 2 | Rapide            | \(n \log n\) moy. | Partition / swaps  | Haute             |
| 3 | Shell             | variable        | Sauts + insertion    | Moyenne           |
| 4 | Cocktail          | \(n^2\)         | Comme bulle alterné  | Faible (proche bulle) |
| 5 | Peigne            | ~\(n^2\)        | Swaps longue portée  | Moyenne           |
| 6 | Gnome             | \(n^2\)         | Recule / avance      | Faible            |
| 7 | Comptage          | \(n + k\)       | Histogramme          | Moyenne           |
| 8 | Radix LSD         | selon \(d,r\)   | Passes par chiffre    | Moyenne           |
| 9 | Paquets           | \(n\) moy.      | Casiers + fusion     | Moyenne           |
| 10 | Cycle             | \(n^2\)         | Cycles               | Basse (expert)    |
| 11 | Bitonique         | \(n \log^2 n\) seq. | Réseau fixe      | Basse (contrainte \(n\)) |
| 12 | Introsort         | \(n \log n\)    | Hybride              | Basse (complexe)  |

---

*Dernière mise à jour : référence projet Sorters — à relier aux futurs `modeId` dans `src/data/sortModes.ts`.*
