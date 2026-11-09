import { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme"

export const dropdownBorder = { side: "all", size: "1px", type: "solid", color: "border" }

export const dropdownRound = 1.5
export const insetMenuRound = 3
export const insetMenuPadding = 3
export const insetMenuRowRound = 1.75
export const menuSelectionMarker = ({ theme }) =>
  `inset ${getSizeBy(0.375)({ theme })} 0 0 ${getColor("primary")({ theme })}`

export const getDropdownOptionColors = (theme, selectionStyle = "marker", surface = "dropdown") => {
  const { colors } = theme
  if (selectionStyle !== "quiet") {
    return {
      hover: colors.menuItemHover,
      selected: colors.menuItemSelected,
      selectedHover: colors.menuItemSelectedHover,
      selectedText: colors.menuItemSelectedText,
    }
  }

  const background = colors[surface] || colors.dropdown
  const contrast = colors.neutral[theme.name === "Dark" ? "white" : "black"]
  const mix = amount => `color-mix(in srgb, ${background}, ${contrast} ${amount}%)`

  return { hover: mix(9), selected: mix(14), selectedHover: mix(18), selectedText: colors.text }
}

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

export const floatingShadowValue = theme => {
  const color = shadowColor({ theme })
  return `0 4px 12px ${color}, 0 1px 2px ${color}`
}

export const floatingShadow = css`
  box-shadow: ${({ theme }) => floatingShadowValue(theme)};
`

// Same recipe as a filter, so arrowed shapes (tooltip, popover) cast one silhouette instead of a box.
export const floatingDropShadow = css`
  filter: drop-shadow(0 4px 12px ${shadowColor}) drop-shadow(0 1px 2px ${shadowColor});
`
