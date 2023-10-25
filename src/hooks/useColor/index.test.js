import { renderHookWithProviders } from "testUtilities"
import useColor from "./index"

describe("useColor", () => {
  it("should return the desired color", () => {
    const colorToReturn = "primary"
    const expetedColorHexCode = "#00AB44"

    const { result } = renderHookWithProviders(() => useColor(), {})

    expect(result.current(colorToReturn)).toBe(expetedColorHexCode)
  })
})
