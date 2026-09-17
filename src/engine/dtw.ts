import type { Stroke } from '../types/character';

function euclid(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

/**
 * Dynamic Time Warping distance between two point sequences, returned as the
 * average per-step cost (so it stays comparable across sequences of
 * different lengths).
 */
export function dtwDistance(a: Stroke, b: Stroke): number {
  const n = a.length;
  const m = b.length;
  if (n === 0 || m === 0) return Infinity;

  const prevRow = new Float64Array(m + 1).fill(Infinity);
  const currRow = new Float64Array(m + 1).fill(Infinity);
  prevRow[0] = 0;

  for (let i = 1; i <= n; i++) {
    currRow[0] = Infinity;
    for (let j = 1; j <= m; j++) {
      const cost = euclid(a[i - 1].x, a[i - 1].y, b[j - 1].x, b[j - 1].y);
      const best = Math.min(prevRow[j], currRow[j - 1], prevRow[j - 1]);
      currRow[j] = cost + best;
    }
    prevRow.set(currRow);
  }

  const totalCost = prevRow[m];
  return totalCost / (n + m);
}
