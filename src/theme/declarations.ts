export type RawColorsT = {
  white: {
    pure: string
  }
  gray: {
    limedSpruce: string
    silverSand: string
    gallery: string
    bombay: string
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
  }
}

export type AppColorsT = {}

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
