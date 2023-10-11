import pseudos, { pseudoSelectors } from "./pseudos"
import { DefaultTheme as theme } from "@/theme/default"

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
    boxShadow: { size, color: "disabled" },
    border: { color: "disabled", side: "top", size: "1rem", type: "dashed" },
  }
  const pseudo = `
${pseudoSelectors["_hover"]}{
box-shadow:${size} ${disabledColor};
border-top: 1rem dashed ${disabledColor};
}`

  expect(pseudos({ theme, _hover })).toBe(pseudo)
})

it("render border and box shadow with multiple selectors (hover,active)", () => {
  const size = "0 0 0 1px"

  const _hover = {
    boxShadow: { size, color: "disabled" },
    border: { color: "disabled", side: "top", size: "1rem", type: "dashed" },
  }
  const _active = {
    boxShadow: { size, color: "disabled" },
    border: { color: "disabled", side: "top", size: "1rem", type: "dashed" },
  }
  const pseudo = `
${pseudoSelectors["_hover"]}{
box-shadow:${size} ${disabledColor};
border-top: 1rem dashed ${disabledColor};
}
${pseudoSelectors["_active"]}{
box-shadow:${size} ${disabledColor};
border-top: 1rem dashed ${disabledColor};
}`

  expect(pseudos({ theme, _hover, _active })).toBe(pseudo)
})
