// api/src/utils/textUtils.ts

/**
 * Make a URL-friendly slug from a string.
 * Example: "The Smith Weekly Review" -> "the-smith-weekly-review"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

/**
 * Truncate text to a maximum length, adding "…" if needed.
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  if (maxLength <= 1) return '…';
  return input.slice(0, maxLength - 1).trimEnd() + '…';
}

/**
 * Normalize whitespace in user-provided text (collapse multiple spaces/newlines).
 */
export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}
