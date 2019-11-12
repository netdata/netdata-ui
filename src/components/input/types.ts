export type ReactFocusEvent = import("react").FocusEvent
export type ReactInputChangeEvent = import("react").ChangeEvent<HTMLInputElement>

export type FocusEventHandler = (e: ReactFocusEvent) => void
export type ChangeEventHandler = (e: ReactInputChangeEvent) => void

export type InstantFeedback = "all" | "positiveFirst"
