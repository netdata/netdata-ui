import rawColors from "./rawColors"

export type RawColorsT = typeof rawColors

export type AppColorsT = {
  primary: string
  accent: string
  main: string
  border: string
  borderSecondary: string
  appSidebarBackground: string
  appBackground: string
  workspaceSidebarBackground: string
  workspaceBackground: string
  menuItemHover: string
  menuItemSelected: string
  menuItemSelectedHover: string
  menuItemSelectedText: string
  tableBorder: string
  tableHeaderBackground: string
  segmentedBackground: string
  segmentedSelectedBackground: string
  segmentedFocus: string
  segmentedAccentText: string
  segmentedAccentBackground: string
  segmentedBorder: string
  controlBackground: string
  controlHoverBackground: string
  controlPressedBackground: string
  controlText: string
  controlHoverText: string
  controlPressedText: string
  buttonNeutralFill: string
  buttonNeutralFillHover: string
  buttonNeutralFillPressed: string
  buttonNeutralText: string
  buttonNeutralBorder: string
  buttonNeutralBorderHover: string
  buttonNeutralHollowHover: string
  buttonNeutralHollowPressed: string
  buttonNeutralBorderlessHover: string
  buttonNeutralBorderlessPressed: string
  actionContrastText: string
  onColorDark: string
  onColorLight: string
  tabsBorder: string
  disabled: string
  dropdown: string
  elementBackground: string
  mainBackground: string
  mainBackgroundDisabled: string
  success: string
  successLite: string
  successBackground: string
  statusSuccessText: string
  statusErrorText: string
  statusWarningText: string
  statusMutedText: string
  labelTokenBackground: string
  labelTokenBorder: string
  labelTokenText: string
  patternTokenBackground: string
  patternTokenBorder: string
  patternTokenText: string
  patternTokenMark: string
  negatedTokenBackground: string
  negatedTokenBorder: string
  negatedTokenText: string
  negatedTokenMark: string
  syntaxKey: string
  syntaxNumber: string
  syntaxParen1: string
  syntaxParen2: string
  syntaxParen3: string
  linkedContentBackground: string
  errorContentBackground: string
  thresholdWarningText: string
  thresholdCriticalText: string
  chartSeries1: string
  chartSeries2: string
  chartSeries3: string
  chartSeries4: string
  chartWarningLine: string
  chartMutedLine: string
  warning: string
  warningLite: string
  warningBackground: string
  warningText: string
  error: string
  errorLite: string
  errorBackground: string
  errorText: string
  metricGap: string
  mapSearchHighlight: string
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
  cardBackground: string
  cardNestedBackground: string
  popoverBackground: string
  panel: string
  datePickerPausedBg: string
  datePickerPlayBg: string
  dateTimePickerChipBg: string
  dateTimePickerChipAccent: string
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
    FONT_MONOSPACE: string
    PILL_SUBTLE_TINT: string
  }
  colors: AppColorsT
  shadows: {
    segmentedSelected: string
    segmentedAccentSelected: string
  }
}

interface IDarkTheme {
  name: string
  version: string
  constants: {
    SIZE_SUB_UNIT: number
    SIZE_UNIT: number
    GUTTER_HEIGHT: number
    FONT_MONOSPACE: string
    PILL_SUBTLE_TINT: string
  }
  colors: AppColorsT
  shadows: {
    segmentedSelected: string
    segmentedAccentSelected: string
  }
}

declare const DefaultTheme: IDefaultTheme
declare const DarkTheme: IDarkTheme

export { DefaultTheme, DarkTheme }

declare function propOrElse<T = any, R = any>(pathName: string[], defaultValue: R): any

declare function getOrElse(pathName: string[], defaultValue: NumberOrStringT): any

declare function getSizeUnit({ theme }: WrappedTheme): number | undefined

declare function getColor(colorPath: string[] | string): any

declare function getRgbColor(colorPath: string[] | string, opacity: number): any
declare function getReadableColor(
  backgroundPath: string[] | string,
  darkColorPath?: string[] | string,
  lightColorPath?: string[] | string
): any

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
  getReadableColor,
  getSizeBy,
  getValidatedControlColor,
}
