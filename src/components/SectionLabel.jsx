export default function SectionLabel({ children }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-800">
      <span className="h-px w-6 bg-sage" aria-hidden="true" />
      {children}
    </p>
  )
}
