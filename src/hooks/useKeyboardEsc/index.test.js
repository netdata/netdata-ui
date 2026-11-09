import { renderHookWithProviders, fireEvent } from "testUtilities"
import useKeyboardEsc, { isComposingKey } from "./index"

const addEventListener = document.addEventListener
afterEach(() => (document.addEventListener = addEventListener))

it("renders", () => {
  document.addEventListener = jest.fn()
  const { result } = renderHookWithProviders(() => useKeyboardEsc())

  fireEvent.keyDown(document, { keyCode: 27 })
  expect(result.error).toBeUndefined()
  expect(document.addEventListener).toHaveBeenCalledTimes(0)
})

it("passes modern and legacy Escape events to the callback", () => {
  const callback = jest.fn()
  renderHookWithProviders(() => useKeyboardEsc(callback))

  fireEvent.keyDown(document, { key: "Escape" })
  fireEvent.keyDown(document, { code: "Escape" })
  fireEvent.keyDown(document, { keyCode: 27 })

  expect(callback.mock.calls.map(([event]) => [event.key, event.code, event.keyCode])).toEqual([
    ["Escape", "", 0],
    ["", "Escape", 0],
    ["", "", 27],
  ])
})

it("ignores other keys and Escape during IME composition", () => {
  const callback = jest.fn()
  renderHookWithProviders(() => useKeyboardEsc(callback))

  fireEvent.keyDown(document, { key: "Enter", code: "Enter", keyCode: 13 })
  fireEvent.keyDown(document, { key: "Escape", keyCode: 27, isComposing: true })
  fireEvent.keyDown(document, { key: "Escape", code: "Escape", keyCode: 229 })

  expect(callback).toHaveBeenCalledTimes(0)
})

it("reads composition from a React keyboard event's native event", () => {
  const composing = new KeyboardEvent("keydown", { key: "Escape", isComposing: true })
  const ordinary = new KeyboardEvent("keydown", { key: "Escape" })

  expect([
    isComposingKey({ nativeEvent: composing }),
    isComposingKey({ nativeEvent: ordinary }),
  ]).toEqual([true, false])
})
