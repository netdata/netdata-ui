import { mergeDeepLeft } from "ramda"

export interface ThemeAtom {
  [key: string]: { [key: string]: string | number } | string | number
}

const createTheme = (theme: ThemeAtom = {}, extention: ThemeAtom): ThemeAtom =>
  mergeDeepLeft(theme, extention)

export default createTheme
