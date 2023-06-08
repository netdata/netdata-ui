import { renderHookWithProviders } from "testUtilities"

import useInputStyles from "./use-input-styles"

describe("useInputStyles", () => {
  it("renders with size tiny properties", () => {
    const { result } = renderHookWithProviders(() => useInputStyles({ size: "tiny" }))
    expect(result.current.styles.inputContainer.height).toBe("28px")
  })

  it("renders with size small properties", () => {
    const { result } = renderHookWithProviders(() => useInputStyles({ size: "small" }))
    expect(result.current.styles.inputContainer.height).toBe("34px")
  })

  it("renders with size large properties", () => {
    const { result } = renderHookWithProviders(() => useInputStyles({}))
    expect(result.current.styles.inputContainer.height).toBe("42px")
  })
  it("renders with disabled styles", () => {
    const { result } = renderHookWithProviders(() => useInputStyles({ disabled: true }))
    expect(result.current.styles.inputContainer.background).toBe("mainBackgroundDisabled")
    expect(result.current.styles.iconContainer({}).background).toBeUndefined()
  })

  it("renders with focus styles", () => {
    const { result } = renderHookWithProviders(() => useInputStyles({ focused: true }))
    expect(result.current.styles.inputContainer.border.color).toBe("inputBorderFocus")
  })

  it("renders with border error styles", () => {
    const { result } = renderHookWithProviders(() => useInputStyles({ error: true }))
    expect(result.current.styles.inputContainer.border.color).toBe("error")
  })
  it("renders with border error styles", () => {
    const { result } = renderHookWithProviders(() => useInputStyles({ success: true }))
    expect(result.current.styles.inputContainer.border.color).toBe("success")
  })
})
