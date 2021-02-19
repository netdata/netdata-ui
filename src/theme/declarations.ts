export type RawColorsT = {
  transparent: {
    full: string
    semi: string
    popover: string
  }
  white: {
    pure: string
    almost: string
  }
  black: {
    pure: string
  }
  gray: {
    limedSpruce: string
    bombay: string
    bombayLite: string
    silverSand: string
    gallery: string
    guyabano: string
    gainsboro: string
    midnight: string
    nepal: string
    solitude: string
    shuttle: string
    shuttleGray: string
    tangaroa: string
    chambray: string
    wedgewood: string
    pigeonPost: string
    arsenic: string
    slateGray: string
    slate: string
    blackPearl: string
    aluminium: string
    vulcan: string
    bunker: string
    cod: string
    trout: string
    blackRussian: string
  }
  green: {
    malachite: string
    greenHaze: string
    algaeGreen: string
    clearDay: string
  }
  red: {
    outrageousOrange: string
    redOrange: string
    roseWhite: string
  }
  yellow: {
    amber: string
    safron: string
    orangeYellow: string
    safronMango: string
  }
  blue: {
    blueBerry: string
    anakiwa: string
    anakiwaLight: string
    patternsBlue: string
    catalina: string
    pattens: string
    nile: string
    polo: string
    matisse: string
    teal: string
    madison: string
  }
  purple: {
    mauve: string
    daisy: string
  }
}

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
  warning: string
  error: string
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
