import { useState } from 'react'

const VISIBLE_ROWS = 5

// A titled card with a table. Shows the first few rows, with a toggle to show the rest.
export default function DashboardCard({ eyebrow, title, badge, badgeClassName, columns, rows, renderRow }) {
  const [showAll, setShowAll] = useState(false)
  const visibleRows = showAll ? rows : rows.slice(0, VISIBLE_ROWS)

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_8px_24px_-12px_rgba(26,58,46,0.12)]">
      <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 sm:px-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest-800">{eyebrow}</p>
          <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.04em] text-forest-900">{title}</h2>
        </div>
        <span className={`mt-1 rounded-full px-3 py-1.5 text-[11px] font-bold ${badgeClassName}`}>{badge}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-line">
              {columns.map((column) => (
                <th
                  key={column.label}
                  scope="col"
                  className={`px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted sm:px-8 ${
                    column.align === 'right' ? 'text-right' : ''
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">{visibleRows.map(renderRow)}</tbody>
        </table>
      </div>

      {rows.length > VISIBLE_ROWS && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-auto border-t border-line px-6 py-4 text-left text-sm font-semibold text-forest-900 hover:text-sage sm:px-8"
        >
          {showAll ? 'Show less' : `Show all ${rows.length}`}
        </button>
      )}
    </section>
  )
}
