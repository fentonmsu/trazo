import { Router } from 'express';
import { supabase } from '../db.js';
import { hashPassword, verifyPassword, signToken, setSessionCookie, clearSessionCookie, requireAuth } from '../auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body ?? {};
  const cleanUsername = typeof username === 'string' ? username.trim() : '';

  if (cleanUsername.length < 3) {
    return res.status(400).json({ error: 'El usuario debe tener al menos 3 caracteres' });
  }
  if (typeof password !== 'string' || password.length < 4) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres' });
  }

  const { data: existing, error: lookupError } = await supabase
    .from('users')
    .select('id')
    .eq('username', cleanUsername)
    .maybeSingle();
  if (lookupError) return res.status(500).json({ error: 'Error de base de datos' });
  if (existing) return res.status(409).json({ error: 'Ese nombre de usuario ya existe' });

  const { data: user, error: insertError } = await supabase
    .from('users')
    .insert({ username: cleanUsername, password_hash: hashPassword(password) })
    .select('id')
    .single();
  if (insertError) return res.status(500).json({ error: 'No se pudo crear el usuario' });

  await supabase.from('user_state').insert({ user_id: user.id });

  setSessionCookie(res, signToken(user.id));
  res.json({ id: user.id, username: cleanUsername });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body ?? {};
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', typeof username === 'string' ? username.trim() : '')
    .maybeSingle();
  if (error) return res.status(500).json({ error: 'Error de base de datos' });
  if (!user || !verifyPassword(typeof password === 'string' ? password : '', user.password_hash)) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
  setSessionCookie(res, signToken(user.id));
  res.json({ id: user.id, username: user.username });
});

router.post('/logout', (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireAuth, async (req, res) => {
  const { data: user, error } = await supabase.from('users').select('id, username').eq('id', req.userId).maybeSingle();
  if (error || !user) return res.status(401).json({ error: 'No autenticado' });
  res.json(user);
});

export default router;
