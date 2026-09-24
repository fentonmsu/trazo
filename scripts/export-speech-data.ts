import { writeFileSync } from 'node:fs';
import { CHARACTERS_BY_LANGUAGE } from '../src/data/index';

interface SpeechEntry {
  id: string;
  language: string;
  text: string;
}

const entries: SpeechEntry[] = [];

for (const characters of Object.values(CHARACTERS_BY_LANGUAGE)) {
  for (const c of characters) {
    entries.push({ id: c.id, language: c.language, text: c.speechOverride ?? c.char });
  }
}

const outPath = process.argv[2] ?? 'scripts/speech-entries.json';
writeFileSync(outPath, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`Wrote ${entries.length} entries to ${outPath}`);
