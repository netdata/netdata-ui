import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import Pill from "./index"

describe("Pill component", () => {
  test("should render default component", () => {
    renderWithProviders(<Pill>Test</Pill>)

    expect(screen.queryByTestId("pill")).toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).toHaveAttribute("color", "bright")
    expect(screen.queryByTestId("pill-text")).toHaveStyleRule("font-size", "12px")
    expect(screen.queryByTestId("pill-icon-left")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-icon-right")).not.toBeInTheDocument()
  })

  test("should render component with custom test id", () => {
    renderWithProviders(<Pill data-testid="custom-pill">Test</Pill>)

    expect(screen.queryByTestId("pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).not.toBeInTheDocument()
    expect(screen.queryByTestId("custom-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("custom-pill-text")).toBeInTheDocument()
  })

  test("should render component with left icon only", () => {
    renderWithProviders(<Pill icon="alarm_bell" />)

    expect(screen.queryByTestId("pill-icon-left")).toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-icon-right")).not.toBeInTheDocument()
  })

  test("should render component with right icon only", () => {
    renderWithProviders(<Pill icon="alarm_bell" reverse />)

    expect(screen.queryByTestId("pill-icon-left")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-icon-right")).toBeInTheDocument()
  })

  test("should render component with small text", () => {
    renderWithProviders(<Pill textSize="small">Test</Pill>)

    expect(screen.queryByTestId("pill-text")).toHaveStyleRule("font-size", "11px")
  })

  test("should render component with normal text", () => {
    renderWithProviders(<Pill size="normal">Test</Pill>)

    expect(screen.queryByTestId("pill-text")).toHaveStyleRule("font-size", "12px")
  })

  test("should render component with custom colored text", () => {
    const mockedColor = "primary"
    renderWithProviders(<Pill color={mockedColor}>Test</Pill>)

    expect(screen.queryByTestId("pill-text")).toHaveAttribute("color", mockedColor)
  })

  test("should render component with hollowed warning colored text", () => {
    renderWithProviders(
      <Pill hollow flavour="warning">
        Test
      </Pill>
    )

    expect(screen.queryByTestId("pill-text")).toHaveAttribute("color", "warning")
  })

  test("should render clickable component", () => {
    const mockedOnClick = jest.fn()
    renderWithProviders(<Pill onClick={mockedOnClick}>Test</Pill>)

    expect(screen.queryByTestId("pill")).toHaveAttribute("cursor", "pointer")
  })
})
