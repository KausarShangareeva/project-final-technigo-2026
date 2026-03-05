import { Emoji, EmojiStyle } from "emoji-picker-react";

/** Convert an emoji string to the unified hex code format emoji-picker-react uses */
function toUnified(icon: string): string {
  return [...icon]
    .map((c) => c.codePointAt(0)!)
    .map((cp) => cp.toString(16))
    .join("-");
}

/** Detect if the string starts with a proper emoji (not plain text symbols like ∫ or △) */
function isEmoji(icon: string): boolean {
  if (!icon) return false;
  const cp = icon.codePointAt(0) ?? 0;
  return (
    cp >= 0x1f000 || // Main emoji + regional indicator flags (1F1E0–1F1FF)
    (cp >= 0x2600 && cp <= 0x27bf) || // Misc Symbols, Dingbats
    (cp >= 0x2300 && cp <= 0x23ff) || // Misc Technical
    (cp >= 0x2b00 && cp <= 0x2bff) // Misc Symbols & Arrows
  );
}

/**
 * Renders a tag icon using Apple-style emoji images from emoji-picker-react.
 * Falls back to a plain <span> for non-emoji text characters (e.g. ∫, △).
 */
export default function TagIcon({
  icon,
  size = 18,
}: {
  icon: string;
  size?: number;
}) {
  if (!icon) return null;
  if (isEmoji(icon)) {
    return (
      <Emoji
        unified={toUnified(icon)}
        size={size}
        emojiStyle={EmojiStyle.APPLE}
      />
    );
  }
  return <span style={{ fontSize: size }}>{icon}</span>;
}
