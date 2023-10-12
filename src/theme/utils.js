import get from "lodash/get"

export const propOrElse = (pathName, defaultValue) => props => get(props, pathName, defaultValue)

export const getOrElse =
  (pathName, defaultValue) =>
  ({ theme }) =>
    get(theme, pathName, defaultValue)

export const getSizeUnit = getOrElse(["constants", "SIZE_UNIT"], 8)

export const getColor = colorPath => {
  const colorPaths = Array.isArray(colorPath) ? colorPath : [colorPath]
  return getOrElse(["colors", ...colorPaths], colorPath || "#fff")
}

export const getRgbColor = (colorPath, opacity = 1) => {
  return ({ theme }) => {
    const color = getColor(colorPath)({ theme })
    const bigint = parseInt(color.substring(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
}

export const getSizeBy =
  (multiplier = 1) =>
  props =>
    isNaN(multiplier) ? multiplier : `${(getSizeUnit(props) || 0) * multiplier}px`

export const getValidatedControlColor =
  (defaultColorPath = "border", defaultDisabledPath = "disabled") =>
  ({ theme, success, error, disabled }) => {
    if (success) return getColor(["success"])({ theme })
    if (error) return getColor(["error"])({ theme })
    if (disabled) return getColor([defaultDisabledPath])({ theme })
    return getColor([defaultColorPath])({ theme })
  }
