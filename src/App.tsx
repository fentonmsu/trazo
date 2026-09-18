import { useEffect, useMemo, useState } from 'react';
import type { CharacterTemplate, LanguageId } from './types/character';
import { LANGUAGES, LANGUAGE_ORDER } from './data/languages';
import { getCharactersForLanguage } from './data';
import { CharacterGrid } from './components/CharacterGrid';
import { TrainerView } from './components/TrainerView';
import { useProgress } from './hooks/useProgress';
import './App.css';

type Mode = 'practice' | 'recognize';

function App() {
  const [language, setLanguage] = useState<LanguageId>('kana');
  const [mode, setMode] = useState<Mode>('practice');
  const [selected, setSelected] = useState<CharacterTemplate | null>(null);
  const { progress, recordScore } = useProgress();

  const characters = useMemo(() => getCharactersForLanguage(language), [language]);

  useEffect(() => {
    setSelected(characters[0] ?? null);
  }, [characters]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Trazo</h1>
        <p className="subtitle">Aprende a escribir kana, kanji, cirílico, hebreo y árabe dibujando a mano</p>
      </header>

      <nav className="language-tabs">
        {LANGUAGE_ORDER.map((id) => (
          <button
            key={id}
            className={language === id ? 'active' : ''}
            onClick={() => setLanguage(id)}
          >
            {LANGUAGES[id].name}
          </button>
        ))}
      </nav>

      <nav className="mode-tabs">
        <button className={mode === 'practice' ? 'active' : ''} onClick={() => setMode('practice')}>
          Practicar
        </button>
        <button className={mode === 'recognize' ? 'active' : ''} onClick={() => setMode('recognize')}>
          Reconocer
        </button>
      </nav>

      <main className="app-main">
        <aside className="sidebar">
          {characters.length === 0 ? (
            <p className="hint">Todavía no hay caracteres cargados para este idioma.</p>
          ) : (
            <CharacterGrid
              characters={characters}
              selectedId={selected?.id ?? null}
              progress={progress}
              onSelect={setSelected}
            />
          )}
        </aside>

        <section className="trainer-panel">
          <TrainerView
            mode={mode}
            target={mode === 'practice' ? selected : null}
            candidates={characters}
            onScored={recordScore}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
