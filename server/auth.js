import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Hobby-project secret: fine for local/single-user use. Set JWT_SECRET in
// the environment before deploying this anywhere real.
const JWT_SECRET = process.env.JWT_SECRET || 'trazo-dev-secret-change-me';
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const COOKIE_NAME = 'trazo_session';
const ADMIN_COOKIE_NAME = 'trazo_admin';
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
    secure: process.env.NODE_ENV === 'production',
    maxAge: THIRTY_DAYS_MS,
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME);
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'NOT_AUTHENTICATED' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'SESSION_INVALID' });
  }
}

// Separate from the per-user session: a single shared passphrase (set via
// ADMIN_SECRET) unlocks the stroke-editing tool, independent of which
// account is logged in.
export function checkAdminPassphrase(passphrase) {
  return Boolean(ADMIN_SECRET) && passphrase === ADMIN_SECRET;
}

export function signAdminToken() {
  return jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '30d' });
}

export function setAdminCookie(res, token) {
  res.cookie(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: THIRTY_DAYS_MS,
  });
}

export function clearAdminCookie(res) {
  res.clearCookie(ADMIN_COOKIE_NAME);
}

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];
  if (!token) return res.status(403).json({ error: 'NOT_ADMIN' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload.admin) throw new Error('not an admin token');
    next();
  } catch {
    res.status(403).json({ error: 'NOT_ADMIN' });
  }
}
