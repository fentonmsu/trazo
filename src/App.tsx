import { useEffect, useMemo, useState } from 'react';
import type { CharacterTemplate, LanguageId } from './types/character';
import { LANGUAGES, LANGUAGE_ORDER } from './data/languages';
import { getCharactersForLanguage } from './data';
import { getLessonsForLanguage, LESSON_LANGUAGES, type Lesson } from './data/lessons';
import { CharacterGrid } from './components/CharacterGrid';
import { TrainerView } from './components/TrainerView';
import { AuthScreen } from './components/AuthScreen';
import { UserStatusBar } from './components/UserStatusBar';
import { LessonMap } from './components/lesson/LessonMap';
import { LessonRunner } from './components/lesson/LessonRunner';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';
import './App.css';

type Mode = 'practice' | 'recognize' | 'lesson';

function TrazoApp() {
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
        {profile && <UserStatusBar streak={profile.streak} xp={profile.xp} hearts={profile.hearts} />}
        <h1>Trazo</h1>
        <p className="subtitle">
          Aprende a escribir kana, kanji, cirílico, hebreo, árabe, chino y turco dibujando a mano
        </p>
      </header>

      <nav className="language-tabs">
        {LANGUAGE_ORDER.map((id) => (
          <button key={id} className={language === id ? 'active' : ''} onClick={() => setLanguage(id)}>
            {LANGUAGES[id].name}
          </button>
        ))}
      </nav>

      <nav className="mode-tabs">
        <button className={mode === 'lesson' ? 'active' : ''} onClick={() => setMode('lesson')}>
          Lección
        </button>
        <button className={mode === 'practice' ? 'active' : ''} onClick={() => setMode('practice')}>
          Practicar
        </button>
        <button className={mode === 'recognize' ? 'active' : ''} onClick={() => setMode('recognize')}>
          Reconocer
        </button>
      </nav>

      {mode === 'lesson' ? (
        <main className="app-main lesson-main">
          {lessons.length === 0 ? (
            <p className="hint">Este idioma todavía no tiene lecciones estructuradas — probá "Practicar" o "Reconocer".</p>
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
              <p className="hint">Todavía no hay caracteres cargados para este idioma.</p>
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
  if (loading) return <div className="app-loading">Cargando…</div>;
  if (!user) return <AuthScreen />;
  return <TrazoApp />;
}

function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}

export default App;
