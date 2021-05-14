import { useState, useCallback } from "react"

export const useTouchedState = ({ onBlur, defaultState = false }) => {
  const [touchedState, setTouchedState] = useState(defaultState)
  const handleBlur = useCallback(
    e => {
      if (!touchedState) {
        setTouchedState(true)
      }
      if (onBlur) {
        onBlur(e)
      }
    },
    [onBlur, touchedState]
  )

  return [touchedState, handleBlur, setTouchedState]
}
