import type { Point, Stroke } from '../types/character';

/**
 * Ramer-Douglas-Peucker simplification: reduces a dense polyline (e.g. one
 * already resampled through smoothStroke) down to a handful of key points,
 * within `tolerance` grid units of the original curve. Used by the admin
 * stroke editor so a 30-50 point smoothed curve becomes a few draggable
 * control points instead of an unworkable cluster.
 */
export function simplifyStroke(points: Stroke, tolerance: number): Stroke {
  if (points.length <= 2) return points;

  function perpendicularDistance(p: Point, a: Point, b: Point): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
    const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq;
    const projX = a.x + t * dx;
    const projY = a.y + t * dy;
    return Math.hypot(p.x - projX, p.y - projY);
  }

  function simplifySection(pts: Stroke): Stroke {
    if (pts.length <= 2) return pts;
    let maxDist = -1;
    let maxIndex = -1;
    for (let i = 1; i < pts.length - 1; i++) {
      const dist = perpendicularDistance(pts[i], pts[0], pts[pts.length - 1]);
      if (dist > maxDist) {
        maxDist = dist;
        maxIndex = i;
      }
    }
    if (maxDist > tolerance) {
      const left = simplifySection(pts.slice(0, maxIndex + 1));
      const right = simplifySection(pts.slice(maxIndex));
      return [...left.slice(0, -1), ...right];
    }
    return [pts[0], pts[pts.length - 1]];
  }

  return simplifySection(points);
}

/**
 * Clamped uniform cubic B-spline resample: turns a sparse set of control
 * points into a dense smooth curve. Chosen over Catmull-Rom because a
 * B-spline is always a convex combination of its 4 nearest control points,
 * so it can't overshoot past them the way Catmull-Rom does at sharp turns
 * (see the hebrewCursive.ts stroke-smoothing history for why that matters).
 */
export function smoothStroke(points: Stroke, samplesPerSegment = 8): Stroke {
  if (points.length < 3) return points;
  const pts = [points[0], points[0], ...points, points[points.length - 1], points[points.length - 1]];
  const out: Stroke = [];
  for (let i = 0; i < pts.length - 3; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const p2 = pts[i + 2];
    const p3 = pts[i + 3];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const b0 = (1 - t) ** 3 / 6;
      const b1 = (3 * t3 - 6 * t2 + 4) / 6;
      const b2 = (-3 * t3 + 3 * t2 + 3 * t + 1) / 6;
      const b3 = t3 / 6;
      const x = b0 * p0.x + b1 * p1.x + b2 * p2.x + b3 * p3.x;
      const y = b0 * p0.y + b1 * p1.y + b2 * p2.y + b3 * p3.y;
      out.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}
