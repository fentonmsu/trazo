import type { LanguageId } from '../types/character';

const LOCALE_BY_LANGUAGE: Record<LanguageId, string> = {
  kana: 'ja-JP',
  kanji: 'ja-JP',
  cyrillic: 'ru-RU',
  hebrew: 'he-IL',
};

let voicesCache: SpeechSynthesisVoice[] = [];

function refreshVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  voicesCache = window.speechSynthesis.getVoices();
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Speaks a single character/glyph using the browser's TTS voice for that script's language. */
export function speakCharacter(char: string, language: LanguageId) {
  if (!isSpeechSupported()) return;
  const locale = LOCALE_BY_LANGUAGE[language];
  const langPrefix = locale.split('-')[0];

  const utterance = new SpeechSynthesisUtterance(char);
  utterance.lang = locale;
  utterance.rate = 0.75;

  const exactVoice = voicesCache.find((v) => v.lang === locale);
  const looseVoice = voicesCache.find((v) => v.lang.toLowerCase().startsWith(langPrefix));
  const voice = exactVoice ?? looseVoice;
  if (voice) utterance.voice = voice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
