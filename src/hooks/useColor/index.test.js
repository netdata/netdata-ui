import { renderHookWithProviders } from "testUtilities"
import { DefaultTheme } from "@/theme"
import useColor from "./index"

describe("useColor", () => {
  it("should return the desired color", () => {
    const colorToReturn = "primary"
    const expetedColorHexCode = DefaultTheme.colors.primary

    const { result } = renderHookWithProviders(() => useColor(), {})

    expect(result.current(colorToReturn)).toBe(expetedColorHexCode)
  })
})
