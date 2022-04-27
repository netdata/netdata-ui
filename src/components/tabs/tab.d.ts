import { ChangeEvent, FC, ReactNode } from "react"

export interface TabProps {
  active?: boolean
  disabled?: boolean
  children?: ReactNode
  "data-testid"?: string
  index?: number
  label: JSX.Element | string
  maxWidth?: number | string
  minWidth?: number | string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  small?: boolean
  [s: string]: any
}

declare const Tab: FC<TabProps>

export { Tab }

export default Tab
