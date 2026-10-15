import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../auth.js';
import { getState, recordActivity, loseHeart } from '../stateLogic.js';

const router = Router();
router.use(requireAuth);

function stateForResponse(state) {
  return {
    streak: { current: state.current_streak, longest: state.longest_streak, lastPracticeDate: state.last_practice_date },
    xp: state.total_xp,
    hearts: state.hearts,
  };
}

router.get('/', async (req, res) => {
  const [{ data: characterRows, error: charError }, { data: lessonRows, error: lessonError }, state] = await Promise.all([
    supabase.from('character_progress').select('character_id, best_score, attempts').eq('user_id', req.userId),
    supabase.from('lesson_progress').select('lesson_id, stars, completed_at').eq('user_id', req.userId),
    getState(req.userId),
  ]);
  if (charError || lessonError) return res.status(500).json({ error: 'DB_ERROR' });

  const characterProgress = {};
  for (const row of characterRows) {
    characterProgress[row.character_id] = { bestScore: row.best_score, attempts: row.attempts };
  }
  const lessons = {};
  for (const row of lessonRows) {
    lessons[row.lesson_id] = { stars: row.stars, completedAt: row.completed_at };
  }
  res.json({ characterProgress, lessons, ...stateForResponse(state) });
});

router.post('/character', async (req, res) => {
  const { characterId, score } = req.body ?? {};
  if (typeof characterId !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ error: 'INVALID_DATA' });
  }
  const { data: existing, error: lookupError } = await supabase
    .from('character_progress')
    .select('best_score, attempts')
    .eq('user_id', req.userId)
    .eq('character_id', characterId)
    .maybeSingle();
  if (lookupError) return res.status(500).json({ error: 'DB_ERROR' });

  const bestScore = Math.max(existing?.best_score ?? 0, score);
  const attempts = (existing?.attempts ?? 0) + 1;
  const { error: upsertError } = await supabase
    .from('character_progress')
    .upsert({ user_id: req.userId, character_id: characterId, best_score: bestScore, attempts }, { onConflict: 'user_id,character_id' });
  if (upsertError) return res.status(500).json({ error: 'DB_ERROR' });

  const xpEarned = existing ? 1 : 3;
  const state = await recordActivity(req.userId, xpEarned);
  res.json({ bestScore, attempts, ...stateForResponse(state) });
});

router.post('/lesson', async (req, res) => {
  const { lessonId, stars, xpEarned } = req.body ?? {};
  if (typeof lessonId !== 'string' || typeof stars !== 'number') {
    return res.status(400).json({ error: 'INVALID_DATA' });
  }
  const { data: existing, error: lookupError } = await supabase
    .from('lesson_progress')
    .select('stars')
    .eq('user_id', req.userId)
    .eq('lesson_id', lessonId)
    .maybeSingle();
  if (lookupError) return res.status(500).json({ error: 'DB_ERROR' });

  const bestStars = Math.max(existing?.stars ?? 0, stars);
  const { error: upsertError } = await supabase
    .from('lesson_progress')
    .upsert(
      { user_id: req.userId, lesson_id: lessonId, stars: bestStars, completed_at: new Date().toISOString() },
      { onConflict: 'user_id,lesson_id' },
    );
  if (upsertError) return res.status(500).json({ error: 'DB_ERROR' });

  const state = await recordActivity(req.userId, typeof xpEarned === 'number' ? xpEarned : 10);
  res.json({ stars: bestStars, ...stateForResponse(state) });
});

router.post('/heart-lost', async (req, res) => {
  res.json({ hearts: await loseHeart(req.userId) });
});

export default router;
