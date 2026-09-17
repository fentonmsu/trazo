import type { CharacterTemplate, Stroke } from '../types/character';
import { normalizeStrokes, resampleStroke, strokeStartEndVector, cosineSimilarity } from './geometry';
import { dtwDistance } from './dtw';

const RESAMPLE_POINTS = 32;
/** Average per-point DTW distance (on the 0-100 grid) treated as "score 0". */
const MAX_ACCEPTABLE_DIST = 26;
/** Cost charged for an unmatched (missing or extra) stroke during alignment. */
const GAP_PENALTY = 30;

type PreparedStroke = { raw: Stroke; resampled: Stroke; vector: { x: number; y: number } };

function prepareStrokes(strokes: Stroke[]): PreparedStroke[] {
  const normalized = normalizeStrokes(strokes);
  return normalized.map((s) => ({
    raw: s,
    resampled: resampleStroke(s, RESAMPLE_POINTS),
    vector: strokeStartEndVector(s),
  }));
}

const templateCache = new Map<string, PreparedStroke[]>();

function getPreparedTemplate(template: CharacterTemplate): PreparedStroke[] {
  const cached = templateCache.get(template.id);
  if (cached) return cached;
  const prepared = prepareStrokes(template.strokes);
  templateCache.set(template.id, prepared);
  return prepared;
}

function strokeCost(a: PreparedStroke, b: PreparedStroke): number {
  return dtwDistance(a.resampled, b.resampled);
}

type AlignOp =
  | { type: 'match'; userIdx: number; templateIdx: number; cost: number }
  | { type: 'extra'; userIdx: number }
  | { type: 'missing'; templateIdx: number };

/** Needleman-Wunsch style monotonic alignment between user and template strokes. */
function alignStrokes(user: PreparedStroke[], template: PreparedStroke[]): AlignOp[] {
  const n = user.length;
  const m = template.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  const backptr: ('match' | 'extra' | 'missing')[][] = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill('match'),
  );

  for (let i = 1; i <= n; i++) {
    dp[i][0] = dp[i - 1][0] + GAP_PENALTY;
    backptr[i][0] = 'extra';
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = dp[0][j - 1] + GAP_PENALTY;
    backptr[0][j] = 'missing';
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const matchCost = dp[i - 1][j - 1] + strokeCost(user[i - 1], template[j - 1]);
      const extraCost = dp[i - 1][j] + GAP_PENALTY;
      const missingCost = dp[i][j - 1] + GAP_PENALTY;
      const best = Math.min(matchCost, extraCost, missingCost);
      dp[i][j] = best;
      backptr[i][j] = best === matchCost ? 'match' : best === extraCost ? 'extra' : 'missing';
    }
  }

  const ops: AlignOp[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    const op = backptr[i][j];
    if (i > 0 && j > 0 && op === 'match') {
      ops.push({ type: 'match', userIdx: i - 1, templateIdx: j - 1, cost: strokeCost(user[i - 1], template[j - 1]) });
      i--;
      j--;
    } else if (i > 0 && (j === 0 || op === 'extra')) {
      ops.push({ type: 'extra', userIdx: i - 1 });
      i--;
    } else {
      ops.push({ type: 'missing', templateIdx: j - 1 });
      j--;
    }
  }
  return ops.reverse();
}

function costToScore(cost: number): number {
  return Math.max(0, Math.min(1, 1 - cost / MAX_ACCEPTABLE_DIST));
}

export interface DrawingScoreResult {
  /** 0-100 overall score */
  score: number;
  expectedStrokeCount: number;
  actualStrokeCount: number;
  feedback: string[];
  /** One entry per template stroke, in order; null if that stroke was missing. */
  perStrokeScores: (number | null)[];
}

export function scoreDrawing(userStrokes: Stroke[], template: CharacterTemplate): DrawingScoreResult {
  const preparedUser = prepareStrokes(userStrokes);
  const preparedTemplate = getPreparedTemplate(template);
  const expectedStrokeCount = template.strokes.length;
  const actualStrokeCount = userStrokes.length;

  if (actualStrokeCount === 0) {
    return {
      score: 0,
      expectedStrokeCount,
      actualStrokeCount,
      feedback: ['Todavía no dibujaste nada.'],
      perStrokeScores: new Array(expectedStrokeCount).fill(null),
    };
  }

  const ops = alignStrokes(preparedUser, preparedTemplate);
  const perStrokeScores: (number | null)[] = new Array(expectedStrokeCount).fill(null);
  let numerator = 0;
  let missingCount = 0;
  let extraCount = 0;
  const directionIssues: number[] = [];
  const shapeIssues: number[] = [];

  for (const op of ops) {
    if (op.type === 'match') {
      const s = costToScore(op.cost);
      perStrokeScores[op.templateIdx] = s;
      numerator += s;
      if (s < 0.55) {
        const userVec = preparedUser[op.userIdx].vector;
        const templateVec = preparedTemplate[op.templateIdx].vector;
        const cos = cosineSimilarity(userVec, templateVec);
        if (cos < 0.3) {
          directionIssues.push(op.templateIdx + 1);
        } else {
          shapeIssues.push(op.templateIdx + 1);
        }
      }
    } else if (op.type === 'extra') {
      extraCount++;
    } else {
      missingCount++;
    }
  }

  const denominator = expectedStrokeCount + extraCount;
  const finalScore = denominator > 0 ? numerator / denominator : 0;
  const score = Math.round(finalScore * 100);

  const feedback: string[] = [];
  if (missingCount > 0) {
    feedback.push(`Te faltó dibujar ${missingCount} trazo${missingCount > 1 ? 's' : ''}.`);
  }
  if (extraCount > 0) {
    feedback.push(`Dibujaste ${extraCount} trazo${extraCount > 1 ? 's' : ''} de más.`);
  }
  if (directionIssues.length > 0) {
    feedback.push(`Revisa la dirección del trazo ${directionIssues.join(', ')}.`);
  }
  if (shapeIssues.length > 0) {
    feedback.push(`La forma del trazo ${shapeIssues.join(', ')} no coincide bien con el modelo.`);
  }
  if (feedback.length === 0) {
    feedback.push(score >= 90 ? '¡Excelente! Trazo muy preciso.' : 'Buen intento, sigue practicando.');
  }

  return { score, expectedStrokeCount, actualStrokeCount, feedback, perStrokeScores };
}

export interface RecognitionMatch {
  template: CharacterTemplate;
  confidence: number;
}

/**
 * Compares a freeform drawing against every candidate template and returns
 * the best matches ranked by similarity ("which character is this?").
 */
export function recognizeCharacter(
  userStrokes: Stroke[],
  candidates: CharacterTemplate[],
  topN = 5,
): RecognitionMatch[] {
  if (userStrokes.length === 0) return [];
  const preparedUser = prepareStrokes(userStrokes);

  const results = candidates.map((template) => {
    const preparedTemplate = getPreparedTemplate(template);
    const ops = alignStrokes(preparedUser, preparedTemplate);
    let numerator = 0;
    let extraCount = 0;
    for (const op of ops) {
      if (op.type === 'match') numerator += costToScore(op.cost);
      else if (op.type === 'extra') extraCount++;
    }
    const denominator = template.strokes.length + extraCount;
    const confidence = denominator > 0 ? (numerator / denominator) * 100 : 0;
    return { template, confidence };
  });

  results.sort((a, b) => b.confidence - a.confidence);
  return results.slice(0, topN);
}
