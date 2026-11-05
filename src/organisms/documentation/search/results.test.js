import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import SearchResults from "./results"

const { colors } = DefaultTheme

const result = (id, title, description) => ({
  id: { raw: id },
  url: { raw: `https://learn.netdata.cloud/docs/${id}` },
  title: { snippet: title },
  description: { snippet: description },
})

const results = {
  "learn.netdata": [
    result("alerts", "<em>Alert</em> notifications", "Configure <em>alert</em> methods"),
    result("silence", "Silencing alerts", "Mute during maintenance"),
  ],
  discourse: [],
}

describe("SearchResults", () => {
  it("keeps 1000px on wide screens but never overflows the viewport beside the layer margins", () => {
    renderWithProviders(<SearchResults results={results} />)
    const root = screen.getByTestId("searchResults")
    expect(root).toHaveStyleRule("width", "1000px")
    expect(root).toHaveStyleRule("max-width", "calc(100vw - 136px)")
  })

  it("links each result title to its page in a new tab", () => {
    renderWithProviders(<SearchResults results={results} />)
    const title = screen.getByRole("link", { name: "Alert notifications" })
    expect(title).toHaveAttribute("href", "https://learn.netdata.cloud/docs/alerts")
    expect(title).toHaveAttribute("target", "_blank")
  })

  it("renders the title as a bold Text anchor that turns primary on hover", () => {
    renderWithProviders(<SearchResults results={results} />)
    const title = screen.getByRole("link", { name: "Alert notifications" })
    expect(title.tagName).toBe("A")
    expect(title).toHaveStyleRule("font-weight", "600")
    expect(title).toHaveStyleRule("text-decoration", "none")
    expect(title).toHaveStyleRule("color", colors.primary, { modifier: ":hover" })
  })

  it("offsets the Read underline by the 2px grid step", () => {
    renderWithProviders(<SearchResults results={results} />)
    const [read] = screen.getAllByRole("link", { name: "Read" })
    expect(read).toHaveStyleRule("text-underline-offset", "2px", { modifier: ":hover" })
  })

  it("keeps a Read link without the arrow glyph", () => {
    renderWithProviders(<SearchResults results={results} />)
    const reads = screen.getAllByRole("link", { name: "Read" })
    expect(reads).toHaveLength(2)
    expect(reads[0]).toHaveAttribute("href", "https://learn.netdata.cloud/docs/alerts")
    expect(screen.queryByText(/→/)).not.toBeInTheDocument()
  })

  it("highlights matches in bold ink instead of italics", () => {
    renderWithProviders(<SearchResults results={results} />)
    const row = screen.getByRole("link", { name: "Alert notifications" }).parentElement
    expect(row).toHaveStyleRule("font-style", "normal", { modifier: "em" })
    expect(row).toHaveStyleRule("font-weight", "600", { modifier: "em" })
    expect(row).toHaveStyleRule("color", colors.main, { modifier: "em" })
  })

  it("separates results with the shared border colour", () => {
    renderWithProviders(<SearchResults results={results} />)
    const row = screen.getByRole("link", { name: "Alert notifications" }).parentElement
    expect(row).toHaveStyleRule("border-bottom", `1px solid ${colors.border}`, {
      modifier: ":not(:last-child)",
    })
  })

  it("mutes the description so the title leads", () => {
    renderWithProviders(<SearchResults results={results} />)
    expect(screen.getByText("Mute during maintenance…")).toHaveStyleRule("color", colors.textLite)
  })

  it("shows the result count in the tab label and an empty state for other tabs", () => {
    renderWithProviders(<SearchResults results={results} />)
    expect(screen.getByText(/Documentation\s+\(2\)/)).toBeInTheDocument()
  })

  it("shows No results when a tab is empty", () => {
    renderWithProviders(<SearchResults results={{ discourse: [] }} />)
    expect(screen.getByText("No results")).toBeInTheDocument()
  })
})
