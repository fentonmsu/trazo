import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useStrokeOverrides } from '../../hooks/useStrokeOverrides';
import { AdminEditor } from './AdminEditor';

interface AdminGateProps {
  onClose: () => void;
  overridesHook: ReturnType<typeof useStrokeOverrides>;
}

/** Shown when the header's edit button is clicked: a passphrase prompt until
 *  unlocked, then the full stroke editor. Gated by a shared passphrase
 *  (ADMIN_SECRET), not by account, since this is a content tool. */
export function AdminGate({ onClose, overridesHook }: AdminGateProps) {
  const { isAdmin, checking, unlock, lock } = useAdmin();
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');

  if (checking) return null;

  if (!isAdmin) {
    return (
      <div className="admin-overlay">
        <div className="admin-unlock-box">
          <h2>Editor de trazos</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const ok = await unlock(passphrase);
              if (!ok) setError('Contraseña incorrecta');
            }}
          >
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Contraseña de administrador"
              autoFocus
            />
            <div className="admin-unlock-actions">
              <button type="submit" className="primary">Entrar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
            {error && <p className="admin-status">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminEditor
      overrides={overridesHook.overrides}
      onOverridesChanged={overridesHook.refreshOverrides}
      onClose={onClose}
      onLock={async () => {
        await lock();
      }}
    />
  );
}
