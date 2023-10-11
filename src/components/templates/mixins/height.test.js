import { DefaultTheme as theme } from "@/theme/default"
import height from "./height"

it("renders", () => {
  expect(height({ theme })).toBe(undefined)
})

it("renders value", () => {
  expect(height({ theme, height: "10rem" })).toBe("height: 10rem;")
  expect(height({ theme, height: 4 })).toBe("height: 16px;")
})

it("renders min max", () => {
  expect(height({ theme, height: { min: "20rem", max: "45rem" } })).toBe(`
      min-height: 20rem;
      max-height: 45rem;
    `)
  expect(height({ theme, height: { min: 1, max: 2 } })).toBe(`
      min-height: 4px;
      max-height: 8px;
    `)
})

it("renders max", () => {
  expect(height({ theme, height: { max: "45rem" } }).trim()).toBe("max-height: 45rem;")
})

it("renders min", () => {
  expect(height({ theme, height: { min: "20rem" } }).trim()).toBe("min-height: 20rem;")
})
