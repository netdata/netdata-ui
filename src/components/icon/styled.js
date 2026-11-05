import styled from "styled-components"
import { getColor } from "@/theme"
import margin from "@/mixins/margin"
import alignSelf from "@/mixins/alignSelf"
import cursor from "@/mixins/cursor"
import css from "@styled-system/css"

const SIZES = {
  small: "14px",
  medium: "16px",
  large: "24px",
}

// Without an explicit color, inherit the text color instead of the SVG default black (invisible in dark mode).
const styledColor = ({ theme, color }) =>
  `fill: ${color ? getColor(color)({ theme }) : "currentColor"};`
const styledHoverColor = ({ theme, hoverColor }) =>
  hoverColor && `&:hover { fill: ${getColor(hoverColor)({ theme })}; }`
const styledRotate = ({ rotate }) => !isNaN(rotate) && `transform: rotate(${rotate * 90}deg);`

const sx = props => css(props.sx)(props)

export const StyledIcon = styled.svg`
  height: ${({ size, height }) => height || SIZES[size]};
  width: ${({ size, width }) => width || SIZES[size]};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "unset")};
  ${styledRotate}
  ${styledColor}
  ${styledHoverColor}
  ${margin}
  ${alignSelf}
  ${cursor}
  ${sx}
`
