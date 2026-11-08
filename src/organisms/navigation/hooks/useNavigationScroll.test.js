import React, { useRef } from "react"
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import useNavigationScroll from "./useNavigationScroll"

const Strip = () => {
  const ref = useRef()
  useNavigationScroll(ref)
  return <div ref={ref} data-testid="strip" />
}

describe("useNavigationScroll", () => {
  it("scrolls horizontally on vertical wheel movement", () => {
    renderWithProviders(<Strip />)
    const strip = screen.getByTestId("strip")
    let scrollLeft = 10
    Object.defineProperty(strip, "scrollLeft", {
      get: () => scrollLeft,
      set: value => {
        scrollLeft = value
      },
      configurable: true,
    })

    fireEvent.wheel(strip, { deltaY: 100 })

    expect(scrollLeft).toBe(20)
  })

  it("removes the same wheel listener on unmount instead of removing the element", () => {
    const addSpy = jest.spyOn(HTMLElement.prototype, "addEventListener")
    const removeListenerSpy = jest.spyOn(HTMLElement.prototype, "removeEventListener")
    const { unmount } = renderWithProviders(<Strip />)
    const strip = screen.getByTestId("strip")
    const removeElementSpy = jest.spyOn(strip, "remove")
    const ownWheelCall = addSpy.mock.calls.findIndex(
      ([type], i) => type === "wheel" && addSpy.mock.contexts[i] === strip
    )
    const [, handler] = addSpy.mock.calls[ownWheelCall]

    unmount()

    expect(removeElementSpy).not.toHaveBeenCalled()
    const removedFromStrip = removeListenerSpy.mock.calls.filter(
      (_, i) => removeListenerSpy.mock.contexts[i] === strip
    )
    expect(removedFromStrip).toContainEqual(["wheel", handler])
  })
})
