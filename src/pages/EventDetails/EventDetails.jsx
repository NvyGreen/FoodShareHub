import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Toast from '../../components/Toast.jsx'
import mockData from '../../data/mock-data.json'
import { formatEventDate, formatTimeRange } from '../../utils/dates.js'
import { getTypeStyle, smallIconProps } from '../../utils/eventTypes.jsx'

function BackLink() {
  return (
    <Link to="/events" className="text-sm font-semibold text-forest-900 hover:text-sage">
      ← All events
    </Link>
  )
}

function DetailRow({ icon, label, children }) {
  return (
    <div className="flex gap-3 border-b border-line py-4 last:border-b-0">
      <svg {...smallIconProps} className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted">
        {icon}
      </svg>
      <div>
        <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-muted">{label}</dt>
        <dd className="mt-1 text-sm text-forest-900">{children}</dd>
      </div>
    </div>
  )
}

export default function EventDetails() {
  const { id } = useParams()
  const event = mockData.events.find((e) => e.id === Number(id))
  const [signedUp, setSignedUp] = useState(false)
  const closeToast = useCallback(() => setSignedUp(false), [setSignedUp])

  if (!event) {
    return (
      <section className="bg-mint">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-forest-900">Event not found</h1>
          <p className="mt-3 text-sm text-ink-muted">This event may have been removed, or the link is wrong.</p>
          <div className="mt-8">
            <BackLink />
          </div>
        </div>
      </section>
    )
  }

  const style = getTypeStyle(event.type)
  const spotsLeft = event.spotsTotal - event.spotsFilled
  const isFull = spotsLeft <= 0

  return (
    <section className="bg-mint">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <BackLink />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_24rem] lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <span className={`flex h-14 w-14 items-center justify-center rounded-xl ${style.className}`}>
                {style.icon}
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">{event.type}</p>
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.1] tracking-[-0.06em] text-forest-900 sm:text-6xl">
              {event.title}
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.8] text-ink-muted">{event.description}</p>

            <div className="mt-12 border-t border-line pt-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-forest-900">What to bring</h2>
              <ul className="mt-5 space-y-3">
                {event.whatToBring.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-forest-900">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border-t border-line pt-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-forest-900">Questions?</h2>
              <p className="mt-5 text-[15px] text-forest-900">
                Contact <span className="font-semibold">{event.coordinator.name}</span>, the event coordinator, at{' '}
                <a
                  href={`mailto:${event.coordinator.email}`}
                  className="border-b border-forest-900 font-semibold hover:border-sage hover:text-sage"
                >
                  {event.coordinator.email}
                </a>
                .
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-cream p-8 shadow-[0_8px_24px_-12px_rgba(26,58,46,0.12)] lg:sticky lg:top-8">
            <dl>
              <DetailRow
                label="Date"
                icon={
                  <>
                    <rect x="3.5" y="5" width="17" height="15" rx="2" />
                    <path d="M3.5 10h17M8 3v4M16 3v4" />
                  </>
                }
              >
                {formatEventDate(event.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </DetailRow>
              <DetailRow
                label="Time"
                icon={
                  <>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" />
                  </>
                }
              >
                {formatTimeRange(event.startTime, event.endTime)}
              </DetailRow>
              <DetailRow
                label="Location"
                icon={
                  <>
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </>
                }
              >
                {event.location}
                <span className="mt-0.5 block text-[13px] text-ink-muted">{event.address}</span>
              </DetailRow>
              <DetailRow
                label="Spots"
                icon={
                  <>
                    <circle cx="9" cy="8" r="3.5" />
                    <path d="M3 20a6 6 0 0 1 12 0M15.5 4.6a3.5 3.5 0 0 1 0 6.8M17 14.3a6 6 0 0 1 4 5.7" />
                  </>
                }
              >
                {isFull ? (
                  <span className="font-semibold text-[#b5653a]">Full</span>
                ) : (
                  `${spotsLeft} of ${event.spotsTotal} spots left`
                )}
              </DetailRow>
              <DetailRow
                label="Age"
                icon={
                  <>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
                  </>
                }
              >
                Ages {event.minAge}+
              </DetailRow>
            </dl>

            <button
              type="button"
              onClick={() => setSignedUp(true)}
              disabled={isFull}
              className="mt-6 w-full rounded-full bg-forest-800 px-5 py-3.5 text-sm font-semibold text-cream transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted"
            >
              {isFull ? 'This event is full' : 'Sign up'}
            </button>
          </aside>
        </div>
      </div>

      {signedUp && (
        <Toast
          title={`You're signed up for ${event.title}!`}
          message="This was a demo sign-up. Nothing was saved, and no spot was reserved."
          onClose={closeToast}
        />
      )}
    </section>
  )
}
