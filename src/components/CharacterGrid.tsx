import type { CharacterTemplate } from '../types/character';
import type { ProgressMap } from '../hooks/useProgress';
import { SpeakButton } from './SpeakButton';
import { HebrewGlyph } from './HebrewGlyph';
import { isHebrewScript } from '../data/languages';

interface CharacterGridProps {
  characters: CharacterTemplate[];
  selectedId: string | null;
  progress: ProgressMap;
  onSelect: (template: CharacterTemplate) => void;
}

function scoreClass(score: number | undefined) {
  if (score === undefined) return 'unattempted';
  if (score >= 85) return 'mastered';
  if (score >= 50) return 'learning';
  return 'struggling';
}

export function CharacterGrid({ characters, selectedId, progress, onSelect }: CharacterGridProps) {
  return (
    <div className="character-grid">
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
                <span className="glyph">{c.char}</span>
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
