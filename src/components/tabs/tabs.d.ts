import { ComponentType, FC } from "react"

export interface TabsProps {
  className?: string
  "data-testid"?: string
  noDefaultBorder?: boolean
  onChange?: (index: number) => void
  selected?: number
  TabContent?: ComponentType<any>
  TabsHeader?: ComponentType<any>
  variant?: "line" | "contained"
  orientation?: "horizontal" | "vertical"
  appearance?: "raised" | "neutral"
  accent?: boolean
  [s: string]: any
}

declare const Tabs: FC<TabsProps>

export { Tabs }

export default Tabs
