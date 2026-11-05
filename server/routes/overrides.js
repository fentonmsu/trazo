import { Router } from 'express';
import { supabase } from '../db.js';

const router = Router();

// Public and unauthenticated: every client needs this on load to render
// corrected stroke guides, same as the static bundled character data. This
// is a nice-to-have correction layer, not load-bearing, so any failure
// (including the table not existing yet, pre-migration) degrades to "no
// overrides" with a 200 rather than surfacing as a failed network request
// on every single page load.
router.get('/', async (_req, res) => {
  const { data, error } = await supabase.from('character_overrides').select('character_id, strokes');
  if (error) {
    console.error('character_overrides fetch failed:', error.message);
    return res.json({});
  }
  const map = {};
  for (const row of data) map[row.character_id] = row.strokes;
  res.json(map);
});

export default router;
