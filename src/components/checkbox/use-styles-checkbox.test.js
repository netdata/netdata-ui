import { renderHookWithProviders } from "testUtilities"

import useCheckBoxStyles from "./use-styles-checkbox"

describe("useStylesCheckbox", () => {
  it("renders with disabled styles", () => {
    const { result } = renderHookWithProviders(() => useCheckBoxStyles({ disabled: true }))
    expect(result.current.styles.styledCheckbox.background).toBe("mainBackgroundDisabled")
  })

  it("renders with focus styles", () => {
    const { result } = renderHookWithProviders(() => useCheckBoxStyles({ focused: true }))
    expect(result.current.styles.styledCheckbox.border.color).toBe("inputBorderFocus")
  })

  it("renders with border error styles", () => {
    const { result } = renderHookWithProviders(() => useCheckBoxStyles({ error: true }))
    expect(result.current.styles.styledCheckbox.border.color).toBe("error")
  })
  it("renders with border error styles", () => {
    const { result } = renderHookWithProviders(() => useCheckBoxStyles({ success: true }))
    expect(result.current.styles.styledCheckbox.border.color).toBe("success")
  })

  it("renders with focus styles", () => {
    const { result } = renderHookWithProviders(() => useCheckBoxStyles({ success: true }))
    expect(result.current.styles.styledCheckbox._focus.border.color).toBe("success")
  })
})
