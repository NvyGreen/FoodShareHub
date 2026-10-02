import { useId } from 'react'
import { Link, matchPath } from 'react-router-dom'

// Routes without a page yet. Remove a route from this list once its page is built.
const COMING_SOON = []

export default function AppLink({ to, className = '', children }) {
  const tooltipId = useId()

  if (!COMING_SOON.some((pattern) => matchPath(pattern, to))) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  // Drop hover styles so the disabled link doesn't look clickable.
  const disabledClassName = className
    .split(' ')
    .filter((name) => !name.startsWith('hover:'))
    .join(' ')

  return (
    <span
      role="link"
      aria-disabled="true"
      aria-describedby={tooltipId}
      tabIndex={0}
      className={`group relative cursor-not-allowed ${disabledClassName}`}
    >
      {children}
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-forest-900 px-2.5 py-1.5 text-xs font-semibold tracking-normal normal-case text-cream opacity-0 ring-1 ring-cream/20 transition group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        Coming soon
      </span>
    </span>
  )
}
