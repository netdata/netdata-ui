import { SyntheticEvent } from "react"

export interface MDXButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
}

export { MDXButton as default } from "./button"
