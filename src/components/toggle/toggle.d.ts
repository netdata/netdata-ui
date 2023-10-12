import { FC, ReactNode } from "react"
import { AlignSelfProps, MarginProps } from "@/mixins/types"

export interface ToggleProps extends AlignSelfProps, MarginProps {
  checked: boolean
  className?: string
  colored?: boolean
  "data-testid"?: string
  disabled?: boolean
  Label: ReactNode
  labelLeft?: string
  labelRight?: string
  [s: string]: any
}

declare const Toggle: FC<ToggleProps>

export { Toggle }

export default Toggle
