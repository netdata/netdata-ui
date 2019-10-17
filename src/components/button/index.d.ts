export { MDXButton as default } from "./button"

export interface MDXButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
}
