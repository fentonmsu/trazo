import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../api/client';
import { useI18n } from '../i18n/I18nContext';
import type { TranslationKey } from '../i18n/translations';
import esDict from '../i18n/translations/es';
import { LanguageSwitcher } from './LanguageSwitcher';

export function AuthScreen() {
  const { login, register } = useAuth();
  const { t } = useI18n();
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
      const code = err instanceof ApiError ? (`errors.${err.message}` as TranslationKey) : null;
      setError(code && code in esDict ? t(code) : t('auth.genericError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-language-row">
        <LanguageSwitcher />
      </div>
      <div className="auth-card">
        <h1>Trazo</h1>
        <p className="subtitle">{t('app.subtitle')}</p>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')} type="button">
            {t('auth.login')}
          </button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')} type="button">
            {t('auth.register')}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            {t('auth.username')}
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
            {t('auth.password')}
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
            {submitting ? t('auth.submitting') : mode === 'login' ? t('auth.enter') : t('auth.register')}
          </button>
        </form>
      </div>
    </div>
  );
}
