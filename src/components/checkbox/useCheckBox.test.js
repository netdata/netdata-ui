import { renderHookWithProviders } from "testUtilities"
import useCheckBox from "./useCheckBox"

describe("useCheckBox", () => {
  it("renders", () => {
    const disabled = false
    const { result } = renderHookWithProviders(() => useCheckBox({ disabled }))
    expect(result.current).not.toBeUndefined()
  })
  it("should return border color for success case", () => {
    const success = true
    const { result } = renderHookWithProviders(() => useCheckBox({ success }))
    expect(result.current.styles.checkBox.border.color).toBe("success")
  })
  it("should return border color for error case", () => {
    const error = true
    const { result } = renderHookWithProviders(() => useCheckBox({ error }))
    expect(result.current.styles.checkBox.border.color).toBe("error")
  })
  it("should return border color for disabled case", () => {
    const disabled = true
    const { result } = renderHookWithProviders(() => useCheckBox({ disabled }))
    expect(result.current.styles.checkBox.border.color).toBe("inputBorder")
  })
  it("should return background color for disabled state", () => {
    const disabled = true
    const { result } = renderHookWithProviders(() => useCheckBox({ disabled }))
    expect(result.current.styles.checkBox.background).toBe("mainBackgroundDisabled")
  })
  it("should prioratize success state when both disabled and success are true", () => {
    const success = true
    const { result } = renderHookWithProviders(() => useCheckBox({ success }))
    expect(result.current.styles.checkBox.border.color).toBe("success")
  })
})
