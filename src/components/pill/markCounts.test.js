import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { MarkCounts } from "./index"

const light = DefaultTheme.colors
const counts = [
  { tone: "error", count: 3, label: "critical" },
  { tone: "warning", count: 12, label: "warning" },
  { tone: "stale", dot: "hollow", count: 0, label: "stale" },
]

describe("MarkCounts", () => {
  it("renders a tabular, tone-coloured dot, number and screen-reader label per count", () => {
    renderWithProviders(<MarkCounts counts={counts} />)
    const items = screen.getAllByTestId("mark-counts-item")
    const dots = screen.getAllByTestId("mark-counts-dot")
    const label = screen.getByText("critical", { exact: false, selector: "span" })

    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent("3")
    expect(items[0]).toHaveStyleRule("color", light.errorSoftText)
    expect(items[1]).toHaveStyleRule("color", light.warningSoftText)
    expect(screen.getByTestId("mark-counts")).toHaveStyleRule(
      "font-variant-numeric",
      "tabular-nums"
    )
    expect(dots[0]).toHaveStyleRule("background-color", light.errorSoftText)
    expect(dots[2]).toHaveStyleRule("border", `1.5px solid ${light.staleSoftText}`)
    expect(items[0]).toHaveTextContent("3 critical")
    expect(label).toHaveStyleRule("position", "absolute")
    expect(label).toHaveStyleRule("clip", "rect(0 0 0 0)")
  })

  it("renders nothing to count when the list is empty", () => {
    renderWithProviders(<MarkCounts counts={[]} />)
    expect(screen.queryByTestId("mark-counts-item")).not.toBeInTheDocument()
  })
})

it.each([DefaultTheme, DarkTheme])(
  "preserves domain mark ink, sizes and alignment in $name",
  theme => {
    renderWithProviders(
      <MarkCounts
        margin={[0, 0, 0, "auto"]}
        counts={[
          { color: "textInfo", dotSize: 1.5, count: 2, label: "edited" },
          {
            color: "segmentedAccentText",
            dot: "dashed",
            dotSize: 1.75,
            count: 1,
            label: "to fill",
          },
        ]}
      />,
      { theme }
    )
    const items = screen.getAllByTestId("mark-counts-item")
    const dots = screen.getAllByTestId("mark-counts-dot")
    expect(screen.getByTestId("mark-counts")).toHaveStyleRule("margin", "0 0 0 auto")
    expect(items[0]).toHaveStyleRule("color", theme.colors.textInfo)
    expect(items[0]).toHaveTextContent("2 edited")
    expect(dots[0]).toHaveStyleRule("width", "6px")
    expect(dots[0]).toHaveStyleRule("background-color", theme.colors.textInfo)
    expect(dots[1]).toHaveStyleRule("border", `1.5px dashed ${theme.colors.segmentedAccentText}`)
    expect(dots[1]).toHaveStyleRule("width", "7px")
  }
)
