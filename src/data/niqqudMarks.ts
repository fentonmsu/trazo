import type { Stroke } from '../types/character';
import { fitStrokesToBox } from '../engine/geometry';

export interface NiqqudMark {
  id: string;
  codepoint: string;
  name: string;
  /** The vowel sound this mark represents, used to build syllable romanizations. */
  vowelSound: string;
  meaning: string;
  difficulty: number;
  /** Large shape used when practicing the mark on its own (dotted-circle tab). */
  standaloneStrokes: Stroke[];
}

const dotSize = 3;
function dot(cx: number, cy: number): Stroke {
  return [
    { x: cx - dotSize, y: cy - dotSize },
    { x: cx + dotSize, y: cy + dotSize },
  ];
}

export const NIQQUD_MARKS: NiqqudMark[] = [
  {
    id: 'qamats',
    codepoint: 'ָ',
    name: 'kamatz',
    vowelSound: 'a',
    meaning: 'vocal larga "a" (kamatz)',
    difficulty: 1,
    standaloneStrokes: [
      [
        { x: 25, y: 40 },
        { x: 75, y: 40 },
        { x: 50, y: 40 },
        { x: 50, y: 75 },
      ],
    ],
  },
  {
    id: 'patach',
    codepoint: 'ַ',
    name: 'patach',
    vowelSound: 'a',
    meaning: 'vocal corta "a" (patach)',
    difficulty: 1,
    standaloneStrokes: [
      [
        { x: 25, y: 50 },
        { x: 75, y: 50 },
      ],
    ],
  },
  {
    id: 'tzere',
    codepoint: 'ֵ',
    name: 'tzere',
    vowelSound: 'e',
    meaning: 'vocal larga "e" (tzere)',
    difficulty: 1,
    standaloneStrokes: [dot(35, 50), dot(65, 50)],
  },
  {
    id: 'segol',
    codepoint: 'ֶ',
    name: 'segol',
    vowelSound: 'e',
    meaning: 'vocal corta "e" (segol)',
    difficulty: 2,
    standaloneStrokes: [dot(35, 40), dot(65, 40), dot(50, 62)],
  },
  {
    id: 'hiriq',
    codepoint: 'ִ',
    name: 'hiriq',
    vowelSound: 'i',
    meaning: 'vocal "i" (hiriq)',
    difficulty: 1,
    standaloneStrokes: [dot(50, 50)],
  },
  {
    id: 'holam',
    codepoint: 'ֹ',
    name: 'holam',
    vowelSound: 'o',
    meaning: 'vocal "o" (holam)',
    difficulty: 1,
    standaloneStrokes: [dot(65, 30)],
  },
  {
    id: 'kubutz',
    codepoint: 'ֻ',
    name: 'kubutz',
    vowelSound: 'u',
    meaning: 'vocal "u" (kubutz)',
    difficulty: 2,
    standaloneStrokes: [dot(65, 40), dot(52, 52), dot(39, 64)],
  },
  {
    id: 'shva',
    codepoint: 'ְ',
    name: 'shva',
    vowelSound: 'e',
    meaning: 'vocal muy breve o muda (shva)',
    difficulty: 1,
    standaloneStrokes: [dot(50, 40), dot(50, 60)],
  },
];

const ATTACHED_BOX = { minX: 37, maxX: 63, minY: 96, maxY: 113 };

/** Small version of a mark's shape, positioned to sit below a letter's baseline. */
export function attachedMarkStrokes(mark: NiqqudMark): Stroke[] {
  return fitStrokesToBox(mark.standaloneStrokes, ATTACHED_BOX);
}
