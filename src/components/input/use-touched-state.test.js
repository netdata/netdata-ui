import { renderHook, act } from "testUtilities"
import { useTouchedState } from "./use-touched-state"

describe("useTouchedState", () => {
  it("returns initial touched state as false by default", () => {
    const { result } = renderHook(() => useTouchedState({}))
    const [touchedState] = result.current
    
    expect(touchedState).toBe(false)
  })

  it("returns custom default state", () => {
    const { result } = renderHook(() => useTouchedState({ defaultState: true }))
    const [touchedState] = result.current
    
    expect(touchedState).toBe(true)
  })

  it("sets touched state to true on first blur", () => {
    const { result } = renderHook(() => useTouchedState({}))
    const [, handleBlur] = result.current
    
    act(() => {
      handleBlur({ type: "blur" })
    })
    
    expect(result.current[0]).toBe(true)
  })

  it("calls onBlur callback when provided", () => {
    const onBlur = jest.fn()
    const { result } = renderHook(() => useTouchedState({ onBlur }))
    const [, handleBlur] = result.current
    
    const mockEvent = { type: "blur" }
    act(() => {
      handleBlur(mockEvent)
    })
    
    expect(onBlur).toHaveBeenCalledWith(mockEvent)
  })

  it("does not update touched state when already touched", () => {
    const onBlur = jest.fn()
    const { result } = renderHook(() => useTouchedState({ onBlur, defaultState: true }))
    const [, handleBlur] = result.current
    
    act(() => {
      handleBlur({ type: "blur" })
    })
    
    expect(result.current[0]).toBe(true)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it("allows manual control of touched state", () => {
    const { result } = renderHook(() => useTouchedState({}))
    const [, , setTouchedState] = result.current
    
    act(() => {
      setTouchedState(true)
    })
    
    expect(result.current[0]).toBe(true)
    
    act(() => {
      setTouchedState(false)
    })
    
    expect(result.current[0]).toBe(false)
  })

  it("maintains stable function references", () => {
    const { result, rerender } = renderHook(() => useTouchedState({}))
    const [, initialHandleBlur, initialSetTouchedState] = result.current
    
    rerender()
    
    const [, newHandleBlur, newSetTouchedState] = result.current
    expect(newHandleBlur).toBe(initialHandleBlur)
    expect(newSetTouchedState).toBe(initialSetTouchedState)
  })

  it("updates callback when onBlur dependency changes", () => {
    const onBlur = jest.fn()
    const { result, rerender } = renderHook(
      ({ onBlur }) => useTouchedState({ onBlur }),
      { initialProps: { onBlur } }
    )
    
    const newOnBlur = jest.fn()
    rerender({ onBlur: newOnBlur })
    
    const [, handleBlur] = result.current
    act(() => {
      handleBlur({ type: "blur" })
    })
    
    expect(onBlur).not.toHaveBeenCalled()
    expect(newOnBlur).toHaveBeenCalledTimes(1)
  })

  it("handles multiple blur events correctly", () => {
    const onBlur = jest.fn()
    const { result } = renderHook(() => useTouchedState({ onBlur }))
    const [, handleBlur] = result.current
    
    act(() => {
      handleBlur({ type: "blur" })
    })
    
    act(() => {
      handleBlur({ type: "blur" })
    })
    
    expect(result.current[0]).toBe(true)
    expect(onBlur).toHaveBeenCalledTimes(2)
  })
})