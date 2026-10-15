import { useEffect, useMemo, useState } from 'react';
import type { CharacterTemplate, LanguageId } from './types/character';
import { LANGUAGE_ORDER } from './data/languages';
import { getCharactersForLanguage } from './data';
import { getLessonsForLanguage, LESSON_LANGUAGES, type Lesson } from './data/lessons';
import { CharacterGrid } from './components/CharacterGrid';
import { TrainerView } from './components/TrainerView';
import { AuthScreen } from './components/AuthScreen';
import { UserStatusBar } from './components/UserStatusBar';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LessonMap } from './components/lesson/LessonMap';
import { LessonRunner } from './components/lesson/LessonRunner';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import type { TranslationKey } from './i18n/translations';
import './App.css';

type Mode = 'practice' | 'recognize' | 'lesson';

const LANGUAGE_NAME_KEYS: Record<LanguageId, TranslationKey> = {
  kana: 'lang.kana',
  kanji: 'lang.kanji',
  cyrillic: 'lang.cyrillic',
  hebrew: 'lang.hebrew',
  niqqud: 'lang.niqqud',
  hebrewFull: 'lang.hebrewFull',
  arabic: 'lang.arabic',
  chinese: 'lang.chinese',
  turkish: 'lang.turkish',
  korean: 'lang.korean',
  polish: 'lang.polish',
};

function TrazoApp() {
  const { t } = useI18n();
  const [language, setLanguage] = useState<LanguageId>('kana');
  const [mode, setMode] = useState<Mode>('lesson');
  const [selected, setSelected] = useState<CharacterTemplate | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const { profile, recordCharacterScore, recordLessonResult, loseHeart } = useProfile();

  const characters = useMemo(() => getCharactersForLanguage(language), [language]);
  const lessons = useMemo(
    () => (LESSON_LANGUAGES.includes(language) ? getLessonsForLanguage(language) : []),
    [language],
  );

  useEffect(() => {
    setSelected(characters[0] ?? null);
    setActiveLesson(null);
  }, [characters]);

  if (activeLesson && profile) {
    return (
      <div className="app">
        <LessonRunner
          lesson={activeLesson}
          languagePool={characters}
          hearts={profile.hearts}
          onExit={() => setActiveLesson(null)}
          onLoseHeart={loseHeart}
          onComplete={(stars, xpEarned) => recordLessonResult(activeLesson.id, stars, xpEarned)}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top-row">
          {profile && <UserStatusBar streak={profile.streak} xp={profile.xp} hearts={profile.hearts} />}
          <LanguageSwitcher />
        </div>
        <h1>Trazo</h1>
        <p className="subtitle">{t('app.subtitle')}</p>
      </header>

      <nav className="language-tabs">
        {LANGUAGE_ORDER.map((id) => (
          <button key={id} className={language === id ? 'active' : ''} onClick={() => setLanguage(id)}>
            {t(LANGUAGE_NAME_KEYS[id])}
          </button>
        ))}
      </nav>

      <nav className="mode-tabs">
        <button className={mode === 'lesson' ? 'active' : ''} onClick={() => setMode('lesson')}>
          {t('nav.lesson')}
        </button>
        <button className={mode === 'practice' ? 'active' : ''} onClick={() => setMode('practice')}>
          {t('nav.practice')}
        </button>
        <button className={mode === 'recognize' ? 'active' : ''} onClick={() => setMode('recognize')}>
          {t('nav.recognize')}
        </button>
      </nav>

      {mode === 'lesson' ? (
        <main className="app-main lesson-main">
          {lessons.length === 0 ? (
            <p className="hint">{t('app.noLessons')}</p>
          ) : (
            <LessonMap
              lessons={lessons}
              lessonProgress={profile?.lessons ?? {}}
              hearts={profile?.hearts ?? 0}
              onStart={setActiveLesson}
            />
          )}
        </main>
      ) : (
        <main className="app-main">
          <aside className="sidebar">
            {characters.length === 0 ? (
              <p className="hint">{t('app.noCharacters')}</p>
            ) : (
              <CharacterGrid
                characters={characters}
                selectedId={selected?.id ?? null}
                progress={profile?.characterProgress ?? {}}
                onSelect={setSelected}
              />
            )}
          </aside>

          <section className="trainer-panel">
            <TrainerView
              mode={mode}
              target={mode === 'practice' ? selected : null}
              candidates={characters}
              onScored={recordCharacterScore}
            />
          </section>
        </main>
      )}
    </div>
  );
}

function AuthGate() {
  const { user, loading } = useAuth();
  const { t } = useI18n();
  if (loading) return <div className="app-loading">{t('app.loading')}</div>;
  if (!user) return <AuthScreen />;
  return <TrazoApp />;
}

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
