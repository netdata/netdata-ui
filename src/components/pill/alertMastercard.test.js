import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import AlertMasterCard from "./alertMastercard"

describe("MasterCardPill component", () => {
  test("should render default component", () => {
    renderWithProviders(<AlertMasterCard />)

    expect(screen.queryByTestId("alert-mastercard")).toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard-icon-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard-left-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard-right-pill")).toBeInTheDocument()
  })

  test("should render component with custom test id", () => {
    renderWithProviders(<AlertMasterCard data-testid="custom-alert-mastercard" />)

    expect(screen.queryByTestId("alert-mastercard")).not.toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard-icon-pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard-left-pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard-right-pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("custom-alert-mastercard")).toBeInTheDocument()
    expect(screen.queryByTestId("custom-alert-mastercard-icon-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("custom-alert-mastercard-left-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("custom-alert-mastercard-right-pill")).toBeInTheDocument()
  })
})
