/** "2026-11-04" -> "Nov 4" */
export const formatDate = iso =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/** Today's date as YYYY-MM-DD in the user's local time zone. */
export function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
