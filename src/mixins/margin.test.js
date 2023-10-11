import { DefaultTheme as theme } from "@/theme/default"
import margin from "./margin"

it("renders nothing", () => {
  expect(margin({ theme })).toBe("")
})

it("renders margin 0px", () => {
  expect(margin({ theme, margin: [0] })).toBe("margin: 0;")
})

it("renders margin 4px 16px", () => {
  expect(margin({ theme, margin: [1, 4] })).toBe("margin: 4px 16px;")
})

it("renders margin 8px 12px 16px", () => {
  expect(margin({ theme, margin: [2, 3, 4] })).toBe("margin: 8px 12px 16px;")
})

it("renders margin 8px 12px 16px 32px", () => {
  expect(margin({ theme, margin: [2, 3, 4, 7] })).toBe("margin: 8px 12px 16px 28px;")
})

it("renders margin on invalid value 8px auto", () => {
  expect(margin({ theme, margin: [2, "auto"] })).toBe("margin: 8px auto;")
})

it("logs error", () => {
  console.error = jest.fn()
  margin({ theme, margin: "invalid" })
  margin({ theme, margin: {} })
  margin({ theme, margin: [] })
  margin({ theme, margin: [1, 2, 3, 4, 5, 6] })
  expect(console.error).toHaveBeenCalledTimes(4)
})
