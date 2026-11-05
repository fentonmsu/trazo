import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '../api/client';

/**
 * Gates the stroke-editing tool behind a single shared passphrase
 * (ADMIN_SECRET on the backend), independent of which account is logged
 * in - this is a content-correction tool, not a per-user permission.
 */
export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  const check = useCallback(async () => {
    setChecking(true);
    try {
      await api.get('/admin/check');
      setIsAdmin(true);
    } catch {
      setIsAdmin(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const unlock = useCallback(async (passphrase: string) => {
    try {
      await api.post('/admin/unlock', { passphrase });
      setIsAdmin(true);
      return true;
    } catch (e) {
      if (e instanceof ApiError) return false;
      throw e;
    }
  }, []);

  const lock = useCallback(async () => {
    await api.post('/admin/lock');
    setIsAdmin(false);
  }, []);

  return { isAdmin, checking, unlock, lock };
}
