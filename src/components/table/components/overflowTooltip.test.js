import React, { useRef } from "react"
import { act, fireEvent, renderWithProviders } from "testUtilities"
import OverflowTooltip from "./overflowTooltip"

const setDimensions = (
  target,
  { clientHeight = 16, clientWidth = 100, scrollHeight = 16, scrollWidth = 200 } = {}
) => {
  Object.defineProperties(target, {
    clientHeight: { configurable: true, value: clientHeight },
    clientWidth: { configurable: true, value: clientWidth },
    scrollHeight: { configurable: true, value: scrollHeight },
    scrollWidth: { configurable: true, value: scrollWidth },
  })
}

const renderContent = content => <span>{content}</span>

const Fixture = ({ delay = 0 }) => {
  const ref = useRef()

  return (
    <>
      <div ref={ref} data-testid="container">
        <span data-overflow-tooltip="Complete value" data-testid="target">
          Cropped value
        </span>
      </div>
      <OverflowTooltip containerRef={ref} options={{ delay, renderContent }} />
    </>
  )
}

it("does not measure the target while rendering", () => {
  const scrollWidth = jest.spyOn(HTMLElement.prototype, "scrollWidth", "get")

  renderWithProviders(<Fixture />)

  expect(scrollWidth).not.toHaveBeenCalled()
  scrollWidth.mockRestore()
})

it("shows the tooltip only for overflowing content", () => {
  const { getByTestId, queryByText } = renderWithProviders(<Fixture />)
  const target = getByTestId("target")

  setDimensions(target)
  fireEvent.mouseOver(target)
  expect(queryByText("Complete value")).toBeInTheDocument()

  fireEvent.mouseOut(target)
  expect(queryByText("Complete value")).not.toBeInTheDocument()

  setDimensions(target, { scrollWidth: 100 })
  fireEvent.mouseOver(target)
  expect(queryByText("Complete value")).not.toBeInTheDocument()
})

it("waits for the configured hover delay", () => {
  jest.useFakeTimers()
  const { getByTestId, queryByText } = renderWithProviders(<Fixture delay={600} />)
  const target = getByTestId("target")

  setDimensions(target)
  fireEvent.mouseOver(target)
  expect(queryByText("Complete value")).not.toBeInTheDocument()

  act(() => jest.advanceTimersByTime(600))
  expect(queryByText("Complete value")).toBeInTheDocument()
  jest.useRealTimers()
})

it("cancels pending and visible tooltips when the table scrolls", () => {
  jest.useFakeTimers()
  const { getByTestId, queryByText } = renderWithProviders(<Fixture delay={600} />)
  const container = getByTestId("container")
  const target = getByTestId("target")

  setDimensions(target)
  fireEvent.mouseOver(target)
  fireEvent.scroll(container)
  act(() => jest.advanceTimersByTime(600))
  expect(queryByText("Complete value")).not.toBeInTheDocument()

  fireEvent.focus(target)
  expect(queryByText("Complete value")).toBeInTheDocument()
  fireEvent.scroll(container)
  expect(queryByText("Complete value")).not.toBeInTheDocument()
  jest.useRealTimers()
})

it("does not resolve an unrelated descendant while hovering the table container", () => {
  const { getByTestId, queryByText } = renderWithProviders(<Fixture />)

  setDimensions(getByTestId("target"))
  fireEvent.mouseOver(getByTestId("container"))
  expect(queryByText("Complete value")).not.toBeInTheDocument()
})

it("finds an overflowing descendant when its link receives focus", () => {
  const FocusFixture = () => {
    const ref = useRef()
    return (
      <>
        <div ref={ref}>
          <a href="#target" data-testid="link">
            <span data-overflow-tooltip="Complete value" data-testid="target">
              Cropped value
            </span>
          </a>
        </div>
        <OverflowTooltip containerRef={ref} options={{ delay: 600, renderContent }} />
      </>
    )
  }
  const { getByTestId, queryByText } = renderWithProviders(<FocusFixture />)

  setDimensions(getByTestId("target"))
  fireEvent.focus(getByTestId("link"))
  expect(queryByText("Complete value")).toBeInTheDocument()
})
