import math from "polished/lib/math/math"
import { mergeDeepRight, path, pathOr } from "ramda"

export const extendTheme = (theme, extension) => mergeDeepRight(theme, extension)

export const propOrElse = (pathName, defaultValue) => props => pathOr(defaultValue, pathName, props)

export const getOrElse =
  (pathName, defaultValue) =>
  ({ theme }) =>
    pathOr(defaultValue, pathName, theme)

export const getSizeUnit = ({ theme }) => path(["constants", "SIZE_UNIT"], theme)

export const calcSize = expr => props => {
  if (expr) {
    const exprWithGap = expr.replace("_", `${getSizeUnit(props)}`)
    return math(exprWithGap)
  }
  return getSizeUnit(props)
}

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
  props => {
    const size = (getSizeUnit(props) || 0) * multiplier
    return `${size}px`
  }

export const getGutterHeight = ({ theme }) => {
  const gutterValue = path(["constants", "GUTTER_HEIGHT"], theme) || 0
  return `${gutterValue}px`
}

export const getValidatedControlColor =
  (defaultColorPath = "border", defaultDisabledPath = "disabled") =>
  ({ theme, success, error, disabled }) => {
    if (success) return getColor(["success"])({ theme })
    if (error) return getColor(["error"])({ theme })
    if (disabled) return getColor([defaultDisabledPath])({ theme })
    return getColor([defaultColorPath])({ theme })
  }
