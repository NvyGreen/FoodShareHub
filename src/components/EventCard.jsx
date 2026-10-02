import { parseEventDate } from '../utils/dates.js'
import AppLink from './AppLink.jsx'

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-6 w-6',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const smallIconProps = { ...iconProps, className: 'h-4 w-4 shrink-0 text-ink-muted' }

const typeStyles = {
  Sorting: {
    className: 'bg-[#e3eed6] text-forest-800',
    icon: (
      <svg {...iconProps}>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5l8 4.5 8-4.5M12 12v9" />
      </svg>
    ),
  },
  Distribution: {
    className: 'bg-[#e6ead5] text-[#7a8a4a]',
    icon: (
      <svg {...iconProps}>
        <path d="M5 8h14l-1 12H6L5 8ZM9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  Delivery: {
    className: 'bg-[#f6e3d4] text-[#c0805a]',
    icon: (
      <svg {...iconProps}>
        <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
        <circle cx="7" cy="17.5" r="1.5" />
        <circle cx="17" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  Garden: {
    className: 'bg-[#dcebc5] text-sage',
    icon: (
      <svg {...iconProps}>
        <path d="M12 20v-8M12 12c0-4-3-6-7-6 0 4 3 6 7 6ZM12 10c0-3.5 2.5-5.5 7-5.5 0 3.5-2.5 5.5-7 5.5ZM7 20h10" />
      </svg>
    ),
  },
}

export default function EventCard({ event, index, onSignUp }) {
  const style = typeStyles[event.type] ?? typeStyles.Sorting
  const spotsLeft = event.spotsTotal - event.spotsFilled
  const isFull = spotsLeft <= 0
  const formattedDate = parseEventDate(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <li className="grid gap-6 border-b border-line py-8 md:grid-cols-[2.5rem_4.5rem_1fr_14rem_auto] md:items-center">
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
          {formattedDate}
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
          onClick={() => onSignUp(event)}
          disabled={isFull}
          className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted"
        >
          Sign up
        </button>
      </div>
    </li>
  )
}
