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

  it("recomputes borders when showBorderLeft changes after the first render", () => {
    const { result, rerender } = renderHookWithProviders(props => useStyleTabs(props), {
      initialProps: { showBorderLeft: false },
    })
    expect(result.current.rootStyles.sx.borderLeft).toBeUndefined()

    rerender({ showBorderLeft: true })

    expect(result.current.rootStyles.sx.borderLeft).toBe(`1px solid ${DefaultTheme.colors.border}`)
  })

  it("recomputes the overlay shadow when isDragOverlay changes after the first render", () => {
    const { result, rerender } = renderHookWithProviders(props => useStyleTabs(props), {
      initialProps: { isDragOverlay: false },
    })
    expect(result.current.rootStyles.sx.boxShadow).toBeUndefined()

    rerender({ isDragOverlay: true })

    expect(result.current.rootStyles.sx.boxShadow).toBe("0 2px 6px rgba(0, 0, 0, 0.15)")
  })

  it("mutes inactive tabs and steps their text to `text` on hover only", () => {
    const { result } = renderHookWithProviders(() => useStyleTabs({ active: false }))
    expect(result.current.rootStyles.color).toBe("textLite")
    expect(result.current.rootStyles.sx["&:hover"]).toEqual({ color: "text" })
    expect(result.current.rootStyles.background).toBe("topBarBg")
  })

  it("does not add a hover rule to the active tab", () => {
    const { result } = renderHookWithProviders(() => useStyleTabs({ active: true }))
    expect(result.current.rootStyles.color).toBe("text")
    expect(result.current.rootStyles.sx["&:hover"]).toBeUndefined()
  })

  it("animates the hover colour unless the user prefers reduced motion", () => {
    const { result } = renderHookWithProviders(() => useStyleTabs({}))
    expect(result.current.rootStyles.sx.transition).toMatch(/color 140ms ease-out/)
    expect(result.current.rootStyles.sx["@media (prefers-reduced-motion: reduce)"]).toEqual({
      transition: "none",
    })
  })

  it("renders the tab being dragged as a dashed placeholder", () => {
    const { result } = renderHookWithProviders(() => useStyleTabs({ dragging: true }))
    expect(result.current.rootStyles.sx.opacity).toBe(0.4)
    expect(result.current.rootStyles.sx.outline).toBe(`1px dashed ${DefaultTheme.colors.border}`)
    expect(result.current.rootStyles.sx.outlineOffset).toBe("-2px")
  })

  it("keeps the drag overlay fully opaque", () => {
    const { result } = renderHookWithProviders(() =>
      useStyleTabs({ dragging: true, isDragOverlay: true })
    )
    expect(result.current.rootStyles.sx.opacity).toBeUndefined()
    expect(result.current.rootStyles.background).toBe("mainBackground")
  })
})
