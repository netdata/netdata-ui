const getUnit = value => (value === 0 ? "0" : `${value}px`)

export const getDimension = (theme, size) =>
  typeof size === "number" ? getUnit(theme.constants.SIZE_SUB_UNIT * size) : "auto"

export const getDimensions = (theme, value) =>
  value.map(size => getDimension(theme, size)).join(" ")
