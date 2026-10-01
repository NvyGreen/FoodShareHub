import AppLink from '../../components/AppLink.jsx'
import SectionLabel from '../../components/SectionLabel.jsx'

const heroImage =
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80'

const avatars = [
  { initial: 'J', className: 'bg-[#efc9ae]' },
  { initial: 'M', className: 'bg-[#cfe0b8]' },
  { initial: 'A', className: 'bg-[#ddd8c4]' },
]

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-14">
      <div>
        <SectionLabel>Community is our superpower</SectionLabel>
        <h1 className="mt-10 font-display text-6xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-7xl lg:text-[5.5rem]">
          Good food.
          <br />
          <span className="text-sage">
            Greater good<span className="text-peach">.</span>
          </span>
        </h1>
        <p className="mt-8 max-w-md text-[17px] leading-[1.8] text-ink-muted">
          When we share what we have, everyone has a seat at the table. FoodShare Hub brings neighbors together to
          make nourishing food accessible to all.
        </p>

        <div className="mt-10 flex items-center gap-8">
          <AppLink
            to="/events"
            className="rounded-lg bg-forest-800 px-6 py-5 text-sm font-semibold text-cream transition hover:bg-forest-700"
          >
            Find an event
          </AppLink>
          <AppLink
            to="/impact"
            className="border-b border-forest-900 pb-1 text-sm font-semibold text-forest-900 hover:text-sage"
          >
            See our impact
          </AppLink>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="flex -space-x-2">
            {avatars.map((avatar) => (
              <span
                key={avatar.initial}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream text-[10px] font-bold text-forest-900 ${avatar.className}`}
              >
                {avatar.initial}
              </span>
            ))}
          </div>
          <p className="text-[13px] text-ink-muted">People like you make it possible.</p>
        </div>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-2xl rounded-br-[120px] sm:h-[560px]">
        <img
          src={heroImage}
          alt="Volunteers unloading boxes of donated food"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" aria-hidden="true" />
        <p className="absolute top-7 right-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
          Good things grow together
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </p>
        <div className="absolute bottom-5 left-5 flex items-center gap-4 rounded-md bg-white px-4 py-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dcebc5] text-sage">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
            </svg>
          </span>
          <p className="text-xs leading-5 text-forest-900">
            More than food.
            <br />
            <span className="font-bold">It's a feeling of belonging.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
