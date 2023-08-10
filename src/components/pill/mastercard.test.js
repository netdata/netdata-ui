import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import MasterCard from "./mastercard"

describe("MasterCardPill component", () => {
  test("should render default component", () => {
    renderWithProviders(<MasterCard />)

    expect(screen.queryByTestId("mastercard")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-left-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-right-pill")).toBeInTheDocument()
  })

  test("should render component with custom test id", () => {
    renderWithProviders(<MasterCard data-testid="custom-mastercard" />)

    expect(screen.queryByTestId("mastercard")).not.toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-left-pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-right-pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("custom-mastercard")).toBeInTheDocument()
    expect(screen.queryByTestId("custom-mastercard-left-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("custom-mastercard-right-pill")).toBeInTheDocument()
  })

  test("should render clickable component", () => {
    const mockedOnClick = jest.fn()
    renderWithProviders(<MasterCard onClick={mockedOnClick} />)

    expect(screen.queryByTestId("mastercard")).toHaveStyleRule("cursor", "pointer")
  })
})
