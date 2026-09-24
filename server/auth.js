import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Hobby-project secret: fine for local/single-user use. Set JWT_SECRET in
// the environment before deploying this anywhere real.
const JWT_SECRET = process.env.JWT_SECRET || 'trazo-dev-secret-change-me';
const COOKIE_NAME = 'trazo_session';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
}

export function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: THIRTY_DAYS_MS,
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME);
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'No autenticado' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Sesión inválida o expirada' });
  }
}
