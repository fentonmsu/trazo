import type { CharacterTemplate } from '../types/character';
import { HebrewGlyph } from './HebrewGlyph';
import { isHebrewScript } from '../data/languages';

interface ScriptGlyphProps {
  template: CharacterTemplate;
  className?: string;
}

/** Renders a character's glyph with the right script-specific handling (Hebrew niqqud positioning, Arabic font). */
export function ScriptGlyph({ template, className }: ScriptGlyphProps) {
  if (isHebrewScript(template.language)) {
    return <HebrewGlyph char={template.char} className={className} />;
  }
  return (
    <span className={`${className ?? ''} ${template.language === 'arabic' ? 'arabic-glyph' : ''}`}>
      {template.char}
    </span>
  );
}
