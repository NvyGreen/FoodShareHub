import { createContext, useContext } from 'react'

export const SignUpsContext = createContext(null)

// Returns { signUps, openSignUp(event), getSpotsFilled(event) }. Must be used inside <SignUpsProvider>.
export function useSignUps() {
  return useContext(SignUpsContext)
}
