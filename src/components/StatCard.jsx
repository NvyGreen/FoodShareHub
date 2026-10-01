export default function StatCard({ icon, iconClassName, value, label, description }) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-8 shadow-[0_8px_24px_-12px_rgba(26,58,46,0.12)]">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconClassName}`}>{icon}</div>
      <p className="mt-12 font-display text-6xl font-medium tracking-[-0.04em] text-forest-900">{value}</p>
      <h3 className="mt-3 text-[15px] font-bold text-forest-900">{label}</h3>
      <p className="mt-3 text-[13px] text-ink-muted">{description}</p>
    </div>
  )
}
