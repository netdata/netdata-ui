import { ChangeEvent, ExoticComponent, FC, ReactNode } from "react"

export interface TabsProps {
  className?: string
  "data-testid"?: string
  noDefaultBorder?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  selected: boolean
  TabContent?: ExoticComponent<{ children?: ReactNode }> | JSX.Element | undefined
  TabsHeader?: ExoticComponent<{ children?: ReactNode }> | JSX.Element | undefined
  [s: string]: any
}

declare const Tabs: FC<TabsProps>

export { Tabs }

export default Tabs
