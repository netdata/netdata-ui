export type RawColorsT = {
  transparent: {
    full: string
    semi: string
  }
  white: {
    pure: string
    almost: string
  }
  gray: {
    limedSpruce: string
    bombay: string
    silverSand: string
    gallery: string
    guyabano: string
    gainsboro: string
    midnight: string
    nepal: string
    solitude: string
    shuttle: string
    tangaroa: string
    chambray: string
    wedgewood: string
    arsenic: string
    slate: string
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
  }
  purple: {
    mauve: string
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
