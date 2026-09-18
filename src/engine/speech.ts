import type { LanguageId } from '../types/character';

const LOCALE_BY_LANGUAGE: Record<LanguageId, string> = {
  kana: 'ja-JP',
  kanji: 'ja-JP',
  cyrillic: 'ru-RU',
  hebrew: 'he-IL',
  niqqud: 'he-IL',
  hebrewFull: 'he-IL',
  arabic: 'ar-SA',
};

let voicesCache: SpeechSynthesisVoice[] = [];
const voiceListeners = new Set<() => void>();

function refreshVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  voicesCache = window.speechSynthesis.getVoices();
  voiceListeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function findVoice(language: LanguageId): SpeechSynthesisVoice | undefined {
  const locale = LOCALE_BY_LANGUAGE[language];
  const langPrefix = locale.split('-')[0];
  return (
    voicesCache.find((v) => v.lang === locale) ??
    voicesCache.find((v) => v.lang.toLowerCase().startsWith(langPrefix))
  );
}

/**
 * Whether the browser/OS has a voice installed for this language's script.
 * Without one, speechSynthesis still "succeeds" but silently substitutes a
 * default voice that can't read the script at all (usually dead silence,
 * sometimes garbled noise) - callers use this to warn instead of failing
 * with no explanation.
 */
export function hasVoiceForLanguage(language: LanguageId): boolean {
  return findVoice(language) !== undefined;
}

/** Re-runs `listener` whenever the browser's voice list (re)loads - voices load asynchronously. */
export function subscribeToVoices(listener: () => void): () => void {
  voiceListeners.add(listener);
  return () => voiceListeners.delete(listener);
}

/** Speaks a single character/glyph using the browser's TTS voice for that script's language. */
export function speakCharacter(char: string, language: LanguageId) {
  if (!isSpeechSupported()) return;
  const utterance = new SpeechSynthesisUtterance(char);
  utterance.lang = LOCALE_BY_LANGUAGE[language];
  utterance.rate = 0.75;

  const voice = findVoice(language);
  if (voice) utterance.voice = voice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
