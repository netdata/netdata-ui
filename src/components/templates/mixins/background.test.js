import { DefaultTheme as theme } from "@/theme/default"
import background from "./background"

it("renders", () => {
  expect(background({ theme })).toBe("")
})

it("renders color", () => {
  expect(background({ theme, background: "disabled" })).toBe(
    `background-color: ${theme.colors.disabled};`
  )
})

it("renders gradient", () => {
  expect(background({ theme, background: "panelBgGrad" })).toBe(
    `background: ${theme.colors.panelBgGrad};`
  )
})

it("renders unresolved color path", () => {
  expect(background({ theme, background: ["invalid", "path"] })).toBe(
    `background-color: invalid,path;`
  )
})

it("renders invalid color", () => {
  expect(background({ theme, background: "invalid" })).toBe(`background-color: invalid;`)
})
