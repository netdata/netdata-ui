import React from "react"
import { renderWithProviders, act } from "testUtilities"
import { PortalSidebar } from "./portaled-sidebar"

const TEST_ANCHOR = "test text"

describe("PortalSidebar component test", () => {
  it(" * should render with no props", () => {
    const { container } = renderWithProviders(<PortalSidebar />)
    // somehow queryselector does not searches for monotags like <aside />
    const aside = container && container.nextSibling && container.nextSibling.firstChild
    expect(aside && aside.nodeName).toBe("ASIDE")
  })
  it(" * should render on the right side", () => {
    const { queryByText } = renderWithProviders(<PortalSidebar right>{TEST_ANCHOR}</PortalSidebar>)
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children", () => {
    const { queryByText } = renderWithProviders(<PortalSidebar>{TEST_ANCHOR}</PortalSidebar>)
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).toBe(TEST_ANCHOR)
  })

  it(" * should be closed after `Esc` pressed", () => {
    const handler = jest.fn()
    const { queryByText } = renderWithProviders(
      <PortalSidebar closeOnEsc onClose={handler}>
        {TEST_ANCHOR}
      </PortalSidebar>
    )
    const result = queryByText(TEST_ANCHOR)
    if (result) {
      act(() => {
        const event = new KeyboardEvent("keydown", { keyCode: 27 })
        document.dispatchEvent(event)
      })
    }
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
