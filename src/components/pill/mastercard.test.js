import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import MasterCard from "./mastercard"

describe("MasterCardPill component", () => {
  const mockedOnClick = jest.fn()
  test("should render default component", () => {
    renderWithProviders(<MasterCard onClick={mockedOnClick} />)
    expect(screen.queryByTestId("mastercard")).toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard")).not.toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-left-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-right-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard")).toHaveStyle("cursor: pointer;")
  })

  test("should render alert component", () => {
    renderWithProviders(<MasterCard isAlert onClick={mockedOnClick} />)
    expect(screen.queryByTestId("alert-mastercard")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-alarm-icon")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-left-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-right-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("alert-mastercard")).toHaveStyle("cursor: pointer;")
    expect(screen.queryByTestId("mastercard")).not.toHaveStyle("cursor: pointer;")
  })
})
