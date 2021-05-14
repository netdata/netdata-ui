import { useState, useCallback } from "react"

export const useFocusedState = ({ defaultState = false, onBlur, onFocus }) => {
  const [focused, setFocused] = useState(defaultState)

  const handleFocus = useCallback(
    e => {
      if (!focused) {
        setFocused(true)
      }
      if (onFocus) {
        onFocus(e)
      }
    },
    [onFocus, focused]
  )
  const handleBlur = useCallback(
    e => {
      setFocused(false)
      if (onBlur) {
        onBlur(e)
      }
    },
    [onBlur]
  )

  return [focused, handleFocus, handleBlur]
}
