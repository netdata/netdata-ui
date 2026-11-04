import React from "react"
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import { Icon } from "@/components/icon"
import { DefaultTheme } from "@/theme/default"
import Tab from "."

const { colors } = DefaultTheme

const renderTab = (props = {}) =>
  renderWithProviders(
    <Tab index={2} id="node-1" icon={<Icon name="node_hollow" data-testid="tab-icon" />} {...props}>
      <span>Node one</span>
    </Tab>
  )

const getRoot = () => screen.getByText("Node one").closest("[data-index]")

describe("Navigation Tab", () => {
  it("keeps the DOM contract consumers query", () => {
    renderTab()
    const root = getRoot()
    expect(root).toHaveAttribute("data-index", "2")
    expect(root).toHaveAttribute("data-id", "node-1")
    expect(root).toHaveAttribute("tabindex", "0")
  })

  it("activates on click", () => {
    const onActivate = jest.fn()
    renderTab({ onActivate })
    fireEvent.click(getRoot())
    expect(onActivate).toHaveBeenCalledTimes(1)
  })

  it("shows a green focus ring for keyboard focus only, inset so neighbours do not clip it", () => {
    renderTab()
    const root = getRoot()
    expect(root).toHaveStyleRule("outline", `2px solid ${colors.primary}`, {
      modifier: ":focus-visible",
    })
    expect(root).toHaveStyleRule("outline-offset", "-2px", { modifier: ":focus-visible" })
    expect(root).toHaveStyleRule("outline", "none", { modifier: ":focus" })
  })

  it("replaces the icon with a labelled 20px close button on hover", () => {
    renderTab()
    expect(screen.queryByRole("button", { name: "Close tab" })).not.toBeInTheDocument()
    fireEvent.mouseOver(getRoot())
    const close = screen.getByRole("button", { name: "Close tab" })
    expect(close).toHaveStyleRule("width", "20px")
    expect(close).toHaveStyleRule("height", "20px")
    expect(close).toHaveStyleRule("border-radius", "4px")
    expect(close).toHaveStyleRule("background-color", colors.menuItemHover, { modifier: ":hover" })
    expect(screen.queryByTestId("tab-icon")).not.toBeInTheDocument()
  })

  // Keyboard users must be able to reach the close control, not only mouse users.
  it("shows the close button while the tab has keyboard focus and keeps it while focus moves onto it", async () => {
    renderTab()
    const root = getRoot()
    fireEvent.focus(root)
    const close = screen.getByRole("button", { name: "Close tab" })
    fireEvent.blur(root, { relatedTarget: close })
    expect(screen.getByRole("button", { name: "Close tab" })).toBeInTheDocument()
    fireEvent.blur(root, { relatedTarget: document.body })
    expect(screen.queryByRole("button", { name: "Close tab" })).not.toBeInTheDocument()
  })

  it("closes without activating and reports index and active state", () => {
    const onRemove = jest.fn()
    const onActivate = jest.fn()
    renderTab({ onRemove, onActivate, active: true })
    fireEvent.mouseOver(getRoot())
    fireEvent.click(screen.getByRole("button", { name: "Close tab" }))
    expect(onRemove).toHaveBeenCalledWith(2, true)
    expect(onActivate).not.toHaveBeenCalled()
  })

  it("never offers close on fixed tabs", () => {
    renderTab({ fixed: true })
    fireEvent.mouseOver(getRoot())
    expect(screen.queryByRole("button", { name: "Close tab" })).not.toBeInTheDocument()
    expect(screen.getByTestId("tab-icon")).toBeInTheDocument()
  })

  it("steps a fixed tab's icon from textLite to text on hover", () => {
    renderTab({ fixed: true })
    expect(screen.getByTestId("tab-icon")).toHaveStyleRule("fill", colors.textLite)
    fireEvent.mouseOver(getRoot())
    expect(screen.getByTestId("tab-icon")).toHaveStyleRule("fill", colors.text)
    fireEvent.mouseLeave(getRoot())
    expect(screen.getByTestId("tab-icon")).toHaveStyleRule("fill", colors.textLite)
  })

  it("hides the drag handle until the tab is hovered", () => {
    renderTab({ draggable: true })
    const handle = screen.getByTestId("navigation-tab-drag-handle")
    expect(handle).toHaveStyleRule("opacity", "0")
    fireEvent.mouseOver(getRoot())
    expect(screen.getByTestId("navigation-tab-drag-handle")).toHaveStyleRule("opacity", "1")
  })

  it("always shows the drag handle on the active tab", () => {
    renderTab({ draggable: true, active: true })
    expect(screen.getByTestId("navigation-tab-drag-handle")).toHaveStyleRule("opacity", "1")
  })

  it("does not render a drag handle for non-draggable tabs", () => {
    renderTab()
    expect(screen.queryByTestId("navigation-tab-drag-handle")).not.toBeInTheDocument()
  })

  it("renders the dragged source as a faded placeholder", () => {
    renderTab({ draggable: true, dragging: true })
    expect(getRoot()).toHaveStyleRule("opacity", "0.4")
  })

  it("hides the title when collapsed", () => {
    renderTab({ collapsed: true })
    expect(screen.queryByText("Node one")).not.toBeInTheDocument()
  })
})
