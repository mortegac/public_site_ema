/**
 * Timezone utilities for America/Santiago without depending on date-fns-tz.
 * date-fns-tz v3 requires date-fns v3 (named submodule exports), but this project uses v2.
 */

/**
 * Format a UTC Date as HH:mm in America/Santiago timezone (default).
 * The pattern parameter is kept for API compatibility with the previous dayjs helper.
 */
export function formatChileTime(date: Date, pattern = 'HH:mm'): string {
  if (pattern === 'HH:mm') {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Santiago',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(date);
    const h = parts.find(p => p.type === 'hour')!.value;
    const m = parts.find(p => p.type === 'minute')!.value;
    return `${h}:${m}`;
  }
  // Fallback for other patterns — not used in this project
  return new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago' }).format(date);
}

/**
 * Return a plain Date whose year/month/day match the current date in Santiago.
 * Useful for computing start-of-week in Chilean local time.
 */
export function toChileLocalDate(date: Date): Date {
  // toLocaleString gives us the wall-clock time in Santiago as a parseable string
  const str = date.toLocaleString('en-US', { timeZone: 'America/Santiago' });
  return new Date(str);
}

/**
 * Format a Date as a yyyy-MM-dd string using UTC date components.
 */
export function utcDateStr(date: Date): string {
  const y = date.getUTCFullYear();
  const mo = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}
