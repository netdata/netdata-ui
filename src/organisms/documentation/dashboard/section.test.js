import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import Section from "./section"
import Dashboard from "."

describe("Dashboard help Section", () => {
  it("divides sections with the shared border colour", () => {
    renderWithProviders(<Section title="Double Click">Reset charts.</Section>)
    const root = screen.getByText("Double Click").parentElement.parentElement
    expect(root).toHaveStyleRule("border-top", `1px solid ${DefaultTheme.colors.border}`)
  })

  it("omits the divider on the first section", () => {
    renderWithProviders(
      <Section title="Hover" topBorder={false}>
        Hover a chart.
      </Section>
    )
    const root = screen.getByText("Hover").parentElement.parentElement
    expect(root).not.toHaveStyleRule("border-top", expect.anything())
  })

  it("wraps plain string content in text", () => {
    renderWithProviders(<Section title="Double Click">Reset charts.</Section>)
    expect(screen.getByText("Reset charts.")).toBeInTheDocument()
  })

  it("renders mouse instructions by default", () => {
    renderWithProviders(<Dashboard />)
    expect(screen.getByTestId("dashboard")).toBeInTheDocument()
    expect(screen.getByText("Mouse Over / Hover")).toBeInTheDocument()
  })
})
