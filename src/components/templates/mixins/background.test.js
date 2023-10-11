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

it("renders invalid color", () => {
  expect(background({ theme, background: "invalid" })).toBe(`background-color: invalid;`)
})
