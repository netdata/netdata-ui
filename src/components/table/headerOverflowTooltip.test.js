import React from "react"
import { fireEvent, renderWithProviders, screen, waitFor } from "testUtilities"
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

it("publishes canonical overflow content without replacing column drag handles", async () => {
  const { container } = renderWithProviders(
    <Table data={[]} dataColumns={dataColumns} enableColumnReordering />
  )

  await waitFor(() => {
    expect(
      container.querySelector('[data-overflow-tooltip="XYZ complete dynamic column name"]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-overflow-tooltip="Complete literal column name"]')
    ).toBeInTheDocument()
    expect(container.querySelectorAll(".drag-handle[role=button]")).toHaveLength(2)
    expect(container.querySelectorAll("[data-overflow-tooltip] .drag-handle")).toHaveLength(0)
  })
})

it("opens a header tooltip with the default selector when the label is truncated", async () => {
  const { container } = renderWithProviders(
    <Table
      data={[]}
      dataColumns={dataColumns}
      overflowTooltip={{ isOverflowing: () => true }}
    />
  )

  await waitFor(() => {
    expect(
      container.querySelector('[data-overflow-tooltip="XYZ complete dynamic column name"]')
    ).toBeInTheDocument()
  })

  fireEvent.mouseOver(
    container.querySelector('[data-overflow-tooltip="XYZ complete dynamic column name"]')
  )

  await waitFor(() => {
    expect(screen.getByText("XYZ complete dynamic column name")).toBeInTheDocument()
  })
})
