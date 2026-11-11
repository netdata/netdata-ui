import { renderWithProviders, screen, userEvent } from "testUtilities"
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

describe("AlertMasterCard segmented styles", () => {
  const segments = {
    pillLeft: { flavour: "error", text: "3" },
    pillRight: { flavour: "warning", text: "2" },
    pillEnd: { flavour: "clear", text: "223" },
  }

  it("separates the label and count segments with a 1px seam", () => {
    renderWithProviders(<AlertMasterCard {...segments} />)
    expect(screen.getByTestId("alert-mastercard")).toHaveStyleRule("gap", "1px")
    ;["left", "right", "end"].forEach(side =>
      expect(screen.getByTestId(`alert-mastercard-${side}-pill`)).not.toHaveStyleRule("margin")
    )
  })

  it("rounds the label pill on the left and the last count on the right", () => {
    renderWithProviders(<AlertMasterCard {...segments} />)
    const label = screen.getByTestId("alert-mastercard-icon-pill")
    const left = screen.getByTestId("alert-mastercard-left-pill")
    const end = screen.getByTestId("alert-mastercard-end-pill")
    expect(label).toHaveStyleRule("border-top-left-radius", "30px")
    expect(label).not.toHaveStyleRule("border-top-right-radius")
    expect(left).not.toHaveStyleRule("border-radius")
    expect(left).not.toHaveStyleRule("border-top-left-radius")
    expect(end).toHaveStyleRule("border-top-right-radius", "30px")
  })

  it("rounds the first count on the left when the label is hidden", () => {
    renderWithProviders(<AlertMasterCard {...segments} labelProps={{ hidden: true }} />)
    expect(screen.queryByTestId("alert-mastercard-icon-pill")).not.toBeInTheDocument()
    expect(screen.getByTestId("alert-mastercard-left-pill")).toHaveStyleRule(
      "border-top-left-radius",
      "30px"
    )
  })

  it("keeps the label pill on the neutral alert surface with a text-colored bell", () => {
    renderWithProviders(<AlertMasterCard {...segments} />)
    expect(screen.getByTestId("alert-mastercard-icon-pill-icon-left")).toHaveAttribute(
      "color",
      "text"
    )
  })

  it("pads count segments equally", () => {
    renderWithProviders(<AlertMasterCard {...segments} size="large" />)
    ;["left", "right", "end"].forEach(side =>
      expect(screen.getByTestId(`alert-mastercard-${side}-pill`)).toHaveStyleRule(
        "padding",
        "0 10px"
      )
    )
  })

  it("shows readable text on idle default counts", () => {
    renderWithProviders(<AlertMasterCard />)
    expect(screen.getByTestId("alert-mastercard-left-pill-text")).toHaveAttribute("color", "text")
  })

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn()
    renderWithProviders(<AlertMasterCard {...segments} onClick={onClick} />)
    await userEvent.click(screen.getByTestId("alert-mastercard-left-pill"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test("keeps the filled segment look with normal-weight text", () => {
    renderWithProviders(<AlertMasterCard pillLeft={{ flavour: "error", text: "3" }} />)
    expect(screen.getByTestId("alert-mastercard-left-pill-text")).toHaveStyleRule(
      "font-weight",
      "normal"
    )
  })
})
