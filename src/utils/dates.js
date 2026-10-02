// Parse "YYYY-MM-DD" as a local date so it doesn't shift a day in US time zones.
export function parseEventDate(date) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}
