import type { CharacterTemplate } from '../types/character';
import { HebrewGlyph } from './HebrewGlyph';
import { isHebrewScript, scriptFontClass } from '../data/languages';

interface ScriptGlyphProps {
  template: CharacterTemplate;
  className?: string;
}

/** Renders a character's glyph with the right script-specific handling (Hebrew niqqud positioning, Arabic font). */
export function ScriptGlyph({ template, className }: ScriptGlyphProps) {
  const fontClass = scriptFontClass(template.language);
  if (isHebrewScript(template.language)) {
    return <HebrewGlyph char={template.char} className={`${className ?? ''} ${fontClass}`} />;
  }
  return <span className={`${className ?? ''} ${fontClass}`}>{template.char}</span>;
}
