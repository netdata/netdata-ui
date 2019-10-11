import createTheme, { ThemeAtom } from ".."
import { colors } from "./colors"
import * as constants from "./constants"

const root = {
  name: "Default",
  version: "0.0.1",
}

const themeAtoms: ThemeAtom[] = [constants, colors]

export const DefaultTheme = themeAtoms.reduce((acc, current) => createTheme(acc, current), root)
