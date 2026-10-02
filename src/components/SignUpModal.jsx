import { useEffect, useRef, useState } from 'react'
import { formatEventDate, formatTimeRange } from '../utils/dates.js'

const availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Evenings', 'Flexible']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClassName =
  'mt-2 w-full rounded-lg border border-forest-900/15 bg-white px-4 py-3 text-sm text-forest-900 outline-none focus:border-forest-800 focus:ring-2 focus:ring-forest-800/15'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.12em] text-forest-900">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-[#b5653a]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function SignUpModal({ event, isAlreadySignedUp, onSubmit, onClose }) {
  const dialogRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', availability: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dialogRef.current.showModal()
  }, [])

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const name = form.name.trim()
    const email = form.email.trim()
    const nextErrors = {}

    if (!name) nextErrors.name = 'Please enter your name.'
    if (!email) nextErrors.email = 'Please enter your email.'
    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = 'Please enter a valid email.'
    else if (isAlreadySignedUp(event.id, email)) nextErrors.email = 'This email is already signed up for this event.'
    if (!form.availability) nextErrors.availability = 'Please choose your availability.'

    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSubmit({
      eventId: event.id,
      name: form.name.trim(),
      email: form.email.trim(),
      availability: form.availability,
    })
  }

  // Clicks on the dimmed backdrop land on the <dialog> itself, not its content.
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="sign-up-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-cream p-0 text-forest-900 shadow-2xl backdrop:bg-forest-900/50"
    >
      <form onSubmit={handleSubmit} noValidate className="p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">Sign up</p>
        <h2 id="sign-up-title" className="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">
          {event.title}
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          {formatEventDate(event.date)} · {formatTimeRange(event.startTime, event.endTime)}
        </p>

        <div className="mt-8 space-y-5">
          <Field id="sign-up-name" label="Name" error={errors.name}>
            <input
              id="sign-up-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={updateField('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'sign-up-name-error' : undefined}
              className={inputClassName}
            />
          </Field>

          <Field id="sign-up-email" label="Email" error={errors.email}>
            <input
              id="sign-up-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={updateField('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'sign-up-email-error' : undefined}
              className={inputClassName}
            />
          </Field>

          <Field id="sign-up-availability" label="Availability" error={errors.availability}>
            <select
              id="sign-up-availability"
              value={form.availability}
              onChange={updateField('availability')}
              aria-invalid={Boolean(errors.availability)}
              aria-describedby={errors.availability ? 'sign-up-availability-error' : undefined}
              className={inputClassName}
            >
              <option value="" disabled>
                Choose one
              </option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-forest-900/20 px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:border-forest-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-700"
          >
            Submit
          </button>
        </div>
      </form>
    </dialog>
  )
}
