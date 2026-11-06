import React from "react"
import "jest-styled-components"
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import { DefaultTheme } from "@/theme"
import Table from "../table"

const data = Array.from({ length: 5 }, (_, index) => ({
  id: `node-${index}`,
  name: `Node ${index}`,
}))
const dataColumns = [{ id: "name", header: "Name", cell: ({ getValue }) => getValue() }]

const firstPage = { pageIndex: 0, pageSize: 2 }

const renderPaginated = (paginationOptions = firstPage) =>
  renderWithProviders(
    <Table
      data={data}
      dataColumns={dataColumns}
      enablePagination
      paginationOptions={paginationOptions}
    />
  )

describe("Table pagination", () => {
  it("counts pages from one", () => {
    renderPaginated()

    expect(screen.getByTestId("pagination-counter").textContent).toBe("Page 1 of 3")
  })

  it("shows the 1-based number of a later initial page", () => {
    renderPaginated({ pageIndex: 1, pageSize: 2 })

    expect(screen.getByTestId("pagination-counter").textContent).toBe("Page 2 of 3")
    expect(screen.getByTestId("pagination-go-to-first")).toBeEnabled()
    expect(screen.getByTestId("pagination-go-to-last")).toBeEnabled()
  })

  it("disables backward navigation on the first page", () => {
    renderPaginated()

    expect(screen.getByTestId("pagination-go-to-first")).toBeDisabled()
    expect(screen.getByTestId("pagination-go-to-previous")).toBeDisabled()
    expect(screen.getByTestId("pagination-go-to-next")).toBeEnabled()
  })

  it("reports zero pages when there is no data", () => {
    renderWithProviders(
      <Table
        data={[]}
        dataColumns={dataColumns}
        enablePagination
        paginationOptions={{ pageIndex: 0, pageSize: 2 }}
      />
    )

    expect(screen.getByTestId("pagination-counter").textContent).toBe("Page 0 of 0")
  })

  it("labels the First button tooltip as First", async () => {
    // Disabled buttons swallow mouse events, so start past the first page.
    renderPaginated({ pageIndex: 1, pageSize: 2 })

    fireEvent.mouseEnter(screen.getByTestId("pagination-go-to-first"))

    expect(await screen.findByText("First")).toBeInTheDocument()
    expect(screen.queryByText("test")).not.toBeInTheDocument()
  })

  it("pads the bar, spaces its controls and uses the main divider", () => {
    renderPaginated()

    const bar = screen.getByTestId("pagination-counter").parentElement
    expect(bar).toHaveStyleRule("height", "36px")
    expect(bar).toHaveStyleRule("padding", "0 8px")
    expect(bar).toHaveStyleRule("gap", "4px")
    expect(bar).toHaveStyleRule("border-top", `1px solid ${DefaultTheme.colors.tableBorder}`)
  })

  it("renders the counter with tabular numerals in the lite text colour", () => {
    renderPaginated()

    const counter = screen.getByTestId("pagination-counter")
    expect(counter).toHaveStyleRule("font-variant-numeric", "tabular-nums")
    expect(counter).toHaveStyleRule("color", DefaultTheme.colors.textLite)
  })
})
