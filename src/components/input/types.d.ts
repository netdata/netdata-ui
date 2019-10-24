type ReactFocusEvent = import("react").FocusEvent
type ReactInputChangeEvent = import("react").ChangeEvent<HTMLInputElement>

type FocusEventHandler = (e: ReactFocusEvent) => void
type ChangeEventHandler = (e: ReactInputChangeEvent) => void
