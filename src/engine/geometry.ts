import type { Point, Stroke } from '../types/character';

export const GRID_SIZE = 100;

export function boundingBox(strokes: Stroke[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const stroke of strokes) {
    for (const p of stroke) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }
  if (!Number.isFinite(minX)) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }
  return { minX, minY, maxX, maxY };
}

/**
 * Normalizes strokes into a shared GRID_SIZE x GRID_SIZE box, preserving
 * aspect ratio and orientation (no rotation correction: orientation matters
 * for these scripts). Empty/degenerate input maps to a centered point.
 */
export function normalizeStrokes(strokes: Stroke[]): Stroke[] {
  if (strokes.length === 0) return [];
  const { minX, minY, maxX, maxY } = boundingBox(strokes);
  const width = maxX - minX;
  const height = maxY - minY;
  const size = Math.max(width, height, 1e-6);
  const scale = (GRID_SIZE * 0.9) / size;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const offset = GRID_SIZE / 2;
  return strokes.map((stroke) =>
    stroke.map((p) => ({
      x: (p.x - cx) * scale + offset,
      y: (p.y - cy) * scale + offset,
    })),
  );
}

/**
 * Data-authoring helper (not used at recognition time): rescales `strokes`
 * to fit within an arbitrary target rectangle, preserving aspect ratio and
 * centering. Used to derive a small "attached below a letter" version of a
 * niqqud mark from its larger standalone-practice shape.
 */
export function fitStrokesToBox(
  strokes: Stroke[],
  box: { minX: number; maxX: number; minY: number; maxY: number },
): Stroke[] {
  const { minX, minY, maxX, maxY } = boundingBox(strokes);
  const width = maxX - minX;
  const height = maxY - minY;
  const boxWidth = box.maxX - box.minX;
  const boxHeight = box.maxY - box.minY;
  const scale = Math.min(boxWidth / Math.max(width, 1e-6), boxHeight / Math.max(height, 1e-6));
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const targetCx = (box.minX + box.maxX) / 2;
  const targetCy = (box.minY + box.maxY) / 2;
  return strokes.map((stroke) =>
    stroke.map((p) => ({
      x: (p.x - cx) * scale + targetCx,
      y: (p.y - cy) * scale + targetCy,
    })),
  );
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pathLength(stroke: Stroke): number {
  let total = 0;
  for (let i = 1; i < stroke.length; i++) {
    total += dist(stroke[i - 1], stroke[i]);
  }
  return total;
}

/** Resamples a stroke into exactly `n` evenly-spaced (by arc length) points. */
export function resampleStroke(stroke: Stroke, n: number): Stroke {
  if (stroke.length === 0) return [];
  if (stroke.length === 1 || pathLength(stroke) < 1e-6) {
    return new Array(n).fill(null).map(() => ({ ...stroke[0] }));
  }
  const total = pathLength(stroke);
  const step = total / (n - 1);
  const result: Stroke = [{ ...stroke[0] }];
  let accumulated = 0;
  let i = 1;
  let prev = stroke[0];
  while (result.length < n && i < stroke.length) {
    const curr = stroke[i];
    const segLen = dist(prev, curr);
    if (accumulated + segLen >= step) {
      const remaining = step - accumulated;
      const t = segLen === 0 ? 0 : remaining / segLen;
      const newPoint = {
        x: prev.x + (curr.x - prev.x) * t,
        y: prev.y + (curr.y - prev.y) * t,
      };
      result.push(newPoint);
      prev = newPoint;
      accumulated = 0;
    } else {
      accumulated += segLen;
      prev = curr;
      i++;
    }
  }
  while (result.length < n) {
    result.push({ ...stroke[stroke.length - 1] });
  }
  return result;
}

export function strokeStartEndVector(stroke: Stroke): Point {
  const start = stroke[0];
  const end = stroke[stroke.length - 1];
  return { x: end.x - start.x, y: end.y - start.y };
}

export function cosineSimilarity(a: Point, b: Point): number {
  const magA = Math.hypot(a.x, a.y);
  const magB = Math.hypot(b.x, b.y);
  if (magA < 1e-6 || magB < 1e-6) return 1;
  const dot = a.x * b.x + a.y * b.y;
  return dot / (magA * magB);
}
