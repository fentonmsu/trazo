import type { CharacterTemplate, Stroke } from '../types/character';

/**
 * Positional forms of the Arabic letters: most letters take a different
 * shape depending on whether they start a word (initial), sit in the
 * middle (medial), or end it (final), joined to their neighbors - the
 * same "changes shape depending on context" idea as Hebrew cursive, but
 * driven by connection rather than handwriting style. isolated forms
 * already live in arabic.ts; this file adds the other ~3 shapes per
 * connecting letter.
 *
 * `char` renders each form with a zero-width joiner (U+200D) on the
 * joining side(s) - e.g. 'ب‍' for initial, '‍ب‍' for medial,
 * '‍ب' for final - which forces the Arabic text shaper to pick the
 * contextual glyph without needing a neighboring real letter. Verified
 * against Noto Naskh Arabic: this renders the correct distinct shape for
 * every position, including letters with no obvious visual relationship
 * to their isolated form (ain, ha, kaf...).
 *
 * Six letters (alif, dal, dhal, ra, zay, waw) never connect to a
 * following letter, so they have no initial/medial shape at all - only a
 * "final" form (when something connects into them from the right),
 * visually close to or identical to their isolated shape. taa/zaa keep
 * the exact same shape in every position (confirmed by rendering all
 * three forms and comparing), so they just reuse their isolated strokes
 * from arabic.ts instead of being re-traced here.
 */

const dotSize = 3;
function dot(cx: number, cy: number): Stroke {
  return [
    { x: cx - dotSize, y: cy - dotSize },
    { x: cx + dotSize, y: cy + dotSize },
  ];
}

const ZWJ = '‍';

// --- Shared connected-form shapes (initial/medial look the same across a
// dot-family; only the dots differ) ---

// ba/ta/tha initial: open hook, connects to the left.
const HOOK_BA_INITIAL: Stroke = [
  { x: 68, y: 23 },
  { x: 54, y: 22 },
  { x: 42, y: 28 },
  { x: 37, y: 36 },
  { x: 44, y: 39 },
  { x: 58, y: 35 },
];
// ba/ta/tha medial: same hook, with a connecting entry nub from the right.
const HOOK_BA_MEDIAL: Stroke = [
  { x: 74, y: 25 },
  { x: 66, y: 26 },
  { x: 55, y: 28 },
  { x: 42, y: 34 },
  { x: 36, y: 40 },
];
// ba/ta/tha final: the isolated bowl, plus a lead-in connector from the right.
const BOWL_BA_FINAL: Stroke = [
  { x: 88, y: 22 },
  { x: 80, y: 32 },
  { x: 78, y: 40 },
  { x: 65, y: 55 },
  { x: 50, y: 60 },
  { x: 35, y: 55 },
  { x: 22, y: 40 },
];

// jeem/haa/khaa initial: shallow over-curve with a small downturned hook.
const HOOK_JEEM_INITIAL: Stroke = [
  { x: 78, y: 28 },
  { x: 62, y: 24 },
  { x: 48, y: 28 },
  { x: 36, y: 25 },
  { x: 30, y: 30 },
  { x: 33, y: 36 },
];
const HOOK_JEEM_MEDIAL: Stroke = [
  { x: 85, y: 26 },
  { x: 70, y: 22 },
  { x: 55, y: 27 },
  { x: 42, y: 24 },
  { x: 33, y: 28 },
  { x: 30, y: 35 },
];
const HOOK_JEEM_FINAL: Stroke = [
  { x: 85, y: 24 },
  { x: 72, y: 30 },
  { x: 50, y: 35 },
  { x: 33, y: 46 },
  { x: 30, y: 60 },
  { x: 40, y: 72 },
  { x: 55, y: 72 },
  { x: 62, y: 62 },
];

// seen/sheen initial+medial: the three-tooth row sitting on the baseline.
const TEETH_SEEN_CONNECTED: Stroke = [
  { x: 80, y: 42 },
  { x: 72, y: 36 },
  { x: 65, y: 44 },
  { x: 56, y: 36 },
  { x: 48, y: 44 },
  { x: 40, y: 36 },
  { x: 32, y: 42 },
];
const TEETH_SEEN_FINAL: Stroke = [
  { x: 80, y: 30 },
  { x: 70, y: 25 },
  { x: 62, y: 32 },
  { x: 53, y: 25 },
  { x: 45, y: 32 },
  { x: 37, y: 25 },
  { x: 30, y: 32 },
  { x: 35, y: 45 },
  { x: 50, y: 52 },
  { x: 62, y: 48 },
];

// sad/dad initial+medial: loop on the right with a flat tail to the left.
const LOOP_SAD_CONNECTED: Stroke = [
  { x: 75, y: 35 },
  { x: 65, y: 28 },
  { x: 55, y: 32 },
  { x: 58, y: 40 },
  { x: 68, y: 42 },
  { x: 50, y: 42 },
  { x: 35, y: 43 },
  { x: 25, y: 42 },
];
const LOOP_SAD_FINAL: Stroke = [
  { x: 72, y: 32 },
  { x: 60, y: 24 },
  { x: 50, y: 30 },
  { x: 50, y: 42 },
  { x: 62, y: 46 },
  { x: 48, y: 48 },
  { x: 35, y: 50 },
  { x: 28, y: 42 },
  { x: 32, y: 34 },
];

// ain/ghain initial+medial+final.
const HOOK_AIN_INITIAL: Stroke = [
  { x: 70, y: 20 },
  { x: 55, y: 18 },
  { x: 42, y: 24 },
  { x: 33, y: 30 },
  { x: 38, y: 36 },
];
const HOOK_AIN_MEDIAL: Stroke = [
  { x: 75, y: 22 },
  { x: 60, y: 18 },
  { x: 48, y: 24 },
  { x: 55, y: 30 },
  { x: 40, y: 28 },
  { x: 32, y: 34 },
  { x: 38, y: 40 },
];
const HOOK_AIN_FINAL: Stroke = [
  { x: 78, y: 18 },
  { x: 62, y: 20 },
  { x: 48, y: 26 },
  { x: 36, y: 32 },
  { x: 30, y: 45 },
  { x: 38, y: 56 },
  { x: 52, y: 60 },
  { x: 63, y: 52 },
];

// fa/qaf initial+medial: small loop with a flat connecting tail.
const LOOP_FA_CONNECTED: Stroke = [
  { x: 63, y: 26 },
  { x: 52, y: 20 },
  { x: 43, y: 26 },
  { x: 42, y: 36 },
  { x: 54, y: 38 },
  { x: 40, y: 40 },
  { x: 28, y: 40 },
];

// kaf initial+medial: distinctive S/Z zigzag.
const ZIGZAG_KAF_CONNECTED: Stroke = [
  { x: 72, y: 20 },
  { x: 42, y: 22 },
  { x: 33, y: 34 },
  { x: 50, y: 40 },
  { x: 68, y: 52 },
];
const KAF_FINAL_HOOK: Stroke = [
  { x: 35, y: 15 },
  { x: 35, y: 70 },
  { x: 55, y: 70 },
];
const KAF_FINAL_TOP: Stroke = [
  { x: 35, y: 20 },
  { x: 50, y: 30 },
];
const KAF_FINAL_INNER: Stroke = [
  { x: 42, y: 45 },
  { x: 48, y: 50 },
  { x: 42, y: 55 },
];

// meem initial+medial: small closed loop with a flat opening tail.
const LOOP_MEEM_CONNECTED: Stroke = [
  { x: 60, y: 22 },
  { x: 48, y: 16 },
  { x: 38, y: 22 },
  { x: 38, y: 32 },
  { x: 50, y: 36 },
  { x: 36, y: 38 },
  { x: 24, y: 40 },
];
const LOOP_MEEM_FINAL: Stroke = [
  { x: 60, y: 18 },
  { x: 50, y: 15 },
  { x: 42, y: 22 },
  { x: 40, y: 32 },
  { x: 50, y: 38 },
  { x: 58, y: 32 },
  { x: 48, y: 40 },
  { x: 48, y: 80 },
];

// noon initial+medial: shallow smile; final: deep bowl with a lead-in.
const SMILE_NOON_CONNECTED: Stroke = [
  { x: 72, y: 30 },
  { x: 55, y: 40 },
  { x: 38, y: 34 },
];
const BOWL_NOON_FINAL: Stroke = [
  { x: 78, y: 22 },
  { x: 72, y: 30 },
  { x: 72, y: 40 },
  { x: 65, y: 55 },
  { x: 50, y: 60 },
  { x: 35, y: 55 },
  { x: 30, y: 40 },
];

// ha (ه) - a distinct cursive squiggle per position.
const HA_INITIAL: Stroke = [
  { x: 68, y: 24 },
  { x: 54, y: 18 },
  { x: 42, y: 24 },
  { x: 44, y: 34 },
  { x: 58, y: 36 },
  { x: 48, y: 42 },
  { x: 34, y: 38 },
];
const HA_MEDIAL: Stroke = [
  { x: 56, y: 16 },
  { x: 46, y: 15 },
  { x: 40, y: 24 },
  { x: 50, y: 30 },
  { x: 40, y: 36 },
  { x: 46, y: 44 },
  { x: 58, y: 42 },
];
const HA_FINAL: Stroke = [
  { x: 62, y: 20 },
  { x: 48, y: 15 },
  { x: 36, y: 22 },
  { x: 33, y: 38 },
  { x: 44, y: 48 },
  { x: 58, y: 44 },
  { x: 62, y: 32 },
  { x: 50, y: 28 },
];

// ya final: bowl plus the descender swash below the baseline.
const BOWL_YA_FINAL: Stroke = [
  { x: 85, y: 20 },
  { x: 76, y: 30 },
  { x: 65, y: 38 },
  { x: 48, y: 40 },
  { x: 35, y: 35 },
  { x: 25, y: 40 },
  { x: 30, y: 55 },
  { x: 45, y: 65 },
  { x: 35, y: 78 },
];

// taa/zaa keep the exact isolated shape in every position (verified by
// rendering all three forms side by side - identical outlines), so these
// mirror arabic.ts's SAD_BODY + vertical stroke rather than being re-traced.
const TAA_ZAA_BODY: Stroke = [
  { x: 70, y: 35 },
  { x: 58, y: 25 },
  { x: 48, y: 32 },
  { x: 48, y: 48 },
  { x: 60, y: 52 },
  { x: 45, y: 52 },
  { x: 25, y: 52 },
  { x: 20, y: 40 },
];
const TAA_ZAA_STEM: Stroke = [
  { x: 55, y: 35 },
  { x: 55, y: 8 },
];

// Final-only forms for the 6 non-connecting letters.
const DAL_FINAL: Stroke = [
  { x: 75, y: 20 },
  { x: 58, y: 26 },
  { x: 44, y: 32 },
  { x: 36, y: 40 },
  { x: 40, y: 48 },
];
const RA_FINAL: Stroke = [
  { x: 75, y: 20 },
  { x: 60, y: 26 },
  { x: 48, y: 35 },
  { x: 40, y: 50 },
  { x: 38, y: 65 },
];
const WAW_FINAL: Stroke = [
  { x: 72, y: 18 },
  { x: 58, y: 24 },
  { x: 48, y: 28 },
  { x: 40, y: 35 },
  { x: 48, y: 42 },
  { x: 56, y: 38 },
  { x: 50, y: 44 },
  { x: 45, y: 65 },
  { x: 35, y: 75 },
];

interface FormSpec {
  letterId: string;
  char: string;
  position: 'initial' | 'medial' | 'final';
  romanization: string;
  speechOverride: string;
  strokes: Stroke[];
  difficulty: number;
}

const POSITION_LABEL: Record<FormSpec['position'], string> = {
  initial: 'forma inicial',
  medial: 'forma medial',
  final: 'forma final',
};

function buildForm(spec: FormSpec): CharacterTemplate {
  return {
    id: `arabicForms-${spec.letterId}-${spec.position}`,
    language: 'arabicForms',
    char: spec.char,
    romanization: spec.romanization,
    meaning: POSITION_LABEL[spec.position],
    speechOverride: spec.speechOverride,
    strokes: spec.strokes,
    difficulty: spec.difficulty,
  };
}

const specs: FormSpec[] = [
  // ba
  { letterId: 'ba', char: 'ب' + ZWJ, position: 'initial', romanization: 'b', speechOverride: 'باء', strokes: [HOOK_BA_INITIAL], difficulty: 2 },
  { letterId: 'ba', char: ZWJ + 'ب' + ZWJ, position: 'medial', romanization: 'b', speechOverride: 'باء', strokes: [HOOK_BA_MEDIAL, dot(45, 48)], difficulty: 2 },
  { letterId: 'ba', char: ZWJ + 'ب', position: 'final', romanization: 'b', speechOverride: 'باء', strokes: [BOWL_BA_FINAL, dot(50, 78)], difficulty: 2 },
  // ta
  { letterId: 'ta', char: 'ت' + ZWJ, position: 'initial', romanization: 't', speechOverride: 'تاء', strokes: [HOOK_BA_INITIAL, dot(45, 15), dot(58, 15)], difficulty: 2 },
  { letterId: 'ta', char: ZWJ + 'ت' + ZWJ, position: 'medial', romanization: 't', speechOverride: 'تاء', strokes: [HOOK_BA_MEDIAL, dot(45, 17), dot(58, 17)], difficulty: 2 },
  { letterId: 'ta', char: ZWJ + 'ت', position: 'final', romanization: 't', speechOverride: 'تاء', strokes: [BOWL_BA_FINAL, dot(42, 25), dot(58, 25)], difficulty: 2 },
  // tha
  { letterId: 'tha', char: 'ث' + ZWJ, position: 'initial', romanization: 'th', speechOverride: 'ثاء', strokes: [HOOK_BA_INITIAL, dot(42, 13), dot(52, 8), dot(62, 13)], difficulty: 3 },
  { letterId: 'tha', char: ZWJ + 'ث' + ZWJ, position: 'medial', romanization: 'th', speechOverride: 'ثاء', strokes: [HOOK_BA_MEDIAL, dot(42, 14), dot(52, 9), dot(62, 14)], difficulty: 3 },
  { letterId: 'tha', char: ZWJ + 'ث', position: 'final', romanization: 'th', speechOverride: 'ثاء', strokes: [BOWL_BA_FINAL, dot(38, 22), dot(50, 14), dot(62, 22)], difficulty: 3 },
  // jeem
  { letterId: 'jeem', char: 'ج' + ZWJ, position: 'initial', romanization: 'j', speechOverride: 'جيم', strokes: [HOOK_JEEM_INITIAL, dot(45, 42)], difficulty: 3 },
  { letterId: 'jeem', char: ZWJ + 'ج' + ZWJ, position: 'medial', romanization: 'j', speechOverride: 'جيم', strokes: [HOOK_JEEM_MEDIAL, dot(48, 44)], difficulty: 3 },
  { letterId: 'jeem', char: ZWJ + 'ج', position: 'final', romanization: 'j', speechOverride: 'جيم', strokes: [HOOK_JEEM_FINAL, dot(47, 62)], difficulty: 3 },
  // haa
  { letterId: 'haa', char: 'ح' + ZWJ, position: 'initial', romanization: 'h', speechOverride: 'حاء', strokes: [HOOK_JEEM_INITIAL], difficulty: 3 },
  { letterId: 'haa', char: ZWJ + 'ح' + ZWJ, position: 'medial', romanization: 'h', speechOverride: 'حاء', strokes: [HOOK_JEEM_MEDIAL], difficulty: 3 },
  { letterId: 'haa', char: ZWJ + 'ح', position: 'final', romanization: 'h', speechOverride: 'حاء', strokes: [HOOK_JEEM_FINAL], difficulty: 3 },
  // khaa
  { letterId: 'khaa', char: 'خ' + ZWJ, position: 'initial', romanization: 'kh', speechOverride: 'خاء', strokes: [HOOK_JEEM_INITIAL, dot(55, 15)], difficulty: 3 },
  { letterId: 'khaa', char: ZWJ + 'خ' + ZWJ, position: 'medial', romanization: 'kh', speechOverride: 'خاء', strokes: [HOOK_JEEM_MEDIAL, dot(60, 15)], difficulty: 3 },
  { letterId: 'khaa', char: ZWJ + 'خ', position: 'final', romanization: 'kh', speechOverride: 'خاء', strokes: [HOOK_JEEM_FINAL, dot(50, 18)], difficulty: 3 },
  // seen
  { letterId: 'seen', char: 'س' + ZWJ, position: 'initial', romanization: 's', speechOverride: 'سين', strokes: [TEETH_SEEN_CONNECTED], difficulty: 3 },
  { letterId: 'seen', char: ZWJ + 'س' + ZWJ, position: 'medial', romanization: 's', speechOverride: 'سين', strokes: [TEETH_SEEN_CONNECTED], difficulty: 3 },
  { letterId: 'seen', char: ZWJ + 'س', position: 'final', romanization: 's', speechOverride: 'سين', strokes: [TEETH_SEEN_FINAL], difficulty: 3 },
  // sheen
  { letterId: 'sheen', char: 'ش' + ZWJ, position: 'initial', romanization: 'sh', speechOverride: 'شين', strokes: [TEETH_SEEN_CONNECTED, dot(68, 18), dot(50, 12), dot(32, 18)], difficulty: 4 },
  { letterId: 'sheen', char: ZWJ + 'ش' + ZWJ, position: 'medial', romanization: 'sh', speechOverride: 'شين', strokes: [TEETH_SEEN_CONNECTED, dot(68, 18), dot(50, 12), dot(32, 18)], difficulty: 4 },
  { letterId: 'sheen', char: ZWJ + 'ش', position: 'final', romanization: 'sh', speechOverride: 'شين', strokes: [TEETH_SEEN_FINAL, dot(68, 14), dot(50, 8), dot(32, 14)], difficulty: 4 },
  // sad
  { letterId: 'sad', char: 'ص' + ZWJ, position: 'initial', romanization: 's', speechOverride: 'صاد', strokes: [LOOP_SAD_CONNECTED], difficulty: 4 },
  { letterId: 'sad', char: ZWJ + 'ص' + ZWJ, position: 'medial', romanization: 's', speechOverride: 'صاد', strokes: [LOOP_SAD_CONNECTED], difficulty: 4 },
  { letterId: 'sad', char: ZWJ + 'ص', position: 'final', romanization: 's', speechOverride: 'صاد', strokes: [LOOP_SAD_FINAL], difficulty: 4 },
  // dad
  { letterId: 'dad', char: 'ض' + ZWJ, position: 'initial', romanization: 'd', speechOverride: 'ضاد', strokes: [LOOP_SAD_CONNECTED, dot(60, 16)], difficulty: 4 },
  { letterId: 'dad', char: ZWJ + 'ض' + ZWJ, position: 'medial', romanization: 'd', speechOverride: 'ضاد', strokes: [LOOP_SAD_CONNECTED, dot(60, 16)], difficulty: 4 },
  { letterId: 'dad', char: ZWJ + 'ض', position: 'final', romanization: 'd', speechOverride: 'ضاد', strokes: [LOOP_SAD_FINAL, dot(55, 15)], difficulty: 4 },
  // taa (same shape in every position)
  { letterId: 'taa', char: 'ط' + ZWJ, position: 'initial', romanization: 't', speechOverride: 'طاء', strokes: [TAA_ZAA_BODY, TAA_ZAA_STEM], difficulty: 4 },
  { letterId: 'taa', char: ZWJ + 'ط' + ZWJ, position: 'medial', romanization: 't', speechOverride: 'طاء', strokes: [TAA_ZAA_BODY, TAA_ZAA_STEM], difficulty: 4 },
  { letterId: 'taa', char: ZWJ + 'ط', position: 'final', romanization: 't', speechOverride: 'طاء', strokes: [TAA_ZAA_BODY, TAA_ZAA_STEM], difficulty: 4 },
  // zaa (same shape in every position)
  { letterId: 'zaa', char: 'ظ' + ZWJ, position: 'initial', romanization: 'z', speechOverride: 'ظاء', strokes: [TAA_ZAA_BODY, TAA_ZAA_STEM, dot(65, 15)], difficulty: 5 },
  { letterId: 'zaa', char: ZWJ + 'ظ' + ZWJ, position: 'medial', romanization: 'z', speechOverride: 'ظاء', strokes: [TAA_ZAA_BODY, TAA_ZAA_STEM, dot(65, 15)], difficulty: 5 },
  { letterId: 'zaa', char: ZWJ + 'ظ', position: 'final', romanization: 'z', speechOverride: 'ظاء', strokes: [TAA_ZAA_BODY, TAA_ZAA_STEM, dot(65, 15)], difficulty: 5 },
  // ain
  { letterId: 'ain', char: 'ع' + ZWJ, position: 'initial', romanization: "'", speechOverride: 'عين', strokes: [HOOK_AIN_INITIAL], difficulty: 4 },
  { letterId: 'ain', char: ZWJ + 'ع' + ZWJ, position: 'medial', romanization: "'", speechOverride: 'عين', strokes: [HOOK_AIN_MEDIAL], difficulty: 4 },
  { letterId: 'ain', char: ZWJ + 'ع', position: 'final', romanization: "'", speechOverride: 'عين', strokes: [HOOK_AIN_FINAL], difficulty: 4 },
  // ghain
  { letterId: 'ghain', char: 'غ' + ZWJ, position: 'initial', romanization: 'gh', speechOverride: 'غين', strokes: [HOOK_AIN_INITIAL, dot(50, 10)], difficulty: 4 },
  { letterId: 'ghain', char: ZWJ + 'غ' + ZWJ, position: 'medial', romanization: 'gh', speechOverride: 'غين', strokes: [HOOK_AIN_MEDIAL, dot(52, 10)], difficulty: 4 },
  { letterId: 'ghain', char: ZWJ + 'غ', position: 'final', romanization: 'gh', speechOverride: 'غين', strokes: [HOOK_AIN_FINAL, dot(48, 12)], difficulty: 4 },
  // fa
  { letterId: 'fa', char: 'ف' + ZWJ, position: 'initial', romanization: 'f', speechOverride: 'فاء', strokes: [LOOP_FA_CONNECTED, dot(52, 10)], difficulty: 2 },
  { letterId: 'fa', char: ZWJ + 'ف' + ZWJ, position: 'medial', romanization: 'f', speechOverride: 'فاء', strokes: [LOOP_FA_CONNECTED, dot(52, 10)], difficulty: 2 },
  { letterId: 'fa', char: ZWJ + 'ف', position: 'final', romanization: 'f', speechOverride: 'فاء', strokes: [[{ x: 78, y: 20 }, { x: 65, y: 24 }, { x: 55, y: 32 }, { x: 58, y: 42 }, { x: 48, y: 62 }, { x: 38, y: 75 }], dot(58, 14)], difficulty: 2 },
  // qaf
  { letterId: 'qaf', char: 'ق' + ZWJ, position: 'initial', romanization: 'q', speechOverride: 'قاف', strokes: [LOOP_FA_CONNECTED, dot(46, 10), dot(58, 10)], difficulty: 3 },
  { letterId: 'qaf', char: ZWJ + 'ق' + ZWJ, position: 'medial', romanization: 'q', speechOverride: 'قاف', strokes: [LOOP_FA_CONNECTED, dot(46, 10), dot(58, 10)], difficulty: 3 },
  { letterId: 'qaf', char: ZWJ + 'ق', position: 'final', romanization: 'q', speechOverride: 'قاف', strokes: [[{ x: 78, y: 20 }, { x: 65, y: 24 }, { x: 55, y: 32 }, { x: 58, y: 42 }, { x: 52, y: 68 }, { x: 42, y: 85 }, { x: 32, y: 88 }], dot(44, 14), dot(56, 14)], difficulty: 3 },
  // kaf
  { letterId: 'kaf', char: 'ك' + ZWJ, position: 'initial', romanization: 'k', speechOverride: 'كاف', strokes: [ZIGZAG_KAF_CONNECTED], difficulty: 3 },
  { letterId: 'kaf', char: ZWJ + 'ك' + ZWJ, position: 'medial', romanization: 'k', speechOverride: 'كاف', strokes: [ZIGZAG_KAF_CONNECTED], difficulty: 3 },
  { letterId: 'kaf', char: ZWJ + 'ك', position: 'final', romanization: 'k', speechOverride: 'كاف', strokes: [KAF_FINAL_HOOK, KAF_FINAL_TOP, KAF_FINAL_INNER, [{ x: 70, y: 18 }, { x: 55, y: 15 }, { x: 40, y: 15 }]], difficulty: 3 },
  // lam
  { letterId: 'lam', char: 'ل' + ZWJ, position: 'initial', romanization: 'l', speechOverride: 'لام', strokes: [[{ x: 55, y: 15 }, { x: 50, y: 45 }, { x: 45, y: 58 }]], difficulty: 1 },
  { letterId: 'lam', char: ZWJ + 'ل' + ZWJ, position: 'medial', romanization: 'l', speechOverride: 'لام', strokes: [[{ x: 52, y: 15 }, { x: 50, y: 60 }]], difficulty: 1 },
  { letterId: 'lam', char: ZWJ + 'ل', position: 'final', romanization: 'l', speechOverride: 'لام', strokes: [[{ x: 58, y: 10 }, { x: 52, y: 45 }, { x: 45, y: 65 }, { x: 60, y: 70 }, { x: 72, y: 58 }]], difficulty: 2 },
  // meem
  { letterId: 'meem', char: 'م' + ZWJ, position: 'initial', romanization: 'm', speechOverride: 'ميم', strokes: [LOOP_MEEM_CONNECTED], difficulty: 2 },
  { letterId: 'meem', char: ZWJ + 'م' + ZWJ, position: 'medial', romanization: 'm', speechOverride: 'ميم', strokes: [LOOP_MEEM_CONNECTED], difficulty: 2 },
  { letterId: 'meem', char: ZWJ + 'م', position: 'final', romanization: 'm', speechOverride: 'ميم', strokes: [LOOP_MEEM_FINAL], difficulty: 2 },
  // noon
  { letterId: 'noon', char: 'ن' + ZWJ, position: 'initial', romanization: 'n', speechOverride: 'نون', strokes: [SMILE_NOON_CONNECTED, dot(55, 20)], difficulty: 2 },
  { letterId: 'noon', char: ZWJ + 'ن' + ZWJ, position: 'medial', romanization: 'n', speechOverride: 'نون', strokes: [SMILE_NOON_CONNECTED, dot(55, 20)], difficulty: 2 },
  { letterId: 'noon', char: ZWJ + 'ن', position: 'final', romanization: 'n', speechOverride: 'نون', strokes: [BOWL_NOON_FINAL, dot(50, 18)], difficulty: 2 },
  // ha
  { letterId: 'ha', char: 'ه' + ZWJ, position: 'initial', romanization: 'h', speechOverride: 'هاء', strokes: [HA_INITIAL], difficulty: 4 },
  { letterId: 'ha', char: ZWJ + 'ه' + ZWJ, position: 'medial', romanization: 'h', speechOverride: 'هاء', strokes: [HA_MEDIAL], difficulty: 4 },
  { letterId: 'ha', char: ZWJ + 'ه', position: 'final', romanization: 'h', speechOverride: 'هاء', strokes: [HA_FINAL], difficulty: 4 },
  // ya
  { letterId: 'ya', char: 'ي' + ZWJ, position: 'initial', romanization: 'y', speechOverride: 'ياء', strokes: [HOOK_BA_INITIAL, dot(42, 46), dot(54, 46)], difficulty: 3 },
  { letterId: 'ya', char: ZWJ + 'ي' + ZWJ, position: 'medial', romanization: 'y', speechOverride: 'ياء', strokes: [HOOK_BA_MEDIAL, dot(42, 46), dot(54, 46)], difficulty: 3 },
  { letterId: 'ya', char: ZWJ + 'ي', position: 'final', romanization: 'y', speechOverride: 'ياء', strokes: [BOWL_YA_FINAL, dot(42, 80), dot(58, 80)], difficulty: 3 },
  // final-only, non-connecting letters
  { letterId: 'alif', char: ZWJ + 'ا', position: 'final', romanization: 'a', speechOverride: 'ألف', strokes: [[{ x: 50, y: 10 }, { x: 50, y: 90 }]], difficulty: 1 },
  { letterId: 'dal', char: ZWJ + 'د', position: 'final', romanization: 'd', speechOverride: 'دال', strokes: [DAL_FINAL], difficulty: 1 },
  { letterId: 'dhal', char: ZWJ + 'ذ', position: 'final', romanization: 'dh', speechOverride: 'ذال', strokes: [DAL_FINAL, dot(55, 12)], difficulty: 2 },
  { letterId: 'ra', char: ZWJ + 'ر', position: 'final', romanization: 'r', speechOverride: 'راء', strokes: [RA_FINAL], difficulty: 1 },
  { letterId: 'zay', char: ZWJ + 'ز', position: 'final', romanization: 'z', speechOverride: 'زاي', strokes: [RA_FINAL, dot(58, 12)], difficulty: 2 },
  { letterId: 'waw', char: ZWJ + 'و', position: 'final', romanization: 'w', speechOverride: 'واو', strokes: [WAW_FINAL], difficulty: 2 },
];

export const arabicFormsCharacters: CharacterTemplate[] = specs.map(buildForm);
