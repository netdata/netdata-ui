import React from "react"
import { renderWithProviders } from "testUtilities"
import Intersection from "./index"

let observe
let unobserve
let disconnect
beforeEach(() => {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()

  global.IntersectionObserver = jest.fn(() => ({ observe, unobserve, disconnect }))
})

it("renders", () => {
  const { queryByText } = renderWithProviders(
    <Intersection fallback="invisible">visible</Intersection>
  )

  expect(queryByText("invisible")).toBeVisible()
  expect(queryByText("visible")).not.toBeInTheDocument()
})

it("calls the observers", () => {
  const { unmount, container } = renderWithProviders(
    <Intersection fallback="invisible">visible</Intersection>
  )

  expect(observe).toBeCalledWith(container.firstChild)
  expect(observe).toBeCalledTimes(1)
  expect(unobserve).toBeCalledTimes(0)
  expect(disconnect).toBeCalledTimes(0)

  unmount()

  expect(observe).toBeCalledTimes(1)
  expect(unobserve).toBeCalledTimes(1)
  expect(disconnect).toBeCalledTimes(1)
})
