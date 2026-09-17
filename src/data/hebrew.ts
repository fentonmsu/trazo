import type { CharacterTemplate } from '../types/character';

/**
 * Hand-authored stroke data for the 22 letters of the Hebrew alphabet,
 * standalone (non-final) print/block forms only.
 *
 * Coordinates are on a normalized 0-100 grid (origin top-left, y grows
 * downward, matching canvas coordinates). The recognizer re-normalizes the
 * whole character's bounding box at runtime, so only relative proportions,
 * topology, and stroke direction matter here - not absolute scale.
 */
export const hebrewCharacters: CharacterTemplate[] = [
  // א alef - 3 disconnected strokes: diagonal spine + two arms.
  {
    id: 'hebrew-alef',
    language: 'hebrew',
    char: 'א',
    romanization: 'alef',
    strokes: [
      // Spine: top-right to bottom-left diagonal.
      [
        { x: 72, y: 24 },
        { x: 50, y: 50 },
        { x: 30, y: 76 },
      ],
      // Upper-right arm.
      [
        { x: 88, y: 18 },
        { x: 72, y: 28 },
        { x: 58, y: 38 },
      ],
      // Lower-left arm.
      [
        { x: 44, y: 62 },
        { x: 30, y: 74 },
        { x: 14, y: 86 },
      ],
    ],
    difficulty: 5,
  },

  // ב bet - single stroke, top bar, right side, bottom bar with small left foot.
  {
    id: 'hebrew-bet',
    language: 'hebrew',
    char: 'ב',
    romanization: 'bet',
    strokes: [
      [
        { x: 25, y: 20 },
        { x: 80, y: 20 },
        { x: 80, y: 80 },
        { x: 15, y: 80 },
      ],
    ],
    difficulty: 2,
  },

  // ג gimel - vertical spine + diagonal leg kicking down-left.
  {
    id: 'hebrew-gimel',
    language: 'hebrew',
    char: 'ג',
    romanization: 'gimel',
    strokes: [
      [
        { x: 62, y: 20 },
        { x: 62, y: 50 },
      ],
      [
        { x: 60, y: 45 },
        { x: 45, y: 62 },
        { x: 30, y: 80 },
      ],
    ],
    difficulty: 2,
  },

  // ד dalet - top bar with small serif kick, then vertical down the right.
  {
    id: 'hebrew-dalet',
    language: 'hebrew',
    char: 'ד',
    romanization: 'dalet',
    strokes: [
      [
        { x: 25, y: 20 },
        { x: 75, y: 20 },
        { x: 82, y: 14 },
      ],
      [
        { x: 75, y: 20 },
        { x: 75, y: 80 },
      ],
    ],
    difficulty: 2,
  },

  // ה he - top bar + right leg as one stroke, then a separate short left leg.
  {
    id: 'hebrew-he',
    language: 'hebrew',
    char: 'ה',
    romanization: 'he',
    strokes: [
      [
        { x: 20, y: 20 },
        { x: 80, y: 20 },
        { x: 80, y: 80 },
      ],
      [
        { x: 22, y: 30 },
        { x: 22, y: 80 },
      ],
    ],
    difficulty: 2,
  },

  // ו vav - single vertical stroke with a slight hooked head.
  {
    id: 'hebrew-vav',
    language: 'hebrew',
    char: 'ו',
    romanization: 'vav',
    strokes: [
      [
        { x: 55, y: 15 },
        { x: 48, y: 22 },
        { x: 50, y: 50 },
        { x: 50, y: 80 },
      ],
    ],
    difficulty: 1,
  },

  // ז zayin - horizontal top serif then a vertical stroke down.
  {
    id: 'hebrew-zayin',
    language: 'hebrew',
    char: 'ז',
    romanization: 'zayin',
    strokes: [
      [
        { x: 35, y: 20 },
        { x: 65, y: 20 },
        { x: 58, y: 45 },
        { x: 50, y: 80 },
      ],
    ],
    difficulty: 1,
  },

  // ח het - left leg, then top bar + right leg connecting over it.
  {
    id: 'hebrew-het',
    language: 'hebrew',
    char: 'ח',
    romanization: 'het',
    strokes: [
      [
        { x: 25, y: 22 },
        { x: 25, y: 80 },
      ],
      [
        { x: 22, y: 20 },
        { x: 78, y: 20 },
        { x: 78, y: 80 },
      ],
    ],
    difficulty: 2,
  },

  // ט tet - rounded bowl, then a separate curling stroke over the top-right.
  {
    id: 'hebrew-tet',
    language: 'hebrew',
    char: 'ט',
    romanization: 'tet',
    strokes: [
      [
        { x: 28, y: 25 },
        { x: 25, y: 50 },
        { x: 28, y: 70 },
        { x: 45, y: 80 },
        { x: 62, y: 75 },
        { x: 70, y: 60 },
        { x: 70, y: 42 },
      ],
      [
        { x: 72, y: 35 },
        { x: 65, y: 22 },
        { x: 50, y: 20 },
        { x: 42, y: 26 },
      ],
    ],
    difficulty: 3,
  },

  // י yod - a single small hook, sitting high in the box.
  {
    id: 'hebrew-yod',
    language: 'hebrew',
    char: 'י',
    romanization: 'yod',
    strokes: [
      [
        { x: 58, y: 22 },
        { x: 50, y: 30 },
        { x: 45, y: 42 },
      ],
    ],
    difficulty: 1,
  },

  // כ kaf - single rounded stroke, open on the left, like a mirrored C.
  {
    id: 'hebrew-kaf',
    language: 'hebrew',
    char: 'כ',
    romanization: 'kaf',
    strokes: [
      [
        { x: 30, y: 25 },
        { x: 55, y: 20 },
        { x: 75, y: 30 },
        { x: 80, y: 50 },
        { x: 72, y: 68 },
        { x: 50, y: 78 },
        { x: 28, y: 75 },
      ],
    ],
    difficulty: 2,
  },

  // ל lamed - tall single stroke: ascender down into a small hooked base.
  {
    id: 'hebrew-lamed',
    language: 'hebrew',
    char: 'ל',
    romanization: 'lamed',
    strokes: [
      [
        { x: 62, y: 5 },
        { x: 50, y: 35 },
        { x: 40, y: 60 },
        { x: 50, y: 75 },
        { x: 35, y: 80 },
        { x: 25, y: 70 },
      ],
    ],
    difficulty: 1,
  },

  // מ mem - main body (open bottom-left), then a short closing stroke leaving a small notch.
  {
    id: 'hebrew-mem',
    language: 'hebrew',
    char: 'מ',
    romanization: 'mem',
    strokes: [
      [
        { x: 25, y: 22 },
        { x: 75, y: 20 },
        { x: 75, y: 80 },
        { x: 32, y: 80 },
      ],
      [
        { x: 25, y: 22 },
        { x: 25, y: 72 },
        { x: 30, y: 78 },
      ],
    ],
    difficulty: 3,
  },

  // נ nun - single vertical stroke curling left at the bottom.
  {
    id: 'hebrew-nun',
    language: 'hebrew',
    char: 'נ',
    romanization: 'nun',
    strokes: [
      [
        { x: 55, y: 20 },
        { x: 52, y: 60 },
        { x: 45, y: 75 },
        { x: 30, y: 78 },
      ],
    ],
    difficulty: 1,
  },

  // ס samekh - single continuous closed loop.
  {
    id: 'hebrew-samekh',
    language: 'hebrew',
    char: 'ס',
    romanization: 'samekh',
    strokes: [
      [
        { x: 50, y: 20 },
        { x: 30, y: 28 },
        { x: 22, y: 50 },
        { x: 30, y: 72 },
        { x: 50, y: 80 },
        { x: 70, y: 72 },
        { x: 78, y: 50 },
        { x: 70, y: 28 },
        { x: 50, y: 20 },
      ],
    ],
    difficulty: 2,
  },

  // ע ayin - two diagonal arms meeting near center, right arm continuing as a longer tail.
  {
    id: 'hebrew-ayin',
    language: 'hebrew',
    char: 'ע',
    romanization: 'ayin',
    strokes: [
      [
        { x: 70, y: 22 },
        { x: 60, y: 40 },
        { x: 50, y: 58 },
        { x: 35, y: 78 },
      ],
      [
        { x: 35, y: 25 },
        { x: 42, y: 45 },
        { x: 48, y: 60 },
      ],
    ],
    difficulty: 4,
  },

  // פ pe - rounded bowl (like kaf) plus a small inner stroke.
  {
    id: 'hebrew-pe',
    language: 'hebrew',
    char: 'פ',
    romanization: 'pe',
    strokes: [
      [
        { x: 30, y: 25 },
        { x: 55, y: 20 },
        { x: 75, y: 30 },
        { x: 80, y: 50 },
        { x: 72, y: 68 },
        { x: 50, y: 78 },
        { x: 28, y: 75 },
      ],
      [
        { x: 62, y: 35 },
        { x: 65, y: 50 },
        { x: 60, y: 62 },
      ],
    ],
    difficulty: 3,
  },

  // צ tsadi - nun-like body plus a diagonal arm/flag attached near the top.
  {
    id: 'hebrew-tsadi',
    language: 'hebrew',
    char: 'צ',
    romanization: 'tsadi',
    strokes: [
      [
        { x: 45, y: 25 },
        { x: 42, y: 55 },
        { x: 38, y: 72 },
        { x: 25, y: 80 },
      ],
      [
        { x: 48, y: 45 },
        { x: 60, y: 30 },
        { x: 72, y: 20 },
      ],
    ],
    difficulty: 4,
  },

  // ק qof - rounded head, then a long leg descending below the baseline.
  {
    id: 'hebrew-qof',
    language: 'hebrew',
    char: 'ק',
    romanization: 'qof',
    strokes: [
      [
        { x: 30, y: 30 },
        { x: 35, y: 20 },
        { x: 55, y: 18 },
        { x: 68, y: 25 },
        { x: 70, y: 38 },
      ],
      [
        { x: 70, y: 25 },
        { x: 68, y: 55 },
        { x: 65, y: 95 },
      ],
    ],
    difficulty: 3,
  },

  // ר resh - single curved hook: top-left, over the top, down the right side.
  {
    id: 'hebrew-resh',
    language: 'hebrew',
    char: 'ר',
    romanization: 'resh',
    strokes: [
      [
        { x: 30, y: 22 },
        { x: 55, y: 18 },
        { x: 72, y: 25 },
        { x: 70, y: 50 },
        { x: 65, y: 80 },
      ],
    ],
    difficulty: 1,
  },

  // ש shin - three prongs drawn right to left, converging toward a shared base.
  {
    id: 'hebrew-shin',
    language: 'hebrew',
    char: 'ש',
    romanization: 'shin',
    strokes: [
      [
        { x: 78, y: 20 },
        { x: 70, y: 45 },
        { x: 68, y: 70 },
      ],
      [
        { x: 52, y: 25 },
        { x: 50, y: 45 },
        { x: 50, y: 70 },
      ],
      [
        { x: 30, y: 20 },
        { x: 35, y: 45 },
        { x: 45, y: 68 },
      ],
    ],
    difficulty: 5,
  },

  // ת tav - left leg, then top bar + right leg ending in a small hooked foot.
  {
    id: 'hebrew-tav',
    language: 'hebrew',
    char: 'ת',
    romanization: 'tav',
    strokes: [
      [
        { x: 25, y: 22 },
        { x: 25, y: 80 },
      ],
      [
        { x: 22, y: 20 },
        { x: 78, y: 20 },
        { x: 78, y: 72 },
        { x: 68, y: 80 },
      ],
    ],
    difficulty: 3,
  },
];
