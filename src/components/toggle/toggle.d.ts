import { FC, ReactNode, ElementType } from "react"
import { AlignSelfProps, MarginProps } from "@/mixins/types"

export interface ToggleProps extends AlignSelfProps, MarginProps {
  checked: boolean
  className?: string
  colored?: boolean
  "data-testid"?: string
  disabled?: boolean
  Label?: ElementType
  size?: "default" | "small" | "compact"
  variant?: "default" | "outline"
  activateOnEnter?: boolean
  labelGap?: number
  labelLeft?: ReactNode
  labelRight?: ReactNode
  [s: string]: any
}

declare const Toggle: FC<ToggleProps>

export { Toggle }

export default Toggle
