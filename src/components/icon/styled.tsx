import styled from "styled-components"
import { getColor } from "src/theme"
import margin from "src/mixins/margin"
import alignSelf from "src/mixins/alignSelf"

const SIZES = {
  small: "16px",
  medium: "24px",
  large: "40px",
}

const styledColor = ({ theme, color }) => color && `fill: ${getColor(color)({ theme })};`
const styledhoverColor = ({ theme, hoverColor }) =>
  hoverColor && `&:hover { fill: ${getColor(hoverColor)({ theme })}; }`

export const StyledIcon = styled.svg<{
  size: string
  disabled: boolean
  margin?: any
  alignSelf?: any
  color?: any
  hoverColor?: any
}>`
  height: ${({ size }) => SIZES[size]};
  width: ${({ size }) => SIZES[size]};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "unset")};
  ${styledColor as any}
  ${styledhoverColor as any}
  ${margin as any}
  ${alignSelf as any}
`
