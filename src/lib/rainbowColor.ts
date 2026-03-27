import { SORT_ITEM_COUNT } from "../config/sortConfig";

/**
 * Couleur HSL pour une valeur dans 1..count (arc-en-ciel : bas violet → haut rouge).
 */
export function rainbowColor(value: number, count: number = SORT_ITEM_COUNT): string {
  const denom = Math.max(count - 1, 1);
  const hue = ((value - 1) / denom) * 280;
  return `hsl(${hue} 82% 54%)`;
}
