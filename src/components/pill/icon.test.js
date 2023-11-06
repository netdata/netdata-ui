import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import PillIcon from "./icon"

describe("PillIcon component", () => {
  test("should not render component", () => {
    renderWithProviders(<PillIcon />)
    expect(screen.queryByTestId("pill-icon")).not.toBeInTheDocument()
  })

  test("should render default component", () => {
    renderWithProviders(<PillIcon icon="alarm_bell" />)
    expect(screen.queryByTestId("pill-icon")).toBeInTheDocument()
    expect(screen.queryByTestId("pill-icon")).toHaveAttribute("color", "bright")
    expect(screen.queryByTestId("pill-icon")).toHaveAttribute("height", "14px")
    expect(screen.queryByTestId("pill-icon")).toHaveAttribute("width", "14px")
  })

  test("should render component with custom test id", () => {
    const mockedIcon = <div data-testid="custom-icon">Icon</div>
    renderWithProviders(<PillIcon icon={mockedIcon} />)
    expect(screen.queryByTestId("pill-icon")).not.toBeInTheDocument()
    expect(screen.queryByTestId("custom-icon")).toBeInTheDocument()
  })

  test("should render component with custom color", () => {
    const mockedColor = "primary"
    renderWithProviders(<PillIcon icon="alarm_bell" color={mockedColor} />)
    expect(screen.queryByTestId("pill-icon")).toHaveAttribute("color", mockedColor)
  })

  test("should render component with hollowed warning color", () => {
    renderWithProviders(<PillIcon icon="alarm_bell" hollow flavour="warning" />)
    expect(screen.queryByTestId("pill-icon")).toHaveAttribute("color", "warning")
  })
})
