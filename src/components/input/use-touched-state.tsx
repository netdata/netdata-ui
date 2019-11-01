import { useState, useCallback } from "react"
import { FocusEventHandler, ReactFocusEvent } from "./types"

type BlurHandler = FocusEventHandler
type TouchedState = boolean
type SetTouchedState = React.Dispatch<React.SetStateAction<boolean>>

type UseTouchedState = ({
  onBlur,
  defaultState,
}: {
  onBlur?: BlurHandler
  defaultState?: boolean
}) => [TouchedState, BlurHandler, SetTouchedState]

export const useTouchedState: UseTouchedState = ({ onBlur, defaultState = false }) => {
  const [touchedState, setTouchedState] = useState(defaultState)
  const handleBlur = useCallback(
    (e: ReactFocusEvent) => {
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
