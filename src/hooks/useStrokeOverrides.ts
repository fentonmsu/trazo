import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { CharacterTemplate, Stroke } from '../types/character';

export type OverrideMap = Record<string, Stroke[]>;

/**
 * Fetches admin-edited stroke corrections (see AdminEditor) from the
 * backend once on mount. Public/unauthenticated - every visitor needs
 * these to see corrected guides, not just the admin editing them.
 */
export function useStrokeOverrides() {
  const [overrides, setOverrides] = useState<OverrideMap>({});

  const refresh = async () => {
    try {
      const data = await api.get<OverrideMap>('/overrides');
      setOverrides(data);
    } catch {
      // Overrides are a nice-to-have correction layer; if the fetch fails,
      // just fall back to the bundled defaults instead of breaking the app.
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { overrides, refreshOverrides: refresh };
}

export function applyOverrides(characters: CharacterTemplate[], overrides: OverrideMap): CharacterTemplate[] {
  if (Object.keys(overrides).length === 0) return characters;
  return characters.map((c) => (overrides[c.id] ? { ...c, strokes: overrides[c.id] } : c));
}
