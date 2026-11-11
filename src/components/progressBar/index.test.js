import { renderWithProviders, screen } from "testUtilities"
import ProgressBar from "."

describe("ProgressBar component", () => {
  test("should render component with width", () => {
    renderWithProviders(<ProgressBar width="20%" />)

    expect(screen.getByTestId("progressBar")).toBeInTheDocument()
    expect(screen.getByTestId("progressBar-progress20%")).toBeInTheDocument()
  })

  test("should render component with value", () => {
    renderWithProviders(
      <ProgressBar
        value={[
          { color: ["blue", "indigo"], width: "30%" },
          { color: ["green", "limeGreen"], width: "60%" },
        ]}
      />
    )

    expect(screen.getByTestId("progressBar")).toBeInTheDocument()
    expect(screen.getByTestId("progressBar-progress30%")).toBeInTheDocument()
    expect(screen.getByTestId("progressBar-progress60%")).toBeInTheDocument()
  })
})

describe("ProgressBar styles", () => {
  const { DefaultTheme, DarkTheme } = require("@/theme")
  const light = DefaultTheme.colors

  it("uses the quiet separator track by default", () => {
    renderWithProviders(<ProgressBar width="40%" />)
    expect(screen.getByTestId("progressBar")).toHaveStyleRule("background-color", light.separator)
  })

  it("uses the dark separator track in dark theme", () => {
    renderWithProviders(<ProgressBar width="40%" />, { theme: DarkTheme })
    expect(screen.getByTestId("progressBar")).toHaveStyleRule(
      "background-color",
      DarkTheme.colors.separator
    )
  })

  it("honours a consumer track background", () => {
    renderWithProviders(<ProgressBar width="40%" background="border" />)
    expect(screen.getByTestId("progressBar")).toHaveStyleRule("background-color", light.border)
  })

  it("clips segments inside a 2px rounded track without borders", () => {
    renderWithProviders(<ProgressBar width="100%" />)
    const track = screen.getByTestId("progressBar")
    expect(track).toHaveStyleRule("overflow", "hidden")
    expect(track).toHaveStyleRule("border-radius", "2px")
    expect(track).not.toHaveStyleRule("border")
  })

  it("renders segments flat: no own border or radius", () => {
    renderWithProviders(<ProgressBar width="100%" color="primary" />)
    const segment = screen.getByTestId("progressBar-progress100%")
    expect(segment).toHaveStyleRule("background-color", light.primary)
    expect(segment).not.toHaveStyleRule("border")
    expect(segment).not.toHaveStyleRule("border-radius")
  })

  it("separates adjacent segments with a 1px track-colored divider", () => {
    renderWithProviders(
      <ProgressBar
        value={[
          { color: "primary", width: "30%" },
          { color: "warning", width: "40%" },
        ]}
      />
    )
    expect(screen.getByTestId("progressBar")).toHaveStyleRule(
      "box-shadow",
      `inset -1px 0 0 ${light.separator}`,
      { modifier: "&>*:not(:last-child)" }
    )
  })

  it("animates width changes and respects reduced motion", () => {
    renderWithProviders(<ProgressBar width="40%" />)
    const segment = screen.getByTestId("progressBar-progress40%")
    expect(segment).toHaveStyleRule("transition", "width 160ms ease-out")
    expect(segment).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion:reduce)",
    })
  })

  it("keeps the 8px default height and accepts a dense height", () => {
    const { unmount } = renderWithProviders(<ProgressBar width="40%" />)
    expect(screen.getByTestId("progressBar")).toHaveStyleRule("height", "8px")
    unmount()
    renderWithProviders(<ProgressBar width="40%" height={1} />)
    expect(screen.getByTestId("progressBar")).toHaveStyleRule("height", "4px")
  })

  it("skips 0% segments", () => {
    renderWithProviders(
      <ProgressBar
        value={[
          { color: "primary", width: "0%" },
          { color: "warning", width: "50%" },
        ]}
      />
    )
    expect(screen.queryByTestId("progressBar-progress0%")).not.toBeInTheDocument()
    expect(screen.getByTestId("progressBar-progress50%")).toBeInTheDocument()
  })
})
