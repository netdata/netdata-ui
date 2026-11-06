import React from "react"
import "jest-styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme"
import Table from "./table"

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    tableBorder: "#123456",
    border: "#AA00BB",
    borderSecondary: "#BB00AA",
  },
}

const data = [{ name: "Node", cpu: 42, memory: 12 }]
const dataColumns = ["name", "cpu", "memory"].map(id => ({
  id,
  header: id,
  cell: ({ getValue }) => getValue(),
}))

it.each([false, true])(
  "uses the independent table border for structural lines with direct cells=%s",
  async directCellContent => {
    const { container } = renderWithProviders(
      <Table
        data={data}
        dataColumns={dataColumns}
        title="Nodes"
        enablePagination
        enableResizing
        columnPinning={{ left: ["name"], right: ["memory"] }}
        virtualizeOptions={{ directCellContent }}
      />,
      { theme }
    )
    expect(container.firstChild).toHaveStyleRule("border", "1px solid #123456")
    expect(screen.getByTestId("netdata-table-header-container")).toHaveStyleRule(
      "border-bottom",
      "1px solid #123456"
    )
    expect(await screen.findByTestId("netdata-table-head")).toHaveStyleRule(
      "border-bottom",
      "1px solid #123456"
    )
    expect(screen.getByTestId("pagination-counter").parentElement).toHaveStyleRule(
      "border-top",
      "1px solid #123456"
    )
    expect(screen.getByTestId("netdata-table-header-resize-handler-cpu")).toHaveStyleRule(
      "background-color",
      "#123456",
      { modifier: "::after" }
    )
    const headerSections = screen.getAllByTestId("netdata-table-headRow")
    expect(headerSections[0].parentElement).toHaveStyleRule("border-right", "1px solid #123456")
    expect(headerSections[2].parentElement).toHaveStyleRule("border-left", "1px solid #123456")
    const row = screen.getByTestId("netdata-table-row")
    expect(row).toHaveStyleRule("border-bottom", "1px solid #123456")
    const sections = row.querySelectorAll(".row-content")
    expect(getComputedStyle(sections[0]).borderRightColor).toBe("rgb(18, 52, 86)")
    expect(getComputedStyle(sections[2]).borderLeftColor).toBe("rgb(18, 52, 86)")
  }
)

it.each([false, true])(
  "keeps header roles independent and sorted cell bases uniform with direct cells=%s",
  async directCellContent => {
    const surfaceTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        mainBackground: "#DDEEFF",
        panelBg: "#ABABAB",
        tableHeaderBackground: "#FEDCBA",
      },
    }
    renderWithProviders(
      <Table
        data={data}
        dataColumns={dataColumns}
        enableSorting
        enableResizing
        sortBy={dataColumns.map(({ id }) => ({ id, desc: true }))}
        coloredSortedColumn={false}
        columnPinning={{ left: ["name"], right: ["actions"] }}
        rowActions={{ info: { handleAction: () => {} } }}
        virtualizeOptions={{ directCellContent }}
      />,
      { theme: surfaceTheme }
    )
    expect(await screen.findByTestId("netdata-table-head")).toHaveStyleRule(
      "background-color",
      "#FEDCBA"
    )
    screen.getAllByTestId("netdata-table-headRow").forEach(header => {
      expect(header).toHaveStyleRule("background-color", "#FEDCBA")
    })
    const row = screen.getByTestId("netdata-table-row")
    expect(row).toHaveStyleRule("background-color", "#DDEEFF")
    const cells = row.querySelectorAll('[data-testid^="netdata-table-cell-"]')
    expect(cells).toHaveLength(4)
    cells.forEach(cell => {
      expect(getComputedStyle(cell).backgroundColor).toBe("rgba(0, 0, 0, 0)")
      let surface = cell.parentElement
      while (getComputedStyle(surface).backgroundColor === "rgba(0, 0, 0, 0)") {
        surface = surface.parentElement
      }
      expect(getComputedStyle(surface).backgroundColor).toBe("rgb(221, 238, 255)")
    })
    screen.getAllByTestId("netdata-table-header-cell-label-container").forEach(label => {
      expect(getComputedStyle(label.parentElement.parentElement).backgroundColor).toBe(
        "rgba(0, 0, 0, 0)"
      )
    })
  }
)
