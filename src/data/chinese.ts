import type { CharacterTemplate } from '../types/character';
import { kanjiCharacters } from './kanji';

/**
 * Chinese reuses the same 24 kanji strokes: these particular characters
 * (basic numerals and pictographs) are unchanged between Japanese kanji,
 * Traditional Chinese, and Simplified Chinese, since they predate any of
 * the scripts' later divergence - only the reading and meaning differ.
 */
const PINYIN_AND_MEANING: Record<string, { pinyin: string; meaning: string }> = {
  一: { pinyin: 'yī', meaning: 'uno' },
  二: { pinyin: 'èr', meaning: 'dos' },
  三: { pinyin: 'sān', meaning: 'tres' },
  四: { pinyin: 'sì', meaning: 'cuatro' },
  五: { pinyin: 'wǔ', meaning: 'cinco' },
  六: { pinyin: 'liù', meaning: 'seis' },
  七: { pinyin: 'qī', meaning: 'siete' },
  八: { pinyin: 'bā', meaning: 'ocho' },
  九: { pinyin: 'jiǔ', meaning: 'nueve' },
  十: { pinyin: 'shí', meaning: 'diez' },
  人: { pinyin: 'rén', meaning: 'persona' },
  日: { pinyin: 'rì', meaning: 'sol/día' },
  月: { pinyin: 'yuè', meaning: 'luna/mes' },
  木: { pinyin: 'mù', meaning: 'árbol' },
  火: { pinyin: 'huǒ', meaning: 'fuego' },
  水: { pinyin: 'shuǐ', meaning: 'agua' },
  金: { pinyin: 'jīn', meaning: 'oro/metal' },
  土: { pinyin: 'tǔ', meaning: 'tierra' },
  山: { pinyin: 'shān', meaning: 'montaña' },
  川: { pinyin: 'chuān', meaning: 'río' },
  口: { pinyin: 'kǒu', meaning: 'boca' },
  目: { pinyin: 'mù', meaning: 'ojo' },
  耳: { pinyin: 'ěr', meaning: 'oreja' },
  手: { pinyin: 'shǒu', meaning: 'mano' },
};

export const chineseCharacters: CharacterTemplate[] = kanjiCharacters.map((k) => {
  const info = PINYIN_AND_MEANING[k.char];
  return {
    ...k,
    id: `chinese-${k.id.replace(/^kanji-/, '')}`,
    language: 'chinese',
    romanization: info.pinyin,
    meaning: info.meaning,
  };
});
