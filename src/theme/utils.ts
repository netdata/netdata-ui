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

export const getColor = (colorPath: string[] | string) => {
  const colorPaths: string[] = Array.isArray(colorPath) ? colorPath : [colorPath]
  return getOrElse(["colors", ...colorPaths], "#fff")
}

export const getRgbColor = (colorPath: string[] | string, opacity: number = 1) => {
  return ({ theme }) => {
    const color = getColor(colorPath)({ theme }) as string
    const bigint = parseInt(color.substring(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
}

export const getSizeBy = (multiplier: number = 1) => (props: WrappedTheme) => {
  const size = (getSizeUnit(props) || 0) * multiplier
  return `${size}px`
}

export const getGutterHeight = ({ theme }: WrappedTheme): string => {
  const gutterValue = path(["constants", "GUTTER_HEIGHT"], theme) || 0
  return `${gutterValue}px`
}

export const getValidatedControlColor = (defaultColorPath = "border") => ({
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
  if (success) return getColor(["success"])({ theme })
  if (error) return getColor(["error"])({ theme })
  if (disabled) return getColor(["disabled"])({ theme })
  return getColor([defaultColorPath])({ theme })
}
