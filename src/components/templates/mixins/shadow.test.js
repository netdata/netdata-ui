import shadow from "./shadow"
import { DefaultTheme as theme } from "src/theme/default"

it("renders", () => {
  expect(shadow({ theme })).toBe("")
})

it("render box shadow with color", () => {
  const size = "0 0 0 1px"
  const boxShadow = { size, color: "disabled" }
  expect(shadow({ theme, boxShadow })).toBe(`box-shadow:${size} ${theme.colors.disabled}`)
})

it("renders box shadow without color", () => {
  const size = "0 0 0 1px"
  const boxShadow = { size }
  expect(shadow({ theme, boxShadow })).toBe(`box-shadow:${size} `)
})

it("renders empty box shadow when we have not declared size of shadow", () => {
  const size = ""
  const boxShadow = { size }
  expect(shadow({ theme, boxShadow })).toBe("")
})
