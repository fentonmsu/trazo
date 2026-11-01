import { useAuth } from '../hooks/useAuth';
import type { StreakState } from '../hooks/useProfile';
import { useI18n } from '../i18n/I18nContext';

interface UserStatusBarProps {
  streak: StreakState;
  xp: number;
  hearts: number;
}

export function UserStatusBar({ streak, xp, hearts }: UserStatusBarProps) {
  const { user, logout } = useAuth();
  const { t } = useI18n();

  return (
    <div className="user-status-bar">
      <span
        className="status-pill streak"
        title={t('status.streakTitle')}
        aria-label={`${t('status.streakTitle')}: ${streak.current}`}
      >
        <span aria-hidden="true">🔥 {streak.current}</span>
      </span>
      <span
        className="status-pill xp"
        title={t('status.xpTitle')}
        aria-label={`${t('status.xpTitle')}: ${xp}`}
      >
        <span aria-hidden="true">⭐ {xp} XP</span>
      </span>
      <span
        className="status-pill hearts"
        title={t('status.heartsTitle')}
        aria-label={`${t('status.heartsTitle')}: ${hearts}/5`}
      >
        <span aria-hidden="true">
          {'❤️'.repeat(hearts)}
          {'🖤'.repeat(Math.max(0, 5 - hearts))}
        </span>
      </span>
      <span className="status-username">{user?.username}</span>
      <button className="logout-button" onClick={() => logout()}>
        {t('status.logout')}
      </button>
    </div>
  );
}
