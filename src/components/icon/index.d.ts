import { ReactNode } from "react"
import { MarginProps, AlignSelfProps, ColorType } from "src/mixins/types"

export interface IconProps extends MarginProps, AlignSelfProps {
  name: string
  size?: "small" | "medium" | "large"
  className?: string
  onClick?: (arg?: any) => void
  title?: string
  disabled?: boolean
  color?: ColorType
  hoverColor?: ColorType
  width?: string
  height?: string
}

declare const Icon: React.FC<IconProps>

export { Icon }

export default Icon
