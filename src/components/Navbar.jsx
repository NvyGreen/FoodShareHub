import AppLink from './AppLink.jsx'
import Logo from './Logo.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/impact', label: 'Our impact' },
]

export default function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-center gap-2 bg-forest-800 px-4 py-2.5 text-center text-xs font-semibold text-cream">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-light" aria-hidden="true" />
        Good food brings us together. Good people keep us going.
      </div>

      <nav className="border-b border-line">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex items-center gap-4 sm:gap-10">
            {links.map((link) => (
              <AppLink
                key={link.to}
                to={link.to}
                className="hidden text-sm font-semibold text-forest-900 hover:text-sage sm:block"
              >
                {link.label}
              </AppLink>
            ))}
            <AppLink
              to="/events"
              className="rounded-lg bg-forest-800 px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest-700"
            >
              See our events
            </AppLink>
          </div>
        </div>
      </nav>
    </header>
  )
}
