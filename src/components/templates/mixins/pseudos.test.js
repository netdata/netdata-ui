import pseudos, { pseudoSelectors } from "./pseudos"
import { DefaultTheme as theme } from "src/theme/default"

const disabledColor = theme.colors.disabled
it("renders", () => {
  expect(pseudos({ theme })).toBe("")
})

it("render box shadow (hover) ", () => {
  const size = "0 0 0 1px"
  const _hover = { boxShadow: { size, color: "disabled" } }
  const pseudo = `
${pseudoSelectors["_hover"]}{
box-shadow:${size} ${disabledColor};
}`

  expect(pseudos({ theme, _hover })).toBe(pseudo)
})

it("render border (hover)", () => {
  const _hover = { border: { color: "disabled", side: "top", size: "1rem", type: "dashed" } }
  const pseudo = `
${pseudoSelectors["_hover"]}{
border-top: 1rem dashed ${disabledColor};
}`

  expect(pseudos({ theme, _hover })).toBe(pseudo)
})

it("render border and box shadow (hover)", () => {
  const size = "0 0 0 1px"

  const _hover = {
    border: { color: "disabled", side: "top", size: "1rem", type: "dashed" },
    boxShadow: { size, color: "disabled" },
  }
  const pseudo = `
${pseudoSelectors["_hover"]}{
box-shadow:${size} ${disabledColor};
border-top: 1rem dashed ${disabledColor};
}`

  expect(pseudos({ theme, _hover })).toBe(pseudo)
})
