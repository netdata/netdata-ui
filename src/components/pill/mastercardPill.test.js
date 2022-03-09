import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import userEvent from "@testing-library/user-event"
import MasterCardPill from "./mastercardPill"

describe("MasterCardPill component", () => {
  test("should render default component", () => {
    renderWithProviders(<MasterCardPill />)
    expect(screen.queryByTestId("mastercard-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("background-color: #CFD5DA;")
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("border-color: #CFD5DA;")
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("margin: 0px 0px 0px -4px;")
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("padding: 4px 8px;")
  })

  test("should render default component for left side", () => {
    renderWithProviders(<MasterCardPill side="left" />)
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("background-color: #8F9EAA;")
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("border-color: #8F9EAA;")
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("min-width: 29px;")
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("padding: 4px 12px;")
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("position: relative;")
  })

  test("should render default component for left side with alert", () => {
    renderWithProviders(<MasterCardPill isAlert side="left" />)
    expect(screen.queryByTestId("mastercard-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-pill")).toHaveStyle("padding: 4px 8px;")
  })

  test("should call onClick", () => {
    const mockedOnClick = jest.fn()
    renderWithProviders(<MasterCardPill isClickable onClick={mockedOnClick} />)
    expect(mockedOnClick).not.toHaveBeenCalled()
    userEvent.click(screen.queryByTestId("mastercard-pill"))
    expect(mockedOnClick).toHaveBeenCalledTimes(1)
  })
})
