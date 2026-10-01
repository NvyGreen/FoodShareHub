import AppLink from '../../components/AppLink.jsx'
import SectionLabel from '../../components/SectionLabel.jsx'

const missionImage =
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80'

export default function Mission() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-36 lg:px-8 lg:py-32">
      <div className="relative h-[360px] overflow-hidden rounded-2xl rounded-tr-[90px] sm:h-[460px]">
        <img src={missionImage} alt="A market stall full of fresh fruit and vegetables" className="h-full w-full object-cover" />
        <p className="absolute bottom-5 left-5 flex items-center gap-6 rounded-md bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-forest-900">
          Fresh food. Full hearts.
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-sage" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
          </svg>
        </p>
      </div>

      <div className="max-w-md">
        <SectionLabel>Why we're here</SectionLabel>
        <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.15] tracking-[-0.06em] sm:text-6xl">
          Food is more
          <br />
          than <span className="text-sage">food.</span>
        </h2>
        <p className="mt-8 text-[15px] leading-[1.8] text-ink-muted">
          It's a warm welcome. A moment to connect. The comfort of knowing your community is here for you.
        </p>
        <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">
          Our mission is simple: bring neighbors together to share nourishing food, meaningful time, and a little more
          hope. Because everyone deserves a place at the table.
        </p>
        <AppLink
          to="/events"
          className="mt-8 inline-block border-b border-forest-900 pb-1 text-sm font-semibold text-forest-900 hover:text-sage"
        >
          See what we can do together
        </AppLink>
      </div>
    </section>
  )
}
