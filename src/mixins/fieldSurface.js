import { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme"

export const fieldSurfaceRound = 0.75

export const chevronMark = {
  content: '""',
  boxSizing: "border-box",
  width: "6px",
  height: "6px",
  borderRight: "1.5px solid currentColor",
  borderBottom: "1.5px solid currentColor",
  transform: "translateY(-2px) rotate(45deg)",
}

export const fieldHaloShadow = color => `0 0 0 3px color-mix(in srgb, ${color} 22%, transparent)`

export const fieldHalo = (color = "segmentedFocus") => css`
  box-shadow: ${props => fieldHaloShadow(getColor(color)(props))};
`

export const fieldSurface = css`
  background: ${getColor("panelBg")};
  border: 1px solid ${getColor("controlBorder")};
  border-radius: ${getSizeBy(fieldSurfaceRound)};

  &:hover {
    border-color: ${getColor("inputBorderHover")};
  }

  &:focus {
    outline: none;
    border-color: ${getColor("segmentedFocus")};
    ${fieldHalo()}
  }
`
