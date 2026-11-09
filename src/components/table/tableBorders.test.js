import React from "react"
import "jest-styled-components"
import { fireEvent, renderWithProviders, screen } from "testUtilities"
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
    expect(container.firstChild).toHaveStyleRule("border-radius", "8px")
    expect(container.firstChild).toHaveStyleRule("overflow", "hidden")
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
    expect(screen.getByTestId("netdata-table-header-resize-handler-memory")).toHaveStyleRule(
      "background-color",
      "#123456",
      { modifier: "::after" }
    )
    for (const id of ["name", "cpu"]) {
      const handle = screen.getByTestId(`netdata-table-header-resize-handler-${id}`)
      expect(handle).toHaveStyleRule("background-color", DefaultTheme.colors.transparent.full, {
        modifier: "::after",
      })
      expect(handle).toHaveStyleRule("background-color", DefaultTheme.colors.resizerLine, {
        modifier: ":hover::after",
      })
    }
    const headerSections = screen.getAllByTestId("netdata-table-headRow")
    expect(headerSections[0].parentElement).not.toHaveStyleRule("border-right", "1px solid #123456")
    expect(headerSections[2].parentElement).not.toHaveStyleRule("border-left", "1px solid #123456")
    const row = screen.getByTestId("netdata-table-row")
    expect(row).toHaveStyleRule("border-bottom", "1px solid #123456")
    const sections = row.querySelectorAll(".row-content")
    expect(getComputedStyle(sections[0]).borderRightColor).not.toBe("rgb(18, 52, 86)")
    expect(getComputedStyle(sections[2]).borderLeftColor).not.toBe("rgb(18, 52, 86)")
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

it.each([false, true])(
  "uses the supplied surface across the table with direct cells=%s",
  async directCellContent => {
    const { container } = renderWithProviders(
      <Table
        data={data}
        dataColumns={[
          dataColumns[0],
          { header: "Resources", columns: [dataColumns[1]] },
          dataColumns[2],
        ]}
        title="Nodes"
        enablePagination
        columnPinning={{ left: ["name"], right: ["memory"] }}
        surface="workspaceBackground"
        virtualizeOptions={{ directCellContent }}
      />,
      { theme: { ...theme, colors: { ...theme.colors, workspaceBackground: "#E4F0EB" } } }
    )

    const row = await screen.findByTestId("netdata-table-row")
    const headerRows = screen.getAllByTestId(/^netdata-table-headRow/)
    expect(headerRows).toHaveLength(6)
    const parts = [
      container.firstChild,
      screen.getByTestId("netdata-table-header-container"),
      screen.getByTestId("netdata-table-head"),
      ...headerRows,
      row,
      ...row.querySelectorAll(".row-content"),
      screen.getByTestId("pagination-counter").parentElement,
    ]

    parts.forEach(part => {
      expect(getComputedStyle(part).backgroundColor).toBe("rgb(228, 240, 235)")
    })
  }
)

it.each([false, true])(
  "reveals only the pinned edges with more scrollable content with direct cells=%s",
  async directCellContent => {
    const onScroll = jest.fn()
    renderWithProviders(
      <Table
        data={data}
        dataColumns={dataColumns}
        columnPinning={{ left: ["name"], right: ["memory"] }}
        virtualizeOptions={{ directCellContent, onScroll }}
      />
    )
    const viewport = screen.getByTestId("netdata-table")
    await screen.findByTestId("netdata-table-row")
    expect(viewport.querySelectorAll('[data-table-pinned="left"]')).toHaveLength(2)
    expect(viewport.querySelectorAll('[data-table-pinned="right"]')).toHaveLength(2)

    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 200 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
      scrollWidth: { configurable: true, value: 300 },
    })
    fireEvent.scroll(viewport)
    expect(viewport).not.toHaveAttribute("data-can-scroll-left")
    expect(viewport).toHaveAttribute("data-can-scroll-right")

    viewport.scrollLeft = 60
    fireEvent.scroll(viewport)
    expect(viewport).toHaveAttribute("data-can-scroll-left")
    expect(viewport).toHaveAttribute("data-can-scroll-right")

    viewport.scrollLeft = 100
    fireEvent.scroll(viewport)
    expect(viewport).toHaveAttribute("data-can-scroll-left")
    expect(viewport).not.toHaveAttribute("data-can-scroll-right")

    Object.defineProperty(viewport, "scrollWidth", { configurable: true, value: 200 })
    viewport.scrollLeft = 0
    fireEvent.scroll(viewport)
    expect(viewport).not.toHaveAttribute("data-can-scroll-left")
    expect(viewport).not.toHaveAttribute("data-can-scroll-right")
    expect(onScroll).toHaveBeenCalledTimes(4)
  }
)
