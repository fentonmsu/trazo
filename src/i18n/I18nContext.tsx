import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LOCALE, localeDir, type LocaleId } from './locales';
import { TRANSLATIONS, type TranslationKey } from './translations';

const STORAGE_KEY = 'trazo_locale';

function isLocaleId(value: string): value is LocaleId {
  return value in TRANSLATIONS;
}

function readStoredLocale(): LocaleId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocaleId(stored)) return stored;
  } catch {
    // localStorage unavailable (private browsing, etc.) - fall back silently.
  }
  return DEFAULT_LOCALE;
}

interface I18nContextValue {
  locale: LocaleId;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: LocaleId) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(readStoredLocale);
  const dir = localeDir(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = (next: LocaleId) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore - the choice just won't persist across visits.
    }
  };

  const t = useMemo(() => {
    const dict = TRANSLATIONS[locale];
    return (key: TranslationKey, vars?: Record<string, string | number>) => {
      let value = dict[key] ?? TRANSLATIONS[DEFAULT_LOCALE][key] ?? key;
      if (vars) {
        for (const [name, val] of Object.entries(vars)) {
          value = value.replace(`{${name}}`, String(val));
        }
      }
      return value;
    };
  }, [locale]);

  return <I18nContext.Provider value={{ locale, dir, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider');
  return ctx;
}
