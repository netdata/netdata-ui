import styled from "styled-components"
import { getColor } from "@/theme"
import margin from "@/mixins/margin"
import alignSelf from "@/mixins/alignSelf"

const SIZES = {
  small: "16px",
  medium: "24px",
  large: "40px",
}

const styledColor = ({ theme, color }) => color && `fill: ${getColor(color)({ theme })};`
const styledHoverColor = ({ theme, hoverColor }) =>
  hoverColor && `&:hover { fill: ${getColor(hoverColor)({ theme })}; }`
const styledRotate = ({ rotate }) => !isNaN(rotate) && `transform: rotate(${rotate * 90}deg);`

export const StyledIcon = styled.svg`
  height: ${({ size, height }) => height || SIZES[size]};
  width: ${({ size, width }) => width || SIZES[size]};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "unset")};
  ${styledRotate}
  ${styledColor}
  ${styledHoverColor}
  ${margin}
  ${alignSelf}
`
