import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { LOCALES } from '../i18n/locales';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.id === locale);

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
    <div className="locale-menu" ref={rootRef}>
      <button
        type="button"
        className="locale-menu-button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        title={t('settings.interfaceLanguage')}
      >
        <span aria-hidden="true">🌐</span>
        <span>{current?.nativeName}</span>
        <span className="locale-menu-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <div className="locale-menu-panel" role="menu">
          {LOCALES.map((l) => (
            <button
              key={l.id}
              type="button"
              role="menuitemradio"
              aria-checked={l.id === locale}
              className={`locale-menu-item ${l.id === locale ? 'active' : ''}`}
              dir={l.dir}
              onClick={() => {
                setLocale(l.id);
                setOpen(false);
              }}
            >
              {l.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
