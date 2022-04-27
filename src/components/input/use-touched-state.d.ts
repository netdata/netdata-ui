import { FocusEvent } from "react"

export interface UseTouchedStateProps {
  onBlur?: (e: FocusEvent) => void
  defaultState?: boolean
}

declare const useTouchedState: (props: UseTouchedStateProps) =>
  [
    boolean,
    (e: FocusEvent) => void,
    (state: boolean) => void
  ]

export { useTouchedState }

export default useTouchedState
