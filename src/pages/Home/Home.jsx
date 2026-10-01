import SectionLabel from '../../components/SectionLabel.jsx'
import StatCard from '../../components/StatCard.jsx'
import Hero from './Hero.jsx'
import Mission from './Mission.jsx'

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

// Illustrative figures for this prototype.
const stats = [
  {
    value: '12,400+',
    label: 'Meals served',
    description: 'Nourishing our neighbors, one meal at a time.',
    iconClassName: 'bg-[#e3eed6] text-forest-800',
    icon: (
      <svg {...iconProps}>
        <path d="M4 12h16a8 8 0 0 1-16 0ZM9 4v4M12 3v5M15 4v4" />
      </svg>
    ),
  },
  {
    value: '850+',
    label: 'Active volunteers',
    description: 'Helping hands that make it all possible.',
    iconClassName: 'bg-[#f6e3d4] text-[#c0805a]',
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M3 20a6 6 0 0 1 12 0M15.5 4.6a3.5 3.5 0 0 1 0 6.8M17 14.3a6 6 0 0 1 4 5.7" />
      </svg>
    ),
  },
  {
    value: '03',
    label: 'Upcoming events',
    description: 'More chances to show up for our community.',
    iconClassName: 'bg-[#e6ead5] text-[#7a8a4a]',
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-mint">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Our community at a glance</SectionLabel>
              <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.15] tracking-[-0.06em] sm:text-6xl">
                Small actions.
                <br />
                <span className="text-sage">Real impact.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-ink-muted md:pb-2">
              Every meal, every helping hand, every gathering is one more step toward a stronger community.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <p className="mt-6 text-right text-xs text-ink-muted">Illustrative figures for this prototype.</p>
        </div>
      </section>

      <Mission />
    </>
  )
}
