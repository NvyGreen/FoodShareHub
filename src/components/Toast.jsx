import { useEffect } from 'react'

export default function Toast({ title, message, onClose, duration = 6000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [title, onClose, duration])

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-md items-start gap-4 rounded-xl bg-forest-900 p-5 text-cream shadow-xl"
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-light text-forest-900">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="m5 12 5 5 9-10" />
        </svg>
      </span>
      <div className="flex-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-1 text-[13px] leading-5 text-cream/75">{message}</p>
      </div>
      <button type="button" onClick={onClose} className="text-cream/60 hover:text-cream" aria-label="Dismiss">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  )
}
