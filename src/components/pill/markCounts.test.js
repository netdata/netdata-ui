import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme"
import { MarkCounts } from "./index"

const light = DefaultTheme.colors
const counts = [
  { tone: "error", count: 3, label: "critical" },
  { tone: "warning", count: 12, label: "warning" },
  { tone: "stale", dot: "hollow", count: 0, label: "stale" },
]

describe("MarkCounts", () => {
  it("renders one tone-coloured dot and number per count", () => {
    renderWithProviders(<MarkCounts counts={counts} />)
    const items = screen.getAllByTestId("mark-counts-item")
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent("3")
    expect(items[0]).toHaveStyleRule("color", light.errorSoftText)
    expect(items[1]).toHaveStyleRule("color", light.warningSoftText)
  })

  it("uses tabular numerals", () => {
    renderWithProviders(<MarkCounts counts={counts} />)
    expect(screen.getByTestId("mark-counts")).toHaveStyleRule(
      "font-variant-numeric",
      "tabular-nums"
    )
  })

  it("draws filled dots by default and a ring for hollow", () => {
    renderWithProviders(<MarkCounts counts={counts} />)
    const dots = screen.getAllByTestId("mark-counts-dot")
    expect(dots[0]).toHaveStyleRule("background-color", light.errorSoftText)
    expect(dots[2]).toHaveStyleRule("border", `1.5px solid ${light.staleSoftText}`)
  })

  it("gives screen readers the label with each count", () => {
    renderWithProviders(<MarkCounts counts={counts} />)
    const [first] = screen.getAllByTestId("mark-counts-item")
    expect(first).toHaveTextContent("3 critical")
    const label = screen.getByText("critical", { exact: false, selector: "span" })
    expect(label).toHaveStyleRule("position", "absolute")
    expect(label).toHaveStyleRule("clip", "rect(0 0 0 0)")
  })

  it("renders nothing to count when the list is empty", () => {
    renderWithProviders(<MarkCounts counts={[]} />)
    expect(screen.queryByTestId("mark-counts-item")).not.toBeInTheDocument()
  })
})
