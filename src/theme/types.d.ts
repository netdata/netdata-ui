type RawColorsT = {
  white: {
    pure: string
  }
  gray: {
    limedSpruce: string
    silverSand: string
    gallery: string
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

type AppColorsT = {}

type NumberOrStringT = number | string

type ThemeAtom = string | number | { [key: string]: string | number | ThemeAtom }

interface ContstructedTheme {
  name: string
  version: string
  [key: string]: ThemeAtom
}

interface WrappedTheme {
  theme: ContstructedTheme
}
