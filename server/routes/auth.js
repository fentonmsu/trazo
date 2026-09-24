import { Router } from 'express';
import { db } from '../db.js';
import { hashPassword, verifyPassword, signToken, setSessionCookie, clearSessionCookie, requireAuth } from '../auth.js';

const router = Router();

const findUserByUsername = db.prepare('SELECT * FROM users WHERE username = ?');
const insertUser = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
const insertDefaultState = db.prepare('INSERT INTO user_state (user_id) VALUES (?)');
const findUserById = db.prepare('SELECT id, username FROM users WHERE id = ?');

router.post('/register', (req, res) => {
  const { username, password } = req.body ?? {};
  const cleanUsername = typeof username === 'string' ? username.trim() : '';

  if (cleanUsername.length < 3) {
    return res.status(400).json({ error: 'El usuario debe tener al menos 3 caracteres' });
  }
  if (typeof password !== 'string' || password.length < 4) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres' });
  }
  if (findUserByUsername.get(cleanUsername)) {
    return res.status(409).json({ error: 'Ese nombre de usuario ya existe' });
  }

  const info = insertUser.run(cleanUsername, hashPassword(password));
  const userId = Number(info.lastInsertRowid);
  insertDefaultState.run(userId);

  setSessionCookie(res, signToken(userId));
  res.json({ id: userId, username: cleanUsername });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body ?? {};
  const user = findUserByUsername.get(typeof username === 'string' ? username.trim() : '');
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

router.get('/me', requireAuth, (req, res) => {
  const user = findUserById.get(req.userId);
  if (!user) return res.status(401).json({ error: 'No autenticado' });
  res.json(user);
});

export default router;
