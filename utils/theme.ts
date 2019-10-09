import { view, lensPath, compose, Lens } from "ramda"

type NumberOrStringT = number | string

type AlternateT = NumberOrStringT | (<T>(x?: WrappedTheme & T) => NumberOrStringT)

interface DummyTheme {
  [key: string]: NumberOrStringT
  GRID_GAP: number
}

interface WrappedTheme {
  theme: DummyTheme
}

const themeView = (lens: Lens) => (theme: DummyTheme) =>
  view<DummyTheme, NumberOrStringT>(lens, theme)

const takePath = (path: string | string[]): Lens =>
  lensPath(typeof path === "string" ? [path] : path)

const lensAccess = compose(
  themeView,
  takePath
)

export const get = (key: string | string[]) => ({ theme }: WrappedTheme) =>
  lensAccess(key)(theme) || ""

export const getOrElse = <T>(key: string, alternate: AlternateT = "") => ({
  theme,
  ...props
}: WrappedTheme & T) =>
  get(key)({ theme }) ||
  (alternate instanceof Function ? alternate({ theme, ...props }) : alternate)
