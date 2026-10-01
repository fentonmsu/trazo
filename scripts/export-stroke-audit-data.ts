import { writeFileSync } from 'node:fs';
import { BASE_HEBREW_LETTERS } from '../src/data/hebrewLetters';
import { cyrillicCharacters } from '../src/data/cyrillic';
import { turkishCharacters } from '../src/data/turkish';
import { arabicCharacters } from '../src/data/arabic';
import { kanjiCharacters } from '../src/data/kanji';

interface AuditEntry {
  id: string;
  language: string;
  char: string;
  strokes: { x: number; y: number }[][];
  font: string;
}

const entries: AuditEntry[] = [
  ...BASE_HEBREW_LETTERS.map((l) => ({ id: l.id, language: 'hebrew', char: l.char, strokes: l.strokes, font: '"Noto Sans Hebrew", sans-serif' })),
  ...cyrillicCharacters.map((c) => ({ id: c.id, language: 'cyrillic', char: c.char, strokes: c.strokes, font: 'sans-serif' })),
  ...turkishCharacters.map((c) => ({ id: c.id, language: 'turkish', char: c.char, strokes: c.strokes, font: 'sans-serif' })),
  ...arabicCharacters.map((c) => ({ id: c.id, language: 'arabic', char: c.char, strokes: c.strokes, font: '"Noto Naskh Arabic", serif' })),
  ...kanjiCharacters.map((c) => ({ id: c.id, language: 'kanji', char: c.char, strokes: c.strokes, font: 'sans-serif' })),
];

const outPath = process.argv[2] ?? 'scripts/stroke-audit-entries.json';
writeFileSync(outPath, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`Wrote ${entries.length} entries to ${outPath}`);
