import { useCallback, useState } from 'react'
import SignUpModal from '../components/SignUpModal.jsx'
import Toast from '../components/Toast.jsx'
import mockData from '../data/mock-data.json'
import { SignUpsContext } from './SignUpsContext.js'

// Holds sign-ups made in this session. They live in memory only, so a page refresh clears them.
export default function SignUpsProvider({ children }) {
  const [signUps, setSignUps] = useState([])
  const [activeEvent, setActiveEvent] = useState(null)
  const [confirmation, setConfirmation] = useState(null)
  const closeConfirmation = useCallback(() => setConfirmation(null), [])

  // The mock data's spotsFilled already counts its volunteers, so only add new sign-ups on top.
  const getSpotsFilled = (event) => event.spotsFilled + signUps.filter((s) => s.eventId === event.id).length

  const isAlreadySignedUp = (eventId, email) =>
    [...mockData.volunteers, ...signUps].some(
      (v) => v.eventId === eventId && v.email.toLowerCase() === email.toLowerCase(),
    )

  const handleSubmit = (signUp) => {
    setSignUps((prev) => [...prev, signUp])
    setConfirmation({ name: signUp.name.split(' ')[0], eventTitle: activeEvent.title })
    setActiveEvent(null)
  }

  return (
    <SignUpsContext.Provider value={{ openSignUp: setActiveEvent, getSpotsFilled }}>
      {children}

      {activeEvent && (
        <SignUpModal
          event={activeEvent}
          isAlreadySignedUp={isAlreadySignedUp}
          onSubmit={handleSubmit}
          onClose={() => setActiveEvent(null)}
        />
      )}

      {confirmation && (
        <Toast
          title={`Thanks, ${confirmation.name}! You're signed up for ${confirmation.eventTitle}.`}
          message="Demo only: your spot is held until you refresh the page. Nothing was sent or saved anywhere."
          onClose={closeConfirmation}
        />
      )}
    </SignUpsContext.Provider>
  )
}
