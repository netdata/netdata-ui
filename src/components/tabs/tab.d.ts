import { FC, MouseEvent, ReactNode } from "react"

export interface TabProps {
  active?: boolean
  disabled?: boolean
  "data-testid"?: string
  count?: number
  icon?: string
  index?: number
  label: ReactNode | ((props: TabProps) => ReactNode)
  maxWidth?: number | string
  minWidth?: number | string
  onChange?: (index: number, event: MouseEvent<HTMLElement>) => void
  small?: boolean
  variant?: "line" | "contained"
  appearance?: "raised"
  accent?: boolean
  [s: string]: any
}

declare const Tab: FC<TabProps>

export { Tab }

export default Tab
