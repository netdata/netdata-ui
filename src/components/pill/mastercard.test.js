import { renderWithProviders, screen, userEvent } from "testUtilities"
import { DarkTheme } from "@/theme/dark"
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

describe("MasterCard segmented styles", () => {
  const segments = {
    pillLeft: { flavour: "error", text: "3" },
    pillRight: { flavour: "warning", text: "2" },
    pillEnd: { flavour: "clear", text: "223" },
  }

  it("separates segments with a 1px seam instead of overlapping them", () => {
    renderWithProviders(<MasterCard {...segments} />)
    expect(screen.getByTestId("mastercard")).toHaveStyleRule("gap", "1px")
    expect(screen.getByTestId("mastercard-right-pill")).not.toHaveStyleRule("margin")
    expect(screen.getByTestId("mastercard-end-pill")).not.toHaveStyleRule("margin")
  })

  it.each([
    ["default", undefined, "0 8px"],
    ["large", "large", "0 10px"],
  ])("pads every %s segment equally", (_, size, padding) => {
    renderWithProviders(<MasterCard {...segments} size={size} />)
    ;["left", "right", "end"].forEach(side =>
      expect(screen.getByTestId(`mastercard-${side}-pill`)).toHaveStyleRule("padding", padding)
    )
  })

  it("rounds only the outer ends of the track", () => {
    renderWithProviders(<MasterCard {...segments} />)
    const left = screen.getByTestId("mastercard-left-pill")
    const right = screen.getByTestId("mastercard-right-pill")
    const end = screen.getByTestId("mastercard-end-pill")
    expect(left).toHaveStyleRule("border-top-left-radius", "30px")
    expect(left).toHaveStyleRule("border-bottom-left-radius", "30px")
    expect(left).not.toHaveStyleRule("border-top-right-radius")
    expect(right).not.toHaveStyleRule("border-radius")
    expect(right).not.toHaveStyleRule("border-top-left-radius")
    expect(end).toHaveStyleRule("border-top-right-radius", "30px")
    expect(end).toHaveStyleRule("border-bottom-right-radius", "30px")
  })

  it("rounds the right pill end when there is no end pill", () => {
    renderWithProviders(<MasterCard pillLeft={segments.pillLeft} pillRight={segments.pillRight} />)
    expect(screen.getByTestId("mastercard-right-pill")).toHaveStyleRule(
      "border-top-right-radius",
      "30px"
    )
  })

  it("applies a consumer round to every segment", () => {
    renderWithProviders(<MasterCard {...segments} round={1} />)
    ;["left", "right", "end"].forEach(side =>
      expect(screen.getByTestId(`mastercard-${side}-pill`)).toHaveStyleRule("border-radius", "4px")
    )
  })

  it("gives large segments the large min-width (dead rest.size bug)", () => {
    renderWithProviders(<MasterCard {...segments} size="large" />)
    ;["left", "right", "end"].forEach(side =>
      expect(screen.getByTestId(`mastercard-${side}-pill`)).toHaveStyleRule("min-width", "37px")
    )
  })

  it("keeps the default min-width for default segments", () => {
    renderWithProviders(<MasterCard {...segments} />)
    expect(screen.getByTestId("mastercard-left-pill")).toHaveStyleRule("min-width", "22px")
  })

  it("shows readable text on idle default segments", () => {
    renderWithProviders(<MasterCard />)
    expect(screen.getByTestId("mastercard-left-pill-text")).toHaveAttribute("color", "text")
    expect(screen.getByTestId("mastercard-right-pill-text")).toHaveAttribute("color", "text")
    expect(screen.getByTestId("mastercard-left-pill-text")).toHaveTextContent("-")
  })

  it("keeps the empty dash at text contrast on dark idle fills, not the dimmer textLite", () => {
    renderWithProviders(<MasterCard pillEnd={{}} />, { theme: DarkTheme })
    ;["left", "right", "end"].forEach(side => {
      const dash = screen.getByTestId(`mastercard-${side}-pill-text`)
      expect(dash).toHaveTextContent("-")
      expect(dash).toHaveStyleRule("color", DarkTheme.colors.text)
    })
  })

  it("keeps bright text on saturated segments, by flavour or explicit background", () => {
    renderWithProviders(
      <MasterCard
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ background: "warning", text: "2" }}
      />
    )
    expect(screen.getByTestId("mastercard-left-pill-text")).toHaveAttribute("color", "bright")
    expect(screen.getByTestId("mastercard-right-pill-text")).toHaveAttribute("color", "bright")
  })

  it("honours an explicit segment text color", () => {
    renderWithProviders(<MasterCard pillLeft={{ text: "1", color: "primary" }} />)
    expect(screen.getByTestId("mastercard-left-pill-text")).toHaveAttribute("color", "primary")
  })

  it("renders custom children instead of the default segments", () => {
    renderWithProviders(
      <MasterCard>
        <span>custom</span>
      </MasterCard>
    )
    expect(screen.getByText("custom")).toBeInTheDocument()
    expect(screen.queryByTestId("mastercard-left-pill")).not.toBeInTheDocument()
  })

  it("calls onClick when the track is clicked", async () => {
    const onClick = jest.fn()
    renderWithProviders(<MasterCard {...segments} onClick={onClick} />)
    await userEvent.click(screen.getByTestId("mastercard-right-pill"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test("keeps the filled segment look with normal-weight text", () => {
    renderWithProviders(<MasterCard pillLeft={{ flavour: "error", text: "3" }} />)
    expect(screen.getByTestId("mastercard-left-pill-text")).toHaveStyleRule("font-weight", "normal")
  })
})
