import { renderWithProviders, act, screen, fireEvent, userEvent } from "testUtilities"
import { DefaultTheme } from "@/theme"
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

describe("PortalSidebar surface", () => {
  const renderPanel = props =>
    renderWithProviders(
      <PortalSidebar data-testid="panel" {...props}>
        {TEST_ANCHOR}
      </PortalSidebar>
    )
  const overlay = () => document.body.querySelector("aside:not([data-testid])")
  const shadowColor = DefaultTheme.colors.dropdownShadow

  it("paints its own surface", () => {
    renderPanel()
    expect(screen.getByTestId("panel")).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.mainBackground
    )
  })

  it("draws the border and shadow toward the content for a left panel", () => {
    renderPanel()
    const panel = screen.getByTestId("panel")
    expect(panel).toHaveStyleRule("border-right", `1px solid ${DefaultTheme.colors.border}`)
    expect(panel).not.toHaveStyleRule("border-left")
    expect(panel).toHaveStyleRule(
      "box-shadow",
      `16px 0 40px -8px ${shadowColor},2px 0 6px ${shadowColor}`
    )
  })

  it("mirrors border and shadow for a right panel", () => {
    renderPanel({ right: true })
    const panel = screen.getByTestId("panel")
    expect(panel).toHaveStyleRule("right", "0")
    expect(panel).toHaveStyleRule("border-left", `1px solid ${DefaultTheme.colors.border}`)
    expect(panel).not.toHaveStyleRule("border-right")
    expect(panel).toHaveStyleRule(
      "box-shadow",
      `-16px 0 40px -8px ${shadowColor},-2px 0 6px ${shadowColor}`
    )
  })

  it("uses the theme scrim on the overlay", () => {
    renderPanel()
    expect(overlay()).toHaveStyleRule("background-color", "rgba(57, 65, 60, 0.32)")
    expect(overlay()).not.toHaveStyleRule("opacity")
  })

  it("closes on overlay click only when enabled", async () => {
    const onClose = jest.fn()
    const { unmount } = renderPanel({ onClose })
    await userEvent.click(overlay())
    expect(onClose).not.toHaveBeenCalled()
    unmount()

    renderPanel({ onClose, closeOnOverlayClick: true })
    await userEvent.click(overlay())
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("ignores Escape unless closeOnEsc is set", () => {
    const onClose = jest.fn()
    renderPanel({ onClose })
    fireEvent.keyDown(document, { keyCode: 27 })
    expect(onClose).not.toHaveBeenCalled()
  })
})
