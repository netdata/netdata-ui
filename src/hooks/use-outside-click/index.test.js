import { renderHookWithProviders, fireEvent } from "testUtilities"
import useOutsideClick from "./index"

const injectElements = () => {
  const div1 = document.createElement("div")
  const div2 = document.createElement("div")
  div1.appendChild(div2)
  document.body.appendChild(div1)

  const div3 = document.createElement("div")
  document.body.appendChild(div3)

  return { div1, div2, div3 }
}

it("renders", () => {
  const { result } = renderHookWithProviders(() => useOutsideClick())
  expect(result.error).toBeUndefined()
})

it("trigger on outside click", () => {
  const { div2, div3 } = injectElements()

  const onClickOutside = jest.fn()
  renderHookWithProviders(() => useOutsideClick({ current: div2 }, onClickOutside))

  fireEvent.mouseDown(div3)

  expect(onClickOutside).toBeCalledTimes(1)
})

it("does not trigger on inner click", () => {
  const { div1, div2 } = injectElements()

  const onClickOutside = jest.fn()
  renderHookWithProviders(() => useOutsideClick({ current: div1 }, onClickOutside))

  fireEvent.mouseDown(div2)

  expect(onClickOutside).toBeCalledTimes(0)
})

it("does not trigger on the same element", () => {
  const { div1 } = injectElements()

  const onClickOutside = jest.fn()
  renderHookWithProviders(() => useOutsideClick({ current: div1 }, onClickOutside))

  fireEvent.mouseDown(div1)

  expect(onClickOutside).toBeCalledTimes(0)
})
