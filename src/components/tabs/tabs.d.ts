import { ChangeEvent, FC } from "react"

export interface TabsProps {
  className?: string
  "data-testid"?: string
  noDefaultBorder?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  selected: boolean
  TabContent?: JSX.Element
  TabsHeader?: JSX.Element
  [s: string]: any
}

declare const Tabs: FC<TabsProps>

export { Tabs }

export default Tabs
