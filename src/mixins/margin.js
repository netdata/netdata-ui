const getUnit = value => (value === 0 ? "0" : `${value}px`)

export const getDimension = (theme, size) =>
  typeof size === "number" ? getUnit(theme.constants.SIZE_SUB_UNIT * size) : "auto"

export const getDimensions = (theme, value) =>
  value.map(size => getDimension(theme, size)).join(" ")

export default ({ theme, margin }) => {
  if (!margin) return ""

  if (Array.isArray(margin) && margin.length >= 1 && margin.length <= 4) {
    return `margin: ${getDimensions(theme, margin)};`
  }

  // eslint-disable-next-line no-console
  console.error("Please provide an array (max 4 elements) for `margin` style helper.")

  return ""
}
