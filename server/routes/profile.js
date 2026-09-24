import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../auth.js';
import { getState, recordActivity, loseHeart } from '../stateLogic.js';

const router = Router();
router.use(requireAuth);

const selectCharacterProgress = db.prepare(
  'SELECT character_id, best_score, attempts FROM character_progress WHERE user_id = ?',
);
const selectLessonProgress = db.prepare('SELECT lesson_id, stars, completed_at FROM lesson_progress WHERE user_id = ?');
const selectOneCharacter = db.prepare('SELECT * FROM character_progress WHERE user_id = ? AND character_id = ?');
const upsertCharacter = db.prepare(`
  INSERT INTO character_progress (user_id, character_id, best_score, attempts)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(user_id, character_id) DO UPDATE SET best_score = excluded.best_score, attempts = excluded.attempts
`);
const selectOneLesson = db.prepare('SELECT * FROM lesson_progress WHERE user_id = ? AND lesson_id = ?');
const upsertLesson = db.prepare(`
  INSERT INTO lesson_progress (user_id, lesson_id, stars, completed_at)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(user_id, lesson_id) DO UPDATE SET stars = excluded.stars, completed_at = excluded.completed_at
`);

function stateForResponse(state) {
  return {
    streak: { current: state.current_streak, longest: state.longest_streak, lastPracticeDate: state.last_practice_date },
    xp: state.total_xp,
    hearts: state.hearts,
  };
}

router.get('/', (req, res) => {
  const characterProgress = {};
  for (const row of selectCharacterProgress.all(req.userId)) {
    characterProgress[row.character_id] = { bestScore: row.best_score, attempts: row.attempts };
  }
  const lessons = {};
  for (const row of selectLessonProgress.all(req.userId)) {
    lessons[row.lesson_id] = { stars: row.stars, completedAt: row.completed_at };
  }
  res.json({ characterProgress, lessons, ...stateForResponse(getState(req.userId)) });
});

router.post('/character', (req, res) => {
  const { characterId, score } = req.body ?? {};
  if (typeof characterId !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  const existing = selectOneCharacter.get(req.userId, characterId);
  const bestScore = Math.max(existing?.best_score ?? 0, score);
  const attempts = (existing?.attempts ?? 0) + 1;
  upsertCharacter.run(req.userId, characterId, bestScore, attempts);

  const xpEarned = existing ? 1 : 3;
  const state = recordActivity(req.userId, xpEarned);
  res.json({ bestScore, attempts, ...stateForResponse(state) });
});

router.post('/lesson', (req, res) => {
  const { lessonId, stars, xpEarned } = req.body ?? {};
  if (typeof lessonId !== 'string' || typeof stars !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  const existing = selectOneLesson.get(req.userId, lessonId);
  const bestStars = Math.max(existing?.stars ?? 0, stars);
  upsertLesson.run(req.userId, lessonId, bestStars, new Date().toISOString());

  const state = recordActivity(req.userId, typeof xpEarned === 'number' ? xpEarned : 10);
  res.json({ stars: bestStars, ...stateForResponse(state) });
});

router.post('/heart-lost', (req, res) => {
  res.json({ hearts: loseHeart(req.userId) });
});

export default router;
