import background from "@/components/templates/mixins/background"
import borderMixIn from "@/components/templates/mixins/border"
import { getColor } from "@/theme"
import alignItems from "@/components/templates/mixins/alignItems"

const fontColor = ({ theme, color }) => {
  if (!color) return ""

  return `color: ${getColor(color)({ theme })};`
}

const clearEmptyLines = str => str.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")

const transforms = {
  border: borderMixIn,
  background: background,
  color: fontColor,
  alignItems: alignItems,
}

export const calculateStyles = ({ theme, ...styles }) => {
  let result = ""

  for (const key in styles) {
    if (transforms[key] !== undefined) {
      const transformFuction = transforms[key]
      const transformFuctionResult =
        transformFuction && typeof transformFuction === "function"
          ? transformFuction({ theme, ...styles })
          : ""
      result = result + transformFuctionResult
      continue
    }
    const value = styles[key]
    result = result + `${key}:${value};`
  }

  return result
}

export const pseudoSelectors = {
  _before: "&::before",
  _after: "&::after",
  _hover: "&:hover, &[data-hover]",
  _active: "&:active, &[data-active]",
  _focus: "&:focus, &[data-focus]",
  _focusWithin: "&:focus-within",
  _visited: "&:visited",
  _empty: "&:empty",
  _even: "&:nth-of-type(even)",
  _odd: "&:nth-of-type(odd)",
  _disabled: "&[disabled], &[aria-disabled=true], &[data-disabled]",
  _checked: "&[aria-checked=true]",
  _mixed: "&[aria-checked=mixed]",
  _selected: "&[aria-selected=true], [data-selected] > &",
  _invalid: "&[aria-invalid=true]",
  _pressed: "&[aria-pressed=true]",
  _readOnly: "&[aria-readonly=true], &[readonly]",
  _first: "&:first-of-type",
  _last: "&:last-of-type",
  _expanded: "&[aria-expanded=true]",
  _grabbed: "&[aria-grabbed=true]",
  _notFirst: "&:not(:first-of-type)",
  _notLast: "&:not(:last-of-type)",
  _groupHover: "[role=group]:hover &",
  _autofill: "&:-webkit-autofill",
  _placeholder: "&::placeholder",
}

export default ({ theme, ...props }) => {
  let pseudo = ""
  for (const prop in props) {
    if (prop in pseudoSelectors) {
      const pseudoProp = prop
      const pseudoStyles = props[pseudoProp]
      const styles = calculateStyles({ theme, ...pseudoStyles })

      pseudo =
        pseudo +
        `
      ${pseudoSelectors[pseudoProp]}{ 
        ${styles} 
      }`
    }
  }

  return clearEmptyLines(pseudo)
}
