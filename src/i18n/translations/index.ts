import type { LocaleId } from '../locales';
import es, { type TranslationKey } from './es';
import en from './en';
import he from './he';
import ru from './ru';
import zh from './zh';
import de from './de';
import nl from './nl';
import ar from './ar';
import tr from './tr';
import fr from './fr';
import ja from './ja';
import ko from './ko';
import it from './it';
import pt from './pt';
import uk from './uk';
import pl from './pl';

export type { TranslationKey };

export const TRANSLATIONS: Record<LocaleId, Record<TranslationKey, string>> = {
  es,
  en,
  he,
  ru,
  zh,
  de,
  nl,
  ar,
  tr,
  fr,
  ja,
  ko,
  it,
  pt,
  uk,
  pl,
};
