import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../api/client';

export function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Algo salió mal. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Trazo</h1>
        <p className="subtitle">Aprende a escribir kana, kanji, cirílico, hebreo y árabe dibujando a mano</p>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')} type="button">
            Iniciar sesión
          </button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')} type="button">
            Crear cuenta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Usuario
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              minLength={3}
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={4}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="primary" disabled={submitting}>
            {submitting ? 'Un momento…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}
