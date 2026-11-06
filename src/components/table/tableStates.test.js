import React from "react"
import "jest-styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { DarkTheme, DefaultTheme } from "@/theme"
import Table from "./table"

const data = [{ id: "node-1", name: "Node 1" }]
const dataColumns = [{ id: "name", header: "Name", cell: ({ getValue }) => getValue() }]

describe("Table loading-more indicator", () => {
  it("reads as an inverse tooltip so it stays legible over rows", () => {
    renderWithProviders(
      <Table data={data} dataColumns={dataColumns} virtualizeOptions={{ loading: true }} />
    )

    const text = screen.getByText("Loading more...")
    expect(text).toHaveStyleRule("color", DefaultTheme.colors.tooltipText)
    expect(text.parentElement).toHaveStyleRule("background-color", DefaultTheme.colors.tooltipBg)
    expect(text.parentElement).toHaveStyleRule("border-radius", "6px")
  })

  it("uses the dark tooltip pair in the dark theme", () => {
    renderWithProviders(
      <Table data={data} dataColumns={dataColumns} virtualizeOptions={{ loading: true }} />,
      { theme: DarkTheme }
    )

    expect(screen.getByText("Loading more...")).toHaveStyleRule("color", DarkTheme.colors.tooltipText)
  })
})

describe("Table end-of-data warning", () => {
  it("shows the warning once loading has finished and no next page exists", () => {
    renderWithProviders(
      <Table
        data={data}
        dataColumns={dataColumns}
        virtualizeOptions={{ warning: "Showing the first 1000 rows", getHasNextPage: () => false }}
      />
    )

    expect(screen.getByText("Showing the first 1000 rows")).toBeInTheDocument()
  })

  it("hides the warning while more rows are loading", () => {
    renderWithProviders(
      <Table
        data={data}
        dataColumns={dataColumns}
        virtualizeOptions={{ warning: "Showing the first 1000 rows", loading: true }}
      />
    )

    expect(screen.queryByText("Showing the first 1000 rows")).toBeNull()
  })
})

describe("Table container", () => {
  it("draws its outer border by default and drops it when bordered is false", () => {
    const { rerender, container } = renderWithProviders(
      <Table data={data} dataColumns={dataColumns} />
    )
    expect(container.firstChild).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.tableBorder}`)

    rerender(<Table data={data} dataColumns={dataColumns} bordered={false} />)
    expect(container.firstChild).not.toHaveStyleRule("border", expect.anything())
  })
})
