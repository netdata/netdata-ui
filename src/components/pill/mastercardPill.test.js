import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme"
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

  test.each(["errorSemi", "idleWarning", "idleClear", "idleError"])(
    "should use text color on the pale %s background",
    background => {
      renderWithProviders(<MasterCardPill background={background} text="0" />)
      expect(screen.getByTestId("mastercard-pill-text")).toHaveAttribute("color", "text")
    }
  )

  test("should keep bright text on a saturated background", () => {
    renderWithProviders(<MasterCardPill background="error" text="3" />)
    expect(screen.getByTestId("mastercard-pill-text")).toHaveAttribute("color", "bright")
  })

  test("should let hollow pills use their flavour text color", () => {
    renderWithProviders(
      <MasterCardPill hollow flavour="warning" background="warningSemi" text="2" />
    )
    expect(screen.getByTestId("mastercard-pill-text")).toHaveAttribute("color", "warning")
  })

  test("should keep the filled pill look rather than the soft default", () => {
    renderWithProviders(<MasterCardPill flavour="error" text="3" />)
    expect(screen.getByTestId("mastercard-pill")).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.error
    )
    expect(screen.getByTestId("mastercard-pill-text")).toHaveStyleRule("font-weight", "normal")
  })
})
