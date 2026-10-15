import { useI18n } from '../i18n/I18nContext';
import { LOCALES } from '../i18n/locales';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="language-switcher">
      <span className="sr-only">{t('settings.interfaceLanguage')}</span>
      <span aria-hidden="true">🌐</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        title={t('settings.interfaceLanguage')}
      >
        {LOCALES.map((l) => (
          <option key={l.id} value={l.id}>
            {l.nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}
