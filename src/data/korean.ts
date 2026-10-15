import type { CharacterTemplate } from '../types/character';

/**
 * The 24 basic Hangul jamo (14 consonants + 10 vowels) - the Korean
 * "alphabet" letters, analogous to how cyrillic.ts/turkish.ts cover their
 * alphabets (as opposed to kana.ts, which covers full CV syllables).
 *
 * Hangul letters were deliberately designed as simple geometric shapes
 * (Hunminjeongeum, 1443), so these strokes are close to the real letterforms
 * without needing the glyph-overlay tracing used for some other scripts.
 *
 * `romanization` is the Revised Romanization reading. Consonants have their
 * own real two-syllable Korean names (used when reciting the alphabet, e.g.
 * ㄱ = "giyeok"), set via `speechOverride` so TTS reads the correct word
 * instead of trying to pronounce an isolated consonant. Vowels are
 * pronounced as their own sound, but an isolated vowel jamo doesn't render
 * reliably in a syllable block, so `speechOverride` pairs each with the
 * silent placeholder ㅇ (the same convention Koreans use when naming a
 * vowel in isolation, e.g. ㅏ is called "아").
 *
 * Coordinates are on a normalized 0-100 grid (origin top-left, y grows
 * downward), matching the other data files' convention.
 */
const RAW_KOREAN_LETTERS: CharacterTemplate[] = [
  // --- Consonants (자음) ---
  {
    id: 'korean-giyeok',
    char: 'ㄱ',
    romanization: 'giyeok',
    language: 'korean',
    difficulty: 1,
    strokes: [[{ x: 25, y: 20 }, { x: 75, y: 20 }, { x: 30, y: 80 }]],
  },
  {
    id: 'korean-nieun',
    char: 'ㄴ',
    romanization: 'nieun',
    language: 'korean',
    difficulty: 1,
    strokes: [[{ x: 25, y: 15 }, { x: 25, y: 80 }, { x: 75, y: 80 }]],
  },
  {
    id: 'korean-digeut',
    char: 'ㄷ',
    romanization: 'digeut',
    language: 'korean',
    difficulty: 2,
    strokes: [[{ x: 75, y: 15 }, { x: 25, y: 15 }, { x: 25, y: 80 }, { x: 75, y: 80 }]],
  },
  {
    id: 'korean-rieul',
    char: 'ㄹ',
    romanization: 'rieul',
    language: 'korean',
    difficulty: 3,
    strokes: [
      [{ x: 25, y: 12 }, { x: 72, y: 12 }, { x: 25, y: 38 }],
      [{ x: 25, y: 38 }, { x: 72, y: 38 }, { x: 25, y: 62 }],
      [{ x: 25, y: 62 }, { x: 72, y: 62 }, { x: 72, y: 85 }, { x: 25, y: 85 }],
    ],
  },
  {
    id: 'korean-mieum',
    char: 'ㅁ',
    romanization: 'mieum',
    language: 'korean',
    difficulty: 2,
    strokes: [[{ x: 25, y: 15 }, { x: 75, y: 15 }, { x: 75, y: 85 }, { x: 25, y: 85 }, { x: 25, y: 15 }]],
  },
  {
    id: 'korean-bieup',
    char: 'ㅂ',
    romanization: 'bieup',
    language: 'korean',
    difficulty: 3,
    strokes: [
      [{ x: 30, y: 15 }, { x: 30, y: 85 }],
      [{ x: 70, y: 15 }, { x: 70, y: 85 }],
      [{ x: 30, y: 15 }, { x: 70, y: 15 }],
      [{ x: 30, y: 50 }, { x: 70, y: 50 }],
    ],
  },
  {
    id: 'korean-siot',
    char: 'ㅅ',
    romanization: 'siot',
    language: 'korean',
    difficulty: 1,
    strokes: [[{ x: 20, y: 85 }, { x: 50, y: 15 }, { x: 80, y: 85 }]],
  },
  {
    id: 'korean-ieung',
    char: 'ㅇ',
    romanization: 'ieung',
    language: 'korean',
    difficulty: 2,
    strokes: [[
      { x: 50, y: 15 }, { x: 25, y: 25 }, { x: 18, y: 50 }, { x: 25, y: 75 },
      { x: 50, y: 85 }, { x: 75, y: 75 }, { x: 82, y: 50 }, { x: 75, y: 25 }, { x: 50, y: 15 },
    ]],
  },
  {
    id: 'korean-jieut',
    char: 'ㅈ',
    romanization: 'jieut',
    language: 'korean',
    difficulty: 2,
    strokes: [
      [{ x: 30, y: 15 }, { x: 70, y: 15 }],
      [{ x: 50, y: 15 }, { x: 22, y: 85 }],
      [{ x: 50, y: 35 }, { x: 78, y: 85 }],
    ],
  },
  {
    id: 'korean-chieut',
    char: 'ㅊ',
    romanization: 'chieut',
    language: 'korean',
    difficulty: 3,
    strokes: [
      [{ x: 40, y: 2 }, { x: 56, y: 8 }],
      [{ x: 30, y: 20 }, { x: 70, y: 20 }],
      [{ x: 50, y: 20 }, { x: 22, y: 85 }],
      [{ x: 50, y: 38 }, { x: 78, y: 85 }],
    ],
  },
  {
    id: 'korean-kieuk',
    char: 'ㅋ',
    romanization: 'kieuk',
    language: 'korean',
    difficulty: 2,
    strokes: [
      [{ x: 25, y: 20 }, { x: 75, y: 20 }, { x: 30, y: 80 }],
      [{ x: 40, y: 45 }, { x: 65, y: 45 }],
    ],
  },
  {
    id: 'korean-tieut',
    char: 'ㅌ',
    romanization: 'tieut',
    language: 'korean',
    difficulty: 2,
    strokes: [
      [{ x: 75, y: 15 }, { x: 25, y: 15 }, { x: 25, y: 80 }, { x: 75, y: 80 }],
      [{ x: 25, y: 48 }, { x: 65, y: 48 }],
    ],
  },
  {
    id: 'korean-pieup',
    char: 'ㅍ',
    romanization: 'pieup',
    language: 'korean',
    difficulty: 3,
    strokes: [
      [{ x: 20, y: 20 }, { x: 80, y: 20 }],
      [{ x: 30, y: 20 }, { x: 30, y: 80 }],
      [{ x: 70, y: 20 }, { x: 70, y: 80 }],
      [{ x: 20, y: 85 }, { x: 80, y: 85 }],
    ],
  },
  {
    id: 'korean-hieut',
    char: 'ㅎ',
    romanization: 'hieut',
    language: 'korean',
    difficulty: 3,
    strokes: [
      [{ x: 42, y: 8 }, { x: 58, y: 4 }],
      [{ x: 25, y: 25 }, { x: 75, y: 25 }],
      [
        { x: 50, y: 40 }, { x: 30, y: 48 }, { x: 25, y: 63 }, { x: 35, y: 80 },
        { x: 50, y: 85 }, { x: 65, y: 80 }, { x: 75, y: 63 }, { x: 70, y: 48 }, { x: 50, y: 40 },
      ],
    ],
  },
  // --- Vowels (모음) ---
  {
    id: 'korean-a',
    char: 'ㅏ',
    romanization: 'a',
    language: 'korean',
    difficulty: 1,
    speechOverride: '아',
    strokes: [
      [{ x: 35, y: 10 }, { x: 35, y: 90 }],
      [{ x: 35, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  {
    id: 'korean-ya',
    char: 'ㅑ',
    romanization: 'ya',
    language: 'korean',
    difficulty: 2,
    speechOverride: '야',
    strokes: [
      [{ x: 35, y: 10 }, { x: 35, y: 90 }],
      [{ x: 35, y: 35 }, { x: 60, y: 35 }],
      [{ x: 35, y: 65 }, { x: 60, y: 65 }],
    ],
  },
  {
    id: 'korean-eo',
    char: 'ㅓ',
    romanization: 'eo',
    language: 'korean',
    difficulty: 1,
    speechOverride: '어',
    strokes: [
      [{ x: 65, y: 10 }, { x: 65, y: 90 }],
      [{ x: 35, y: 50 }, { x: 65, y: 50 }],
    ],
  },
  {
    id: 'korean-yeo',
    char: 'ㅕ',
    romanization: 'yeo',
    language: 'korean',
    difficulty: 2,
    speechOverride: '여',
    strokes: [
      [{ x: 65, y: 10 }, { x: 65, y: 90 }],
      [{ x: 40, y: 35 }, { x: 65, y: 35 }],
      [{ x: 40, y: 65 }, { x: 65, y: 65 }],
    ],
  },
  {
    id: 'korean-o',
    char: 'ㅗ',
    romanization: 'o',
    language: 'korean',
    difficulty: 1,
    speechOverride: '오',
    strokes: [
      [{ x: 10, y: 65 }, { x: 90, y: 65 }],
      [{ x: 50, y: 65 }, { x: 50, y: 35 }],
    ],
  },
  {
    id: 'korean-yo',
    char: 'ㅛ',
    romanization: 'yo',
    language: 'korean',
    difficulty: 2,
    speechOverride: '요',
    strokes: [
      [{ x: 10, y: 70 }, { x: 90, y: 70 }],
      [{ x: 35, y: 70 }, { x: 35, y: 40 }],
      [{ x: 65, y: 70 }, { x: 65, y: 40 }],
    ],
  },
  {
    id: 'korean-u',
    char: 'ㅜ',
    romanization: 'u',
    language: 'korean',
    difficulty: 1,
    speechOverride: '우',
    strokes: [
      [{ x: 10, y: 35 }, { x: 90, y: 35 }],
      [{ x: 50, y: 35 }, { x: 50, y: 65 }],
    ],
  },
  {
    id: 'korean-yu',
    char: 'ㅠ',
    romanization: 'yu',
    language: 'korean',
    difficulty: 2,
    speechOverride: '유',
    strokes: [
      [{ x: 10, y: 30 }, { x: 90, y: 30 }],
      [{ x: 35, y: 30 }, { x: 35, y: 60 }],
      [{ x: 65, y: 30 }, { x: 65, y: 60 }],
    ],
  },
  {
    id: 'korean-eu',
    char: 'ㅡ',
    romanization: 'eu',
    language: 'korean',
    difficulty: 1,
    speechOverride: '으',
    strokes: [[{ x: 10, y: 50 }, { x: 90, y: 50 }]],
  },
  {
    id: 'korean-i',
    char: 'ㅣ',
    romanization: 'i',
    language: 'korean',
    difficulty: 1,
    speechOverride: '이',
    strokes: [[{ x: 50, y: 10 }, { x: 50, y: 90 }]],
  },
];

// Consonant names (giyeok, nieun, ...) are the real letter names used when
// reciting the alphabet; set as the speech text so TTS doesn't try to
// pronounce an isolated, unvoiced consonant jamo.
const CONSONANT_NAMES: Record<string, string> = {
  'korean-giyeok': '기역',
  'korean-nieun': '니은',
  'korean-digeut': '디귿',
  'korean-rieul': '리을',
  'korean-mieum': '미음',
  'korean-bieup': '비읍',
  'korean-siot': '시옷',
  'korean-ieung': '이응',
  'korean-jieut': '지읒',
  'korean-chieut': '치읓',
  'korean-kieuk': '키읔',
  'korean-tieut': '티읕',
  'korean-pieup': '피읖',
  'korean-hieut': '히읗',
};

export const koreanCharacters: CharacterTemplate[] = RAW_KOREAN_LETTERS.map((letter) => ({
  ...letter,
  speechOverride: letter.speechOverride ?? CONSONANT_NAMES[letter.id],
}));
