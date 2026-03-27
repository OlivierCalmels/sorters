/** Affiche les millisecondes comme `12,345 s` ou `123 ms`. */
export function formatElapsed(ms: number): string {
  if (ms >= 1000) {
    return `${(ms / 1000).toLocaleString("fr-FR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} s`;
  }
  return `${Math.round(ms)} ms`;
}
