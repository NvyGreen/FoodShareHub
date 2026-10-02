// Parse "YYYY-MM-DD" as a local date so it doesn't shift a day in US time zones.
export function parseEventDate(date) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// "2026-10-10" -> "Sat, Oct 10"
export function formatEventDate(date, options = { weekday: 'short', month: 'short', day: 'numeric' }) {
  return parseEventDate(date).toLocaleDateString('en-US', options)
}

function splitTime(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return {
    clock: `${hours % 12 || 12}:${String(minutes).padStart(2, '0')}`,
    period: hours >= 12 ? 'PM' : 'AM',
  }
}

// "07:30", "10:30" -> "3 hrs"; "09:00", "10:30" -> "1.5 hrs"
export function formatDuration(startTime, endTime) {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  const hours = (toMinutes(endTime) - toMinutes(startTime)) / 60
  return `${Number(hours.toFixed(1))} ${hours === 1 ? 'hr' : 'hrs'}`
}

// "08:00", "11:00" -> "8:00 – 11:00 AM"; "10:00", "13:00" -> "10:00 AM – 1:00 PM"
export function formatTimeRange(startTime, endTime) {
  const start = splitTime(startTime)
  const end = splitTime(endTime)
  const startLabel = start.period === end.period ? start.clock : `${start.clock} ${start.period}`
  return `${startLabel} – ${end.clock} ${end.period}`
}
