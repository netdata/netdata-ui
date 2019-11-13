import math from "polished/lib/math/math"
import { mergeDeepRight, path, pathOr } from "ramda"
import { ContstructedTheme, NumberOrStringT, WrappedTheme } from "./declarations"

export const extendTheme = (
  theme: ContstructedTheme,
  extension: ContstructedTheme
): ContstructedTheme => mergeDeepRight(theme, extension)

export const propOrElse = <T = any, R = any>(pathName: string[], defaultValue: R) => (props: T) =>
  pathOr(defaultValue, pathName, props)

export const getOrElse = (pathName: string[], defaultValue: NumberOrStringT) => ({
  theme,
}: WrappedTheme) => pathOr(defaultValue, pathName, theme)

export const getSizeUnit = ({ theme }: WrappedTheme): number | undefined =>
  path(["constants", "SIZE_UNIT"], theme)

export const calcSize = (expr?: string) => (props: WrappedTheme) => {
  if (expr) {
    const exprWithGap = expr.replace("_", `${getSizeUnit(props)}`)
    return math(exprWithGap)
  }
  return getSizeUnit(props)
}

export const getColor = (colorPath: string[]) => getOrElse(["colors", ...colorPath], "#fff")

export const getSizeBy = (multiplier: number = 1) => (props: WrappedTheme) => {
  const size = (getSizeUnit(props) || 0) * multiplier
  return `${size}px`
}

export const getGutterHeight = ({ theme }: WrappedTheme): string => {
  const gutterValue = path(["constants", "GUTTER_HEIGHT"], theme) || 0
  return `${gutterValue}px`
}

export const getBorderSizeBy = (multiplier: number = 1) => (props: WrappedTheme) => {
  const { theme } = props
  const borderBorderSize: number | undefined = path(["constants", "BORDER_SIZE"], theme) || 0
  const borderValue = borderBorderSize * multiplier
  return `${borderValue}px`
}

export const getValidatedControlColor = (defaultColorPath = "borderColor") => ({
  theme,
  success,
  error,
  disabled,
}: {
  disabled?: boolean
  error?: string | boolean
  success?: string | boolean
  theme: ContstructedTheme
}) => {
  if (success) {
    return getColor(["success"])({ theme })
  }
  if (error) {
    return getColor(["error"])({ theme })
  }
  if (disabled) {
    return getColor(["gray", "silverSand"])({ theme })
  }
  return getColor([defaultColorPath])({ theme })
}
