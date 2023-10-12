import { DefaultTheme as theme } from "@/theme/default"
import padding from "./padding"

it("renders nothing", () => {
  expect(padding({ theme })).toBe("")
})

it("renders padding 0px", () => {
  expect(padding({ theme, padding: [0] })).toBe("padding: 0;")
})

it("renders padding 4px 16px", () => {
  expect(padding({ theme, padding: [1, 4] })).toBe("padding: 4px 16px;")
})

it("renders padding 8px 12px 16px", () => {
  expect(padding({ theme, padding: [2, 3, 4] })).toBe("padding: 8px 12px 16px;")
})

it("renders padding 8px 12px 16px 32px", () => {
  expect(padding({ theme, padding: [2, 3, 4, 7] })).toBe("padding: 8px 12px 16px 28px;")
})

it("renders padding on invalid value 8px auto", () => {
  expect(padding({ theme, padding: [2, "auto"] })).toBe("padding: 8px auto;")
})

it("logs error", () => {
  console.error = jest.fn()
  padding({ theme, padding: "invalid" })
  padding({ theme, padding: {} })
  padding({ theme, padding: [] })
  padding({ theme, padding: [1, 2, 3, 4, 5, 6] })
  expect(console.error).toHaveBeenCalledTimes(4)
})
