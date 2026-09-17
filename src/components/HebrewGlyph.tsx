/**
 * Renders Hebrew text that ends in a niqqud vowel point, positioning that
 * mark with explicit CSS instead of leaving it to the browser's font
 * shaper. Two font-shaping problems motivate this:
 *
 * 1. Several fonts only have mark-attachment anchors for the common
 *    letterforms, not the sofit (final) ones - a vowel point combined with
 *    ם/ן/ף/ץ silently fails to attach and ends up in the wrong place or
 *    invisible.
 * 2. Splitting the mark into its own span means it's shaped in its own
 *    text run with no base character before it, and some text-shaping
 *    engines (this varies by OS/browser) simply refuse to draw a mark with
 *    nothing to attach to. So the mark span always carries the standard
 *    Unicode "dotted circle" placeholder (U+25CC) as a guaranteed-present
 *    base for it to combine with, rather than being left bare.
 */

const HOLAM = 'ֹ';
const DOTTED_CIRCLE = '◌';
const VOWEL_POINT_RANGE: [number, number] = [0x05b0, 0x05bb];

function isVowelPoint(codePoint: number): boolean {
  return codePoint >= VOWEL_POINT_RANGE[0] && codePoint <= VOWEL_POINT_RANGE[1];
}

interface HebrewGlyphProps {
  char: string;
  className?: string;
}

export function HebrewGlyph({ char, className }: HebrewGlyphProps) {
  const lastChar = char.slice(-1);
  const lastCodePoint = lastChar.codePointAt(0);

  if (lastCodePoint === undefined || !isVowelPoint(lastCodePoint)) {
    return <span className={className}>{char}</span>;
  }

  const base = char.slice(0, -1);
  const isAbove = lastChar === HOLAM;

  if (base === '') {
    // No real letter to attach to (the standalone niqqud practice tab) -
    // there's nothing to position the mark relative to, so just show the
    // ordinary circle+mark pair as one normal run.
    return <span className={className}>{DOTTED_CIRCLE + lastChar}</span>;
  }

  return (
    <span className={`hebrew-compound ${className ?? ''}`}>
      <span className="hebrew-compound-base">{base}</span>
      <span className={`hebrew-compound-mark ${isAbove ? 'above' : 'below'}`}>{DOTTED_CIRCLE + lastChar}</span>
    </span>
  );
}
