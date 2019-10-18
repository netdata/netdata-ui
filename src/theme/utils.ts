import math from "polished/lib/math/math"
import { mergeDeepRight, path, pathOr } from "ramda"

export type ThemeAtom = string | number | { [key: string]: string | number | ThemeAtom }

type NumberOrStringT = number | string

export interface ContstructedTheme {
  name: string
  version: string
  [key: string]: ThemeAtom
}

export const extendTheme = (
  theme: ContstructedTheme,
  extension: ContstructedTheme
): ContstructedTheme => mergeDeepRight(theme, extension)

export interface WrappedTheme {
  theme: ContstructedTheme
}

export const propOrElse = <T>(pathName: string[], defaultValue: any) => (props: T) =>
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

export const getSizeBy = (multiplier: number) => (props: WrappedTheme) => {
  const size = (getSizeUnit(props) || 0) * multiplier
  return `${size}px`
}
