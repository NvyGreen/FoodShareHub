import { useSignUps } from '../context/SignUpsContext.js'
import { formatEventDate, formatTimeRange } from '../utils/dates.js'
import { getTypeStyle, smallIconProps } from '../utils/eventTypes.jsx'
import AppLink from './AppLink.jsx'

export default function EventCard({ event, index }) {
  const { openSignUp, getSpotsFilled } = useSignUps()
  const style = getTypeStyle(event.type)
  const spotsLeft = event.spotsTotal - getSpotsFilled(event)
  const isFull = spotsLeft <= 0

  return (
    <li className="grid gap-6 border-b border-line py-8 md:grid-cols-[2.5rem_4.5rem_1fr_16rem_auto] md:items-center">
      <span className="hidden text-xs font-semibold text-ink-muted md:block">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className={`hidden h-[4.5rem] w-[4.5rem] items-center justify-center rounded-xl md:flex ${style.className}`}>
        {style.icon}
      </span>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">{event.type}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-forest-900 sm:text-[28px]">
          {event.title}
        </h3>
      </div>

      <ul className="space-y-2.5 text-[13px] text-forest-900">
        <li className="flex items-center gap-3">
          <svg {...smallIconProps}>
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
          </svg>
          {formatEventDate(event.date)} · {formatTimeRange(event.startTime, event.endTime)}
        </li>
        <li className="flex items-center gap-3">
          <svg {...smallIconProps}>
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          {event.location}
        </li>
        <li className="flex items-center gap-3">
          <svg {...smallIconProps}>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M3 20a6 6 0 0 1 12 0M15.5 4.6a3.5 3.5 0 0 1 0 6.8M17 14.3a6 6 0 0 1 4 5.7" />
          </svg>
          {isFull ? (
            <span className="font-semibold text-[#b5653a]">Full</span>
          ) : (
            `${spotsLeft} of ${event.spotsTotal} spots left`
          )}
        </li>
      </ul>

      <div className="flex gap-3">
        <AppLink
          to={`/events/${event.id}`}
          className="rounded-full border border-forest-900/20 px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:border-forest-900"
        >
          See details
        </AppLink>
        <button
          type="button"
          onClick={() => openSignUp(event)}
          disabled={isFull}
          className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted"
        >
          Sign up
        </button>
      </div>
    </li>
  )
}
