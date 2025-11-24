// api/src/utils/dateUtils.ts

/**
 * Convert a Date (or parseable value) to ISO date string (YYYY-MM-DD).
 */
export function toISODateString(value: Date | string | number): string {
  const d = value instanceof Date ? value : new Date(value);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Add a number of days (can be negative) to a date.
 */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Start of day (UTC).
 */
export function startOfDayUTC(date: Date): Date {
  const d = new Date(date.getTime());
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/**
 * End of day (UTC).
 */
export function endOfDayUTC(date: Date): Date {
  const d = new Date(date.getTime());
  d.setUTCHours(23, 59, 59, 999);
  return d;
}

/**
 * Convert a Unix timestamp in seconds to Date.
 */
export function fromUnixSeconds(seconds: number): Date {
  return new Date(seconds * 1000);
}
