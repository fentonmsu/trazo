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
      <span className="status-pill streak" title={t('status.streakTitle')}>
        🔥 {streak.current}
      </span>
      <span className="status-pill xp" title={t('status.xpTitle')}>
        ⭐ {xp} XP
      </span>
      <span className="status-pill hearts" title={t('status.heartsTitle')}>
        {'❤️'.repeat(hearts)}
        {'🖤'.repeat(Math.max(0, 5 - hearts))}
      </span>
      <span className="status-username">{user?.username}</span>
      <button className="logout-button" onClick={() => logout()}>
        {t('status.logout')}
      </button>
    </div>
  );
}
