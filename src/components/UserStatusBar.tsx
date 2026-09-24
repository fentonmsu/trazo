import { useAuth } from '../hooks/useAuth';
import type { StreakState } from '../hooks/useProfile';

interface UserStatusBarProps {
  streak: StreakState;
  xp: number;
  hearts: number;
}

export function UserStatusBar({ streak, xp, hearts }: UserStatusBarProps) {
  const { user, logout } = useAuth();

  return (
    <div className="user-status-bar">
      <span className="status-pill streak" title="Racha de días seguidos practicando">
        🔥 {streak.current}
      </span>
      <span className="status-pill xp" title="Puntos de experiencia">
        ⭐ {xp} XP
      </span>
      <span className="status-pill hearts" title="Vidas">
        {'❤️'.repeat(hearts)}
        {'🖤'.repeat(Math.max(0, 5 - hearts))}
      </span>
      <span className="status-username">{user?.username}</span>
      <button className="logout-button" onClick={() => logout()}>
        Salir
      </button>
    </div>
  );
}
