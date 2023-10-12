import { FC } from "react"
import { AlignSelfProps, ColorType, MarginProps, RefType } from "@/mixins/types"

export interface IconProps extends MarginProps, AlignSelfProps {
  className?: string
  color?: ColorType
  disabled?: boolean
  "data-testid"?: string
  height?: string
  hoverColor?: ColorType
  name: string
  onClick?: (arg?: any) => void
  ref?: RefType
  size?: "small" | "medium" | "large"
  title?: string
  width?: string
}

declare const Icon: FC<IconProps>

export { Icon }

export default Icon
