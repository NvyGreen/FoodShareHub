import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="FoodShare Hub home">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d9eac0]">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-forest-900" fill="currentColor" aria-hidden="true">
          <path d="M11 13C11 8.6 7.9 6 4 6c0 4.2 3 7 7 7Z" />
          <path d="M13 12c0-4 2.8-6.5 7-6.5 0 4-2.9 6.5-7 6.5Z" />
          <rect x="11" y="10" width="2" height="9" rx="1" />
          <rect x="6" y="18" width="12" height="2" rx="1" />
        </svg>
      </span>
      <span
        className={`font-display text-[22px] font-bold tracking-[-0.04em] ${
          light ? 'text-cream' : 'text-forest-900'
        }`}
      >
        foodshare<span className="font-medium">hub</span>
        <span className="text-sage">.</span>
      </span>
    </Link>
  )
}
