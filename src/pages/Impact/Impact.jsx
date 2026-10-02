import Avatar from '../../components/Avatar.jsx'
import DashboardCard from '../../components/DashboardCard.jsx'
import SectionLabel from '../../components/SectionLabel.jsx'
import { useSignUps } from '../../context/SignUpsContext.js'
import mockData from '../../data/mock-data.json'
import { formatDuration, formatEventDate } from '../../utils/dates.js'

const eventsById = new Map(mockData.events.map((event) => [event.id, event]))

// Donations, newest first. They don't change during a session, so sort once.
const donations = [...mockData.donations].sort((a, b) => b.date.localeCompare(a.date))
const donationTotal = donations.reduce((total, donation) => total + donation.amount, 0)

const formatMoney = (amount) => `$${amount.toLocaleString('en-US')}`
const formatShortDate = (date) => formatEventDate(date, { month: 'short', day: 'numeric' })

// Fixed row height so both tables line up, even though volunteer rows have a second line (hours).
const cellClassName = 'h-18 px-6 py-3 text-[13px] text-ink-muted sm:px-8'

function StatCard({ label, value, barClassName }) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-6 shadow-[0_8px_24px_-12px_rgba(26,58,46,0.12)] sm:p-8">
      <span className={`block h-1 w-12 rounded-full ${barClassName}`} aria-hidden="true" />
      <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-800">{label}</p>
      <p className="mt-2 font-display text-5xl font-medium tracking-[-0.04em] text-forest-900">{value}</p>
    </div>
  )
}

export default function Impact() {
  const { signUps } = useSignUps()

  // Mock volunteers plus anyone who signed up this session, latest event date first.
  const volunteers = [...mockData.volunteers, ...signUps]
    .map((volunteer) => ({ ...volunteer, event: eventsById.get(volunteer.eventId) }))
    .filter((volunteer) => volunteer.event)
    .sort((a, b) => b.event.date.localeCompare(a.event.date))

  return (
    <section className="bg-mint">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionLabel>Community dashboard</SectionLabel>
        <h1 className="mt-8 font-display text-6xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-7xl">
          Good in motion<span className="text-peach">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-[15px] leading-[1.8] text-ink-muted">
          A simple snapshot of the people showing up and the generosity helping FoodShare Hub serve more neighbors.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <StatCard label="Active volunteers" value={volunteers.length} barClassName="bg-[#dcebc5]" />
          <StatCard label="Donations" value={formatMoney(donationTotal)} barClassName="bg-[#e6ead5]" />
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          <DashboardCard
            eyebrow="Helping hands"
            title="Recent volunteers"
            badge={`${volunteers.length} active`}
            badgeClassName="bg-[#dcebc5] text-forest-800"
            columns={[{ label: 'Volunteer' }, { label: 'Event' }, { label: 'Date' }]}
            rows={volunteers}
            renderRow={(volunteer) => (
              <tr key={`${volunteer.eventId}-${volunteer.email}`}>
                <td className={cellClassName}>
                  <div className="flex items-center gap-3">
                    <Avatar name={volunteer.name} />
                    <div>
                      <p className="text-sm font-semibold text-forest-900">{volunteer.name}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {formatDuration(volunteer.event.startTime, volunteer.event.endTime)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={cellClassName}>{volunteer.event.title}</td>
                <td className={`${cellClassName} whitespace-nowrap`}>{formatShortDate(volunteer.event.date)}</td>
              </tr>
            )}
          />

          <DashboardCard
            eyebrow="Generosity in action"
            title="Recent donations"
            badge={`${formatMoney(donationTotal)} total`}
            badgeClassName="bg-[#f6e3d4] text-[#9a5a35]"
            columns={[{ label: 'Donor' }, { label: 'Date' }, { label: 'Amount', align: 'right' }]}
            rows={donations}
            renderRow={(donation) => (
              <tr key={donation.id}>
                <td className={cellClassName}>
                  <div className="flex items-center gap-3">
                    <Avatar name={donation.donor} />
                    <p className="text-sm font-semibold text-forest-900">{donation.donor}</p>
                  </div>
                </td>
                <td className={`${cellClassName} whitespace-nowrap`}>{formatShortDate(donation.date)}</td>
                <td className={`${cellClassName} text-right text-sm font-bold text-forest-900`}>
                  {formatMoney(donation.amount)}
                </td>
              </tr>
            )}
          />
        </div>

        <p className="mt-6 text-right text-xs text-ink-muted">Sample data for this practice project.</p>
      </div>
    </section>
  )
}
