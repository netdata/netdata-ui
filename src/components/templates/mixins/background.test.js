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

// Theme gradients are flat now, so a local theme keeps the gradient path covered for custom themes.
it("renders gradient", () => {
  const gradient = "linear-gradient(to right, #F6F7F7 0%, #FFFFFF 50%, #F6F7F7 100%)"
  const gradientTheme = { ...theme, colors: { ...theme.colors, panelBgGrad: gradient } }
  expect(background({ theme: gradientTheme, background: "panelBgGrad" })).toBe(`background: ${gradient};`)
})

it("renders unresolved color path", () => {
  expect(background({ theme, background: ["invalid", "path"] })).toBe(
    `background-color: invalid,path;`
  )
})

it("renders invalid color", () => {
  expect(background({ theme, background: "invalid" })).toBe(`background-color: invalid;`)
})
