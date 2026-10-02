const colors = ['bg-[#dcebc5]', 'bg-[#f6e3d4]', 'bg-[#e6ead5]', 'bg-[#dbe8e2]']

// "Maya Patel" -> "MP"; "Anonymous" -> "A"
function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

// Pick a color from the name so the same person always gets the same color.
function getColor(name) {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0)
  return colors[sum % colors.length]
}

export default function Avatar({ name }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-forest-900 ${getColor(name)}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}
