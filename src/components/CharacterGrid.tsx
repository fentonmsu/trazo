import type { CharacterTemplate } from '../types/character';
import type { CharacterProgress } from '../hooks/useProfile';
import { SpeakButton } from './SpeakButton';
import { HebrewGlyph } from './HebrewGlyph';
import { isHebrewScript, isRtl } from '../data/languages';

interface CharacterGridProps {
  characters: CharacterTemplate[];
  selectedId: string | null;
  progress: Record<string, CharacterProgress>;
  onSelect: (template: CharacterTemplate) => void;
}

function scoreClass(score: number | undefined) {
  if (score === undefined) return 'unattempted';
  if (score >= 85) return 'mastered';
  if (score >= 50) return 'learning';
  return 'struggling';
}

export function CharacterGrid({ characters, selectedId, progress, onSelect }: CharacterGridProps) {
  const dir = characters[0] && isRtl(characters[0].language) ? 'rtl' : 'ltr';

  return (
    <div className="character-grid" dir={dir}>
      {characters.map((c) => {
        const best = progress[c.id]?.bestScore;
        return (
          <div key={c.id} className={`character-tile ${scoreClass(best)} ${selectedId === c.id ? 'selected' : ''}`}>
            <button
              className="character-tile-main"
              onClick={() => onSelect(c)}
              title={c.meaning ? `${c.romanization} · ${c.meaning}` : c.romanization}
            >
              {isHebrewScript(c.language) ? (
                <HebrewGlyph char={c.char} className="glyph hebrew-glyph" />
              ) : (
                <span className={`glyph ${c.language === 'arabic' ? 'arabic-glyph' : ''}`}>{c.char}</span>
              )}
              <span className="romanization">{c.romanization}</span>
              {best !== undefined && <span className="best-score">{best}%</span>}
            </button>
            <SpeakButton template={c} className="tile-speak" />
          </div>
        );
      })}
    </div>
  );
}
