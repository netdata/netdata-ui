import { DefaultTheme as theme } from "@/theme/default"
import width from "./width"

it("renders", () => {
  expect(width({ theme })).toBe(undefined)
})

it("renders value", () => {
  expect(width({ theme, width: "10rem" })).toBe("width: 10rem;")
  expect(width({ theme, width: 10 })).toBe("width: 40px;")
})

it("renders min max", () => {
  expect(width({ theme, width: { min: "20rem", max: "45rem" } }).trim()).toBe(
    `
      min-width: 20rem;
      max-width: 45rem;
    `.trim()
  )
  expect(width({ theme, width: { min: 0.5, max: 1 } }).trim()).toBe(
    `
      min-width: 2px;
      max-width: 4px;
    `.trim()
  )
})

it("renders max", () => {
  expect(width({ theme, width: { max: "45rem" } }).trim()).toBe("max-width: 45rem;")
})

it("renders min", () => {
  expect(width({ theme, width: { min: "20rem" } }).trim()).toBe("min-width: 20rem;")
})
