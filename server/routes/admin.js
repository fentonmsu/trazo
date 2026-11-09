import { Router } from 'express';
import { supabase } from '../db.js';
import { checkAdminPassphrase, signAdminToken, setAdminCookie, clearAdminCookie, requireAdmin } from '../auth.js';

const router = Router();

router.post('/unlock', (req, res) => {
  const { passphrase } = req.body ?? {};
  if (!checkAdminPassphrase(typeof passphrase === 'string' ? passphrase : '')) {
    return res.status(401).json({ error: 'WRONG_PASSPHRASE' });
  }
  setAdminCookie(res, signAdminToken());
  res.json({ ok: true });
});

router.post('/lock', (_req, res) => {
  clearAdminCookie(res);
  res.json({ ok: true });
});

router.get('/check', requireAdmin, (_req, res) => res.json({ ok: true }));

router.use(requireAdmin);

function isValidStrokes(strokes) {
  return (
    Array.isArray(strokes) &&
    strokes.length > 0 &&
    strokes.every(
      (stroke) =>
        Array.isArray(stroke) &&
        stroke.length > 0 &&
        stroke.every((p) => p && typeof p.x === 'number' && typeof p.y === 'number'),
    )
  );
}

router.put('/overrides/:id', async (req, res) => {
  const { strokes } = req.body ?? {};
  if (!isValidStrokes(strokes)) return res.status(400).json({ error: 'INVALID_STROKES' });
  const { error } = await supabase
    .from('character_overrides')
    .upsert({ character_id: req.params.id, strokes, updated_at: new Date().toISOString() }, { onConflict: 'character_id' });
  if (error) return res.status(500).json({ error: 'DB_ERROR' });
  res.json({ ok: true });
});

router.delete('/overrides/:id', async (req, res) => {
  const { error } = await supabase.from('character_overrides').delete().eq('character_id', req.params.id);
  if (error) return res.status(500).json({ error: 'DB_ERROR' });
  res.json({ ok: true });
});

export default router;
