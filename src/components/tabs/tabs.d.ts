import { ChangeEvent, FC, ReactNode } from "react"

export interface TabsProps {
  className?: string
  "data-testid"?: string
  noDefaultBorder?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  selected: boolean
  TabContent?: ReactNode
  TabsHeader?: ReactNode
  variant?: "line" | "contained"
  [s: string]: any
}

declare const Tabs: FC<TabsProps>

export { Tabs }

export default Tabs
