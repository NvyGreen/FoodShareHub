import { useCallback, useState } from 'react'
import EventCard from '../../components/EventCard.jsx'
import SectionLabel from '../../components/SectionLabel.jsx'
import Toast from '../../components/Toast.jsx'
import mockData from '../../data/mock-data.json'
import { parseEventDate } from '../../utils/dates.js'

const { events } = mockData

const types = ['All', ...new Set(events.map((event) => event.type))]

const dateOptions = [
  { value: 'any', label: 'Any date' },
  { value: '7', label: 'Next 7 days' },
  { value: '30', label: 'Next 30 days' },
]

const DAY_MS = 24 * 60 * 60 * 1000

function isWithinDays(date, days) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const daysAway = Math.round((parseEventDate(date) - today) / DAY_MS)
  return daysAway >= 0 && daysAway <= days
}

export default function Events() {
  const [type, setType] = useState('All')
  const [dateRange, setDateRange] = useState('any')
  const [signedUpEvent, setSignedUpEvent] = useState(null)
  const closeToast = useCallback(() => setSignedUpEvent(null), [])

  const filteredEvents = events.filter(
    (event) =>
      (type === 'All' || event.type === type) &&
      (dateRange === 'any' || isWithinDays(event.date, Number(dateRange))),
  )

  const resetFilters = () => {
    setType('All')
    setDateRange('any')
  }

  return (
    <section className="bg-mint">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Your time makes a difference</SectionLabel>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.1] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Find your place
              <br />
              at the <span className="text-sage">table.</span>
            </h1>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.8] text-ink-muted md:pb-2">
            Come as you are. Whether you have a few hours or a whole afternoon, there's a way to help that fits your
            life.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-forest-900">
            Explore opportunities
            <span className="ml-3 text-ink-muted">{String(filteredEvents.length).padStart(2, '0')}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {types.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                aria-pressed={type === option}
                className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                  type === option
                    ? 'border-forest-800 bg-forest-800 text-cream'
                    : 'border-forest-900/15 text-forest-900 hover:border-forest-900/40'
                }`}
              >
                {option}
              </button>
            ))}

            <label className="sr-only" htmlFor="date-range">
              Date
            </label>
            <select
              id="date-range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-full border border-forest-900/15 bg-transparent px-4 py-2.5 text-xs font-semibold text-forest-900 hover:border-forest-900/40"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} onSignUp={setSignedUpEvent} />
            ))}
          </ul>
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-forest-900">No events match</p>
            <p className="mt-2 text-sm text-ink-muted">Try a different type or date range.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 border-b border-forest-900 pb-1 text-sm font-semibold text-forest-900 hover:text-sage"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {signedUpEvent && (
        <Toast
          title={`You're signed up for ${signedUpEvent.title}!`}
          message="This was a demo sign-up. Nothing was saved, and no spot was reserved."
          onClose={closeToast}
        />
      )}
    </section>
  )
}
