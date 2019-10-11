import createTheme, { ThemeAtom } from ".."
import * as constants from "./constants"
import { colors } from "./colors"

const root = {
  name: "MockTheme",
  version: "0.0.1",
}

const themeAtoms: ThemeAtom[] = [constants, colors]

export const MockTheme = themeAtoms.reduce((acc, current) => createTheme(acc, current), root)
