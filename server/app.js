import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';

const app = express();

// In production the frontend and API are served from the same Vercel
// domain, so this is same-origin and CORS doesn't even apply there.
// The explicit origin is only needed for local dev (Vite on :5173 calling
// the API on :4001).
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

export default app;
