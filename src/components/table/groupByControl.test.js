import React from "react"
import { renderWithProviders, screen, waitFor } from "testUtilities"
import Table from "./table"

describe("Table Group By control", () => {
  it("keeps configured grouping active when the header control is hidden", async () => {
    const tableRef = { current: null }

    renderWithProviders(
      <Table
        data={[
          { id: "node-1", status: "live" },
          { id: "node-2", status: "live" },
        ]}
        dataColumns={[
          {
            id: "status",
            accessorKey: "status",
            header: "Status",
            cell: () => null,
          },
        ]}
        enableGroupByControl={false}
        getRowId={row => row.id}
        groupByColumns={{ status: { columns: ["status"], name: "Status" } }}
        grouping="status"
        tableRef={tableRef}
      />
    )

    await waitFor(() => expect(tableRef.current).not.toBeNull())

    expect(screen.queryByTestId("tableGroupBy")).not.toBeInTheDocument()
    expect(tableRef.current.getState().grouping).toEqual(["status"])
    expect(tableRef.current.getGroupedRowModel().rows).toHaveLength(1)
    expect(tableRef.current.getGroupedRowModel().rows[0]).toMatchObject({
      groupingColumnId: "status",
      groupingValue: "live",
    })
  })
})
