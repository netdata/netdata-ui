import { css } from "styled-components"
import { getColor } from "@/theme"

export const dropdownBorder = { side: "all", size: "1px", type: "solid", color: "border" }

export const dropdownRound = 1.5

export const withDropdownDefaults = props =>
  props.background === "dropdown"
    ? {
        ...props,
        border: props.border === undefined ? dropdownBorder : props.border,
        round: props.round === undefined ? dropdownRound : props.round,
      }
    : props

// One elevation recipe for every floating layer; colour comes from the theme so dark mode gets a deeper shadow.
const shadowColor = getColor("dropdownShadow")

export const floatingShadow = css`
  box-shadow:
    0 4px 12px ${shadowColor},
    0 1px 2px ${shadowColor};
`

// Same recipe as a filter, so arrowed shapes (tooltip, popover) cast one silhouette instead of a box.
export const floatingDropShadow = css`
  filter: drop-shadow(0 4px 12px ${shadowColor}) drop-shadow(0 1px 2px ${shadowColor});
`
