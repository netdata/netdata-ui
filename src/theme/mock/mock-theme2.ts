import createTheme, { ThemeAtom } from ".."
import * as constants from "./constants"
import { colors2 } from "./colors"

const root = {
  name: "MockTheme-2",
  version: "0.0.1",
}

const themeAtoms: ThemeAtom[] = [constants, colors2]
export const MockTheme2 = themeAtoms.reduce((acc, current) => createTheme(acc, current), root)
