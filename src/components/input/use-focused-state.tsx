import { useState, useCallback } from "react"

type FocusHandler = FocusEventHandler
type BlurHandler = FocusEventHandler
type FocusedState = boolean

type UseFocusedState = ({
  onBlur,
  onFocus,
  defaultState,
}: {
  onBlur?: FocusEventHandler
  onFocus?: FocusEventHandler
  defaultState?: boolean
}) => [FocusedState, FocusHandler, BlurHandler]
export const useFocusedState: UseFocusedState = ({ defaultState = false, onBlur, onFocus }) => {
  const [focused, setFocused] = useState(defaultState)

  const handleFocus = useCallback(
    (e: ReactFocusEvent) => {
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
    (e: ReactFocusEvent) => {
      setFocused(false)
      if (onBlur) {
        onBlur(e)
      }
    },
    [onBlur]
  )

  return [focused, handleFocus, handleBlur]
}
