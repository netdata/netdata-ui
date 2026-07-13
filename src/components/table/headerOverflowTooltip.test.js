import React from "react"
import { renderWithProviders, waitFor } from "testUtilities"
import Table from "./table"

const dataColumns = [
  {
    id: "dynamic",
    accessorKey: "dynamic",
    header: <span>XYZ…</span>,
    headerString: () => "XYZ complete dynamic column name",
  },
  {
    id: "literal",
    accessorKey: "literal",
    header: "Complete literal column name",
  },
]

it("publishes dedicated header overflow content without replacing column drag handles", async () => {
  const { container } = renderWithProviders(
    <Table data={[]} dataColumns={dataColumns} enableColumnReordering />
  )

  await waitFor(() => {
    expect(
      container.querySelector('[data-table-header-tooltip="XYZ complete dynamic column name"]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-table-header-tooltip="Complete literal column name"]')
    ).toBeInTheDocument()
    expect(container.querySelectorAll(".drag-handle[role=button]")).toHaveLength(2)
    expect(container.querySelectorAll("[data-table-header-tooltip] .drag-handle")).toHaveLength(0)
    expect(container.querySelectorAll("[data-overflow-tooltip]")).toHaveLength(0)
  })
})
