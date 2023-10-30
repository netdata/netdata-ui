import useStyleTabs from "./use-styles-tab"
import { renderHookWithProviders } from "testUtilities"
import { DefaultTheme } from "../../../theme/index"

describe("useStyleTabs", () => {
  it("should return the correct styles when tab is not active", () => {
    const { result } = renderHookWithProviders(() => useStyleTabs({ active: false }))
    expect(result.current.rootStyles.background).toBe("topBarBg")
    expect(result.current.rootStyles.sx.borderTop).toBe("2px solid transparent")
  })

  it("should return the correct styles when tab active", () => {
    const expectedBorderTopColor = DefaultTheme.colors.primary
    const { result } = renderHookWithProviders(() => useStyleTabs({ active: true }))
    expect(result.current.rootStyles.background).toBe("mainBackground")
    expect(result.current.rootStyles.sx.borderTop).toBe(`2px solid ${expectedBorderTopColor}`)
  })

  it("should return borderLeft when {showBorderLeft} is true", () => {
    const expectedBorderTopColor = DefaultTheme.colors.border
    const { result } = renderHookWithProviders(() => useStyleTabs({ showBorderLeft: true }))

    expect(result.current.rootStyles.sx.borderLeft).toBe(`1px solid ${expectedBorderTopColor}`)
  })
})
