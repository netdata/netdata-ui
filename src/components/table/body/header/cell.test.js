import React from "react"
import { renderWithProviders, screen, waitFor } from "testUtilities"
import Table from "../../table"
import { getHeaderTooltipContent } from "./cell"

it("uses the canonical header string before rendered header content", () => {
  expect(
    getHeaderTooltipContent({
      header: <span>Rendered abbreviation</span>,
      headerString: () => "Complete column name",
    })
  ).toBe("Complete column name")
})

it("uses a literal header when no canonical header string exists", () => {
  expect(getHeaderTooltipContent({ header: "Complete column name" })).toBe("Complete column name")
})

it("marks complex headers for lazy visible-text resolution", () => {
  expect(getHeaderTooltipContent({ header: <span>Complete column name</span> })).toBe("")
  expect(getHeaderTooltipContent({})).toBeUndefined()
})

describe("header cell height", () => {
  const column = {
    id: "state",
    accessorKey: "state",
    header: "Status",
    headerString: "Status",
    filterFn: () => true,
  }

  const renderHeaderCell = meta =>
    renderWithProviders(
      <Table
        data={[]}
        dataColumns={[{ ...column, enableColumnFilter: !!meta, meta }]}
        enableColumnFilters={!!meta}
        enableResizing
      />
    )

  const headerCell = async () =>
    (await waitFor(() => screen.getByTestId("netdata-table-header-resize-handler-state")))
      .parentElement

  it("keeps the row compact when the header holds only a label", async () => {
    renderHeaderCell()

    expect(await headerCell()).toHaveStyleRule("min-height", "40px")
  })

  it("grows past the compact row so a header filter is not cut off", async () => {
    renderHeaderCell({
      filter: { component: "select", isMulti: true, options: [{ value: "Live", label: "Live" }] },
    })

    const cell = await headerCell()
    expect(cell).toHaveStyleRule("min-height", "40px")
    expect(cell).not.toHaveStyleRule("height", "40px")
  })
})
