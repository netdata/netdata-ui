import { renderHookWithProviders, act } from "testUtilities"
import useForwardRef from "./index"

it("renders", () => {
  const { result } = renderHookWithProviders(() => useForwardRef())
  expect(result.current[0].current).toBeUndefined()
})

it("sets value", () => {
  const { result } = renderHookWithProviders(() => useForwardRef())

  act(() => {
    result.current[1]("test")
  })

  expect(result.current[0].current).toBe("test")
})

it("sets parent as reference", () => {
  const parentRef = { current: undefined }
  const { result } = renderHookWithProviders(() => useForwardRef(parentRef))

  act(() => {
    result.current[1]("test")
  })

  expect(parentRef.current).toBe("test")
})

it("sets parent as callback", () => {
  const parentRef = jest.fn()
  const { result } = renderHookWithProviders(() => useForwardRef(parentRef))

  act(() => {
    result.current[1]("test")
  })

  expect(parentRef).toBeCalledWith("test")
})
