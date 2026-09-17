/**
 * Renders Hebrew text that ends in a niqqud vowel point, positioning that
 * mark with explicit CSS instead of leaving it to the browser's font
 * shaper. Several fonts (including Noto Sans Hebrew) only have mark-
 * attachment anchors for the common letterforms, not the sofit (final)
 * ones - a vowel point combined with ם/ן/ף/ץ silently fails to attach and
 * ends up invisible or overlapping the glyph. Splitting it into its own
 * absolutely-positioned span sidesteps that entirely.
 */

const HOLAM = 'ֹ';
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

  if (char.length < 2 || lastCodePoint === undefined || !isVowelPoint(lastCodePoint)) {
    return <span className={className}>{char}</span>;
  }

  const base = char.slice(0, -1);
  const isAbove = lastChar === HOLAM;

  return (
    <span className={`hebrew-compound ${className ?? ''}`}>
      <span className="hebrew-compound-base">{base}</span>
      <span className={`hebrew-compound-mark ${isAbove ? 'above' : 'below'}`}>{lastChar}</span>
    </span>
  );
}
