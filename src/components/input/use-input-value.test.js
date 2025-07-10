import { renderHook, act } from "testUtilities"
import { useInputValue } from "./use-input-value"

describe("useInputValue", () => {
  it("returns initial value", () => {
    const { result } = renderHook(() => useInputValue({ value: "initial" }))
    const [inputValue] = result.current

    expect(inputValue).toBe("initial")
  })

  it("returns empty string as default value", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [inputValue] = result.current

    expect(inputValue).toBe("")
  })

  it("returns isDirty as false initially", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [, , , isDirty] = result.current

    expect(isDirty).toBe(false)
  })

  it("updates value on change", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [, handleChange] = result.current

    const mockEvent = { target: { value: "new value" } }
    act(() => {
      handleChange(mockEvent)
    })

    expect(result.current[0]).toBe("new value")
  })

  it("sets isDirty to true after first change", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [, handleChange] = result.current

    const mockEvent = { target: { value: "changed" } }
    act(() => {
      handleChange(mockEvent)
    })

    expect(result.current[3]).toBe(true)
  })

  it("calls onChange callback when provided", () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useInputValue({ onChange }))
    const [, handleChange] = result.current

    const mockEvent = { target: { value: "test" } }
    act(() => {
      handleChange(mockEvent)
    })

    expect(onChange).toHaveBeenCalledWith(mockEvent)
  })

  it("respects maxChars limit", () => {
    const { result } = renderHook(() => useInputValue({ maxChars: 5 }))
    const [, handleChange] = result.current

    const mockEvent = {
      target: { value: "toolong" },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    }

    act(() => {
      handleChange(mockEvent)
    })

    expect(result.current[0]).toBe("")
    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockEvent.stopPropagation).toHaveBeenCalled()
  })

  it("allows input within maxChars limit", () => {
    const { result } = renderHook(() => useInputValue({ maxChars: 10 }))
    const [, handleChange] = result.current

    const mockEvent = { target: { value: "short" } }
    act(() => {
      handleChange(mockEvent)
    })

    expect(result.current[0]).toBe("short")
  })

  it("generates maxChars indicator", () => {
    const { result } = renderHook(() => useInputValue({ maxChars: 10 }))
    const [, handleChange, maxCharsIndicator] = result.current

    expect(maxCharsIndicator).toBe("0/10")

    const mockEvent = { target: { value: "test" } }
    act(() => {
      handleChange(mockEvent)
    })

    expect(result.current[2]).toBe("4/10")
  })

  it("returns empty maxChars indicator when no limit", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [, , maxCharsIndicator] = result.current

    expect(maxCharsIndicator).toBe("")
  })

  it("resets value and dirty state", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [, handleChange, , , { resetValue }] = result.current

    const mockEvent = { target: { value: "test" } }
    act(() => {
      handleChange(mockEvent)
    })

    expect(result.current[0]).toBe("test")
    expect(result.current[3]).toBe(true)

    act(() => {
      resetValue("reset")
    })

    expect(result.current[0]).toBe("reset")
    expect(result.current[3]).toBe(false)
  })

  it("resets to empty string by default", () => {
    const { result } = renderHook(() => useInputValue({ value: "initial" }))
    const [, , , , { resetValue }] = result.current

    act(() => {
      resetValue()
    })

    expect(result.current[0]).toBe("")
  })

  it("provides setValue helper", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [, , , , { setValue }] = result.current

    act(() => {
      setValue("direct set")
    })

    expect(result.current[0]).toBe("direct set")
  })

  it("provides setIsDirty helper", () => {
    const { result } = renderHook(() => useInputValue({}))
    const [, , , , { setIsDirty }] = result.current

    act(() => {
      setIsDirty(true)
    })

    expect(result.current[3]).toBe(true)
  })

  it("maintains stable function references", () => {
    const { result, rerender } = renderHook(() => useInputValue({}))
    const [, initialHandleChange] = result.current

    rerender()

    const [, newHandleChange] = result.current
    expect(newHandleChange).toBe(initialHandleChange)
  })
})
