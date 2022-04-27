import { FC } from "react"
import { AlignSelfProps, MarginProps } from "src/mixins/types"

export interface ToggleProps extends AlignSelfProps, MarginProps {
  checked: boolean
  className?: string
  colored?: boolean
  "data-testid"?: string
  disabled?: boolean
  Label: JSX.Element
  labelLeft?: string
  labelRight?: string
  [s: string]: any
}

declare const Toggle: FC<ToggleProps>

export { Toggle }

export default Toggle
