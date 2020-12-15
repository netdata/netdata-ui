import { renderHook, act } from "testUtilities"
import useToggle from "./index"

it("returns the false by default", () => {
  const { result } = renderHook(value => useToggle(value), { initialProps: undefined })
  expect(result.current[0]).toBe(false)
})

it("returns the initial value", () => {
  const { result } = renderHook(value => useToggle(value), { initialProps: true })
  expect(result.current[0]).toBe(true)
})

it("toggles the value", () => {
  const onToggle = jest.fn()
  const on = jest.fn()
  const off = jest.fn()
  const { result } = renderHook(value => useToggle(value, { on, off, toggle: onToggle }), {
    initialProps: true,
  })
  const [, toggle] = result.current
  act(() => {
    toggle()
  })
  expect(result.current[0]).toBe(false)
  expect(onToggle).toBeCalledTimes(1)
  expect(off).toBeCalledTimes(1)
  expect(on).toBeCalledTimes(0)

  act(() => {
    toggle()
  })
  expect(result.current[0]).toBe(true)
  expect(onToggle).toBeCalledTimes(2)
  expect(off).toBeCalledTimes(1)
  expect(on).toBeCalledTimes(1)
})

it("toggles on", () => {
  const { result } = renderHook(value => useToggle(value), { initialProps: false })
  const [, , toggleOn] = result.current
  act(() => {
    toggleOn()
  })
  expect(result.current[0]).toBe(true)
})

it("toggles off", () => {
  const { result } = renderHook(value => useToggle(value), { initialProps: true })
  const [, , , toggleOff] = result.current
  act(() => {
    toggleOff()
  })
  expect(result.current[0]).toBe(false)
})
