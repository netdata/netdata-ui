import rawColors from "./rawColors"

export type RawColorsT = typeof rawColors

export type AppColorsT = {
  primary: string
  accent: string
  main: string
  border: string
  borderSecondary: string
  tabsBorder: string
  disabled: string
  dropdown: string
  elementBackground: string
  mainBackground: string
  mainBackgroundDisabled: string
  success: string
  successLite: string
  successBackground: string
  warning: string
  warningLite: string
  warningBackground: string
  warningText: string
  error: string
  errorLite: string
  errorBackground: string
  errorText: string
  attention: string
  attentionSecondary: string
  separator: string
  controlFocused: string
  selected: string
  tooltip: string
  bright: string
  text: string
  textFocus: string
  sectionHeaderBackground: string
  placeholder: string
  key: string
  panel: string
}

export type NumberOrStringT = number | string

export type ThemeAtom = string | number | { [key: string]: string | number | ThemeAtom }

export interface ContstructedTheme {
  name: string
  version: string
  [key: string]: ThemeAtom
}

export interface WrappedTheme {
  theme: ContstructedTheme
}

interface IDefaultTheme {
  name: string
  version: string
  constants: {
    SIZE_SUB_UNIT: number
    SIZE_UNIT: number
    GUTTER_HEIGHT: number
  }
  colors: AppColorsT
}

interface IDarkTheme {
  name: string
  version: string
  constants: {
    SIZE_SUB_UNIT: number
    SIZE_UNIT: number
    GUTTER_HEIGHT: number
  }
  colors: AppColorsT
}

declare const DefaultTheme: IDefaultTheme
declare const DarkTheme: IDarkTheme

export { DefaultTheme, DarkTheme }

declare function propOrElse<T = any, R = any>(pathName: string[], defaultValue: R): any

declare function getOrElse(pathName: string[], defaultValue: NumberOrStringT): any

declare function getSizeUnit({ theme }: WrappedTheme): number | undefined

declare function getColor(colorPath: string[] | string): any

declare function getRgbColor(colorPath: string[] | string, opacity: number): any

declare function getSizeBy(multiplier?: number): (props: WrappedTheme) => any

declare function getValidatedControlColor(
  defaultColorPath: string
): ({
  theme,
  success,
  error,
  disabled,
}: {
  disabled?: boolean
  error?: string | boolean
  success?: string | boolean
  theme: ContstructedTheme
}) => any

export {
  propOrElse,
  getOrElse,
  getSizeUnit,
  getColor,
  getRgbColor,
  getSizeBy,
  getValidatedControlColor,
}
