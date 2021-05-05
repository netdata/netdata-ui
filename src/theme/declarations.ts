import { rawColors } from "src/theme/default/colors"

export type RawColorsT = typeof rawColors

export type AppColorsT = {
  primary: string
  accent: string
  main: string
  border: string
  borderSecondary: string
  disabled: string
  elementBackground: string
  mainBackground: string
  mainBackgroundDisabled: string
  success: string
  successLite: string

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
  key: string
  panel: string
  sectionHeaderBackground: string
  placeholder: string
  borderColor: string
  borderSecondaryColor: string
  separatorColor: string
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
