import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import MasterCardPill from "./mastercardPill"

describe("MasterCardPill component", () => {
  test("should render default component", () => {
    renderWithProviders(<MasterCardPill />)

    expect(screen.queryByTestId("mastercard-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-pill")).toHaveTextContent("-")
  })

  test("should render component with custom test id", () => {
    renderWithProviders(<MasterCardPill data-testid="custom-mastercard-pill" />)

    expect(screen.queryByTestId("mastercard-pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("custom-mastercard-pill")).toBeInTheDocument()
  })

  test("should render component with text", () => {
    const mockedText = "sample"
    renderWithProviders(<MasterCardPill text={mockedText} />)

    expect(screen.queryByTestId("mastercard-pill")).toHaveTextContent(mockedText)
  })

  test("should render component with icon", () => {
    renderWithProviders(<MasterCardPill icon="alarm_bell" />)

    expect(screen.queryByTestId("mastercard-pill")).not.toHaveTextContent("-")
  })
})
