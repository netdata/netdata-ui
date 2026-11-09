import { CSSProperties, FC, MouseEvent, ReactNode, Ref } from "react"

import { FlexProps } from "@/components/templates/flex"

export interface TabProps extends FlexProps {
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
  appearance?: "raised" | "neutral"
  fontSize?: number | string
  lineHeight?: CSSProperties["lineHeight"]
  fontWeight?: number | string
  ref?: Ref<HTMLElement>
  accent?: boolean
  [s: string]: any
}

declare const Tab: FC<TabProps>

export { Tab }

export default Tab
