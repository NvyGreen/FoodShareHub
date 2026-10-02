export const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-6 w-6',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const smallIconProps = { ...iconProps, className: 'h-4 w-4 shrink-0 text-ink-muted' }

const typeStyles = {
  Sorting: {
    className: 'bg-[#e3eed6] text-forest-800',
    icon: (
      <svg {...iconProps}>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5l8 4.5 8-4.5M12 12v9" />
      </svg>
    ),
  },
  Distribution: {
    className: 'bg-[#e6ead5] text-[#7a8a4a]',
    icon: (
      <svg {...iconProps}>
        <path d="M5 8h14l-1 12H6L5 8ZM9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  Delivery: {
    className: 'bg-[#f6e3d4] text-[#c0805a]',
    icon: (
      <svg {...iconProps}>
        <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
        <circle cx="7" cy="17.5" r="1.5" />
        <circle cx="17" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  Garden: {
    className: 'bg-[#dcebc5] text-sage',
    icon: (
      <svg {...iconProps}>
        <path d="M12 20v-8M12 12c0-4-3-6-7-6 0 4 3 6 7 6ZM12 10c0-3.5 2.5-5.5 7-5.5 0 3.5-2.5 5.5-7 5.5ZM7 20h10" />
      </svg>
    ),
  },
}

export function getTypeStyle(type) {
  return typeStyles[type] ?? typeStyles.Sorting
}
