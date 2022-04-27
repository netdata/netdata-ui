import { ChangeEvent, ExoticComponent, FC, ReactNode } from "react"

export interface TabsProps {
  children: ReactNode
  className?: string
  "data-testid"?: string
  noDefaultBorder?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  selected: boolean
  TabContent?: ExoticComponent<{ children?: ReactNode }> | undefined
  TabsHeader?: ExoticComponent<{ children?: ReactNode }> | undefined
  [s: string]: any
}

declare const Tabs: FC<TabsProps>

export { Tabs }

export default Tabs
