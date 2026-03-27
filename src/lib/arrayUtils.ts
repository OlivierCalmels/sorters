/** Tableau [1, 2, …, n]. */
export function rangeOneTo(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

/** Mélange Fisher–Yates (copie). */
export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
