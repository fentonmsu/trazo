import { useEffect, useRef, useState } from 'react';
import type { LanguageId } from '../types/character';
import { LANGUAGE_ORDER } from '../data/languages';
import { useI18n } from '../i18n/I18nContext';
import type { TranslationKey } from '../i18n/translations';

interface LanguageMenuProps {
  language: LanguageId;
  onSelect: (language: LanguageId) => void;
  nameKeys: Record<LanguageId, TranslationKey>;
}

/** Hamburger-style dropdown for picking which script to practice - a flat
 *  row of buttons stopped scaling once the language list grew past a
 *  handful of scripts. */
export function LanguageMenu({ language, onSelect, nameKeys }: LanguageMenuProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="language-menu" ref={rootRef}>
      <button
        type="button"
        className="language-menu-button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="language-menu-icon" aria-hidden="true">☰</span>
        <span className="language-menu-current">{t(nameKeys[language])}</span>
      </button>
      {open && (
        <div className="language-menu-panel" role="menu">
          {LANGUAGE_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              role="menuitemradio"
              aria-checked={id === language}
              className={`language-menu-item ${id === language ? 'active' : ''}`}
              onClick={() => {
                onSelect(id);
                setOpen(false);
              }}
            >
              {t(nameKeys[id])}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
