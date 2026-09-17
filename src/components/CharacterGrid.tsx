import type { CharacterTemplate } from '../types/character';
import type { ProgressMap } from '../hooks/useProgress';

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
          <button
            key={c.id}
            className={`character-tile ${scoreClass(best)} ${selectedId === c.id ? 'selected' : ''}`}
            onClick={() => onSelect(c)}
            title={c.meaning ? `${c.romanization} · ${c.meaning}` : c.romanization}
          >
            <span className="glyph">{c.char}</span>
            <span className="romanization">{c.romanization}</span>
            {best !== undefined && <span className="best-score">{best}%</span>}
          </button>
        );
      })}
    </div>
  );
}
