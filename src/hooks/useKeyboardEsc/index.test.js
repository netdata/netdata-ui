import { renderHookWithProviders, fireEvent } from "testUtilities"
import useKeyboardEsc from "./index"

const addEventListener = document.addEventListener
afterEach(() => (document.addEventListener = addEventListener))

it("renders", () => {
  document.addEventListener = jest.fn()
  const { result } = renderHookWithProviders(() => useKeyboardEsc())

  fireEvent.keyDown(document, { keyCode: 27 })
  expect(result.error).toBeUndefined()
  expect(document.addEventListener).toBeCalledTimes(0)
})

it("triggers on enter keystroke", () => {
  const callback = jest.fn()
  renderHookWithProviders(() => useKeyboardEsc(callback))

  fireEvent.keyDown(document, { keyCode: 27 })
  expect(callback).toBeCalledTimes(1)
})

it("does not trigger on non enter keystroke", () => {
  const callback = jest.fn()
  renderHookWithProviders(() => useKeyboardEsc(callback))

  fireEvent.keyDown(document, { keyCode: 26 })
  expect(callback).toBeCalledTimes(0)
})
