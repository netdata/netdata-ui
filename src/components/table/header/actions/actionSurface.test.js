import React from "react"
import "jest-styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { DarkTheme } from "@/theme/dark"
import Table from "@/components/table/table"

const data = [{ id: "node-1", name: "Node 1" }]
const dataColumns = [{ id: "name", accessorKey: "name", header: "Name", cell: ({ getValue }) => getValue() }]

const renderTable = () =>
  renderWithProviders(
    <Table
      data={data}
      dataColumns={dataColumns}
      enableColumnVisibility
      bulkActions={{ download: { handleAction: () => {} } }}
      getRowId={row => row.id}
    />,
    { theme: DarkTheme }
  )

// The search field is the prominent element in the toolbar; icon actions show a surface only on hover.
describe("table toolbar icon actions", () => {
  it.each([["download"], ["columnVisibility"]])("%s has no resting surface", id => {
    renderTable()
    const wrapper = screen.getByTestId(new RegExp(`^netdata-table-action-${id}`)).parentElement
    expect(wrapper).not.toHaveStyleRule("background-color", DarkTheme.colors.elementBackground)
  })

  it("still shows a surface on hover for an enabled action", () => {
    renderTable()
    const wrapper = screen.getByTestId(/^netdata-table-action-columnVisibility/).parentElement
    expect(wrapper).toHaveStyleRule("background-color", DarkTheme.colors.borderSecondary, {
      modifier: ":hover",
    })
  })
})
