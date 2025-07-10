import { renderHook, act } from "testUtilities"
import { useFocusedState } from "./use-focused-state"

describe("useFocusedState", () => {
  it("returns initial focused state as false by default", () => {
    const { result } = renderHook(() => useFocusedState({}))
    const [focused] = result.current

    expect(focused).toBe(false)
  })

  it("returns custom default state", () => {
    const { result } = renderHook(() => useFocusedState({ defaultState: true }))
    const [focused] = result.current

    expect(focused).toBe(true)
  })

  it("updates focused state on focus", () => {
    const { result } = renderHook(() => useFocusedState({}))
    const [, handleFocus] = result.current

    act(() => {
      handleFocus({ type: "focus" })
    })

    expect(result.current[0]).toBe(true)
  })

  it("updates focused state on blur", () => {
    const { result } = renderHook(() => useFocusedState({ defaultState: true }))
    const [, , handleBlur] = result.current

    act(() => {
      handleBlur({ type: "blur" })
    })

    expect(result.current[0]).toBe(false)
  })

  it("calls onFocus callback when provided", () => {
    const onFocus = jest.fn()
    const { result } = renderHook(() => useFocusedState({ onFocus }))
    const [, handleFocus] = result.current

    const mockEvent = { type: "focus" }
    act(() => {
      handleFocus(mockEvent)
    })

    expect(onFocus).toHaveBeenCalledWith(mockEvent)
  })

  it("calls onBlur callback when provided", () => {
    const onBlur = jest.fn()
    const { result } = renderHook(() => useFocusedState({ onBlur }))
    const [, , handleBlur] = result.current

    const mockEvent = { type: "blur" }
    act(() => {
      handleBlur(mockEvent)
    })

    expect(onBlur).toHaveBeenCalledWith(mockEvent)
  })

  it("does not trigger focus when already focused", () => {
    const onFocus = jest.fn()
    const { result } = renderHook(() => useFocusedState({ onFocus, defaultState: true }))
    const [, handleFocus] = result.current

    act(() => {
      handleFocus({ type: "focus" })
    })

    expect(result.current[0]).toBe(true)
    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it("maintains stable function references", () => {
    const { result, rerender } = renderHook(() => useFocusedState({}))
    const [, initialHandleFocus, initialHandleBlur] = result.current

    rerender()

    const [, newHandleFocus, newHandleBlur] = result.current
    expect(newHandleFocus).toBe(initialHandleFocus)
    expect(newHandleBlur).toBe(initialHandleBlur)
  })

  it("updates callbacks when dependencies change", () => {
    const onFocus = jest.fn()
    const { result, rerender } = renderHook(({ onFocus }) => useFocusedState({ onFocus }), {
      initialProps: { onFocus },
    })

    const newOnFocus = jest.fn()
    rerender({ onFocus: newOnFocus })

    const [, handleFocus] = result.current
    act(() => {
      handleFocus({ type: "focus" })
    })

    expect(onFocus).not.toHaveBeenCalled()
    expect(newOnFocus).toHaveBeenCalledTimes(1)
  })
})
