import { renderHook, act } from "testUtilities"
import useDebounce from "."

jest.useFakeTimers()

describe("useDebounce", () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it("calls callback after delay", () => {
    const callback = jest.fn()
    
    renderHook(() => useDebounce(callback, 1000))
    
    expect(callback).not.toHaveBeenCalled()
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("does not call callback before delay", () => {
    const callback = jest.fn()
    
    renderHook(() => useDebounce(callback, 1000))
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(callback).not.toHaveBeenCalled()
  })

  it("cancels previous timeout when deps change", () => {
    const callback = jest.fn()
    let deps = ["initial"]
    
    const { rerender } = renderHook(
      ({ deps }) => useDebounce(callback, 1000, deps),
      { initialProps: { deps } }
    )
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    deps = ["changed"]
    rerender({ deps })
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("cancels previous timeout when delay changes", () => {
    const callback = jest.fn()
    let delay = 1000
    
    const { rerender } = renderHook(
      ({ delay }) => useDebounce(callback, delay),
      { initialProps: { delay } }
    )
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    delay = 2000
    rerender({ delay })
    
    act(() => {
      jest.advanceTimersByTime(1500)
    })
    
    expect(callback).not.toHaveBeenCalled()
    
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("uses latest callback when deps change", () => {
    const firstCallback = jest.fn()
    const secondCallback = jest.fn()
    let callback = firstCallback
    let deps = ["initial"]
    
    const { rerender } = renderHook(
      ({ callback, deps }) => useDebounce(callback, 1000, deps),
      { initialProps: { callback, deps } }
    )
    
    callback = secondCallback
    deps = ["changed"]
    rerender({ callback, deps })
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(firstCallback).not.toHaveBeenCalled()
    expect(secondCallback).toHaveBeenCalledTimes(1)
  })

  it("handles zero delay", () => {
    const callback = jest.fn()
    
    renderHook(() => useDebounce(callback, 0))
    
    act(() => {
      jest.runAllTimers()
    })
    
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("handles undefined delay", () => {
    const callback = jest.fn()
    
    renderHook(() => useDebounce(callback, undefined))
    
    act(() => {
      jest.runAllTimers()
    })
    
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("cleans up timeout on unmount", () => {
    const callback = jest.fn()
    
    const { unmount } = renderHook(() => useDebounce(callback, 1000))
    
    unmount()
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(callback).not.toHaveBeenCalled()
  })

  it("handles empty deps array", () => {
    const callback = jest.fn()
    
    renderHook(() => useDebounce(callback, 1000, []))
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(callback).toHaveBeenCalledTimes(1)
  })
})