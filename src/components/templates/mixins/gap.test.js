import { DefaultTheme as theme } from "src/theme/default"
import styledGap from "./gap"

it("renders", () => {
  expect(styledGap({ theme })).toBe("")
})

it("renders gap", () => {
  expect(styledGap({ theme, gap: 2 })).toBe(`
    &> *:not(:last-child) {
      margin-right: ${theme.constants.SIZE_SUB_UNIT * 2}px;
    }
  `)
})

it("renders gap", () => {
  expect(styledGap({ theme, gap: 2, column: true })).toBe(`
    &> *:not(:last-child) {
      margin-bottom: ${theme.constants.SIZE_SUB_UNIT * 2}px;
    }
  `)
})

it("renders invalid", () => {
  expect(styledGap({ theme, gap: "invalid" })).toBe("")
})
