import AppLink from './AppLink.jsx'
import Logo from './Logo.jsx'

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Our events' },
  { to: '/impact', label: 'Our impact' },
]

export default function Footer() {
  return (
    <footer>
      <section className="bg-forest-700">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">
              Good things grow together
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-[-0.05em] text-cream sm:text-5xl lg:text-6xl">
              A better tomorrow
              <br />
              starts <span className="text-sage-light">right here.</span>
            </h2>
          </div>
          <AppLink
            to="/events"
            className="self-start rounded-lg bg-cream px-6 py-4 text-sm font-semibold text-forest-900 transition hover:bg-white md:self-auto"
          >
            See our events
          </AppLink>
        </div>
      </section>

      <div className="bg-forest-900">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">
            <div>
              <Logo light />
              <p className="mt-8 text-sm leading-7 text-cream/75">
                Good food. Greater good.
                <br />
                Made possible by people like you.
              </p>
            </div>

            <div className="flex gap-16 sm:gap-24">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">Explore</h3>
                <ul className="mt-5 space-y-4">
                  {exploreLinks.map((link) => (
                    <li key={link.to}>
                      <AppLink to={link.to} className="text-sm text-cream hover:text-sage-light">
                        {link.label}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-light">
                  FoodShare Hub
                </h3>
                <p className="mt-5 text-sm text-cream/75">More to come soon.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-cream/15 pt-8">
            <p className="text-xs text-cream/60">A practice project for good ideas.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
