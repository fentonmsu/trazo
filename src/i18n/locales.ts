export type LocaleId =
  | 'es'
  | 'en'
  | 'he'
  | 'ru'
  | 'zh'
  | 'de'
  | 'nl'
  | 'ar'
  | 'tr'
  | 'fr'
  | 'ja'
  | 'ko'
  | 'it'
  | 'pt'
  | 'uk'
  | 'pl';

export interface LocaleInfo {
  id: LocaleId;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const DEFAULT_LOCALE: LocaleId = 'es';

export const LOCALES: LocaleInfo[] = [
  { id: 'es', nativeName: 'Español', dir: 'ltr' },
  { id: 'en', nativeName: 'English', dir: 'ltr' },
  { id: 'he', nativeName: 'עברית', dir: 'rtl' },
  { id: 'ru', nativeName: 'Русский', dir: 'ltr' },
  { id: 'zh', nativeName: '中文', dir: 'ltr' },
  { id: 'de', nativeName: 'Deutsch', dir: 'ltr' },
  { id: 'nl', nativeName: 'Nederlands', dir: 'ltr' },
  { id: 'ar', nativeName: 'العربية', dir: 'rtl' },
  { id: 'tr', nativeName: 'Türkçe', dir: 'ltr' },
  { id: 'fr', nativeName: 'Français', dir: 'ltr' },
  { id: 'ja', nativeName: '日本語', dir: 'ltr' },
  { id: 'ko', nativeName: '한국어', dir: 'ltr' },
  { id: 'it', nativeName: 'Italiano', dir: 'ltr' },
  { id: 'pt', nativeName: 'Português', dir: 'ltr' },
  { id: 'uk', nativeName: 'Українська', dir: 'ltr' },
  { id: 'pl', nativeName: 'Polski', dir: 'ltr' },
];

export function localeDir(locale: LocaleId): 'ltr' | 'rtl' {
  return LOCALES.find((l) => l.id === locale)?.dir ?? 'ltr';
}
