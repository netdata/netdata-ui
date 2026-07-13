import React from "react"
import { act, renderWithProviders, waitFor } from "testUtilities"
import Table from "./table"

jest.mock("./body", () => {
  const ReactModule = require("react")
  const MockBody = props => {
    const { onWindowChange, table } = props
    const rows = table.getRowModel().rows

    ReactModule.useEffect(() => {
      const rowCount = props.largeDataSource?.getRowCount() || rows.length
      const startIndex = Math.min(10_000, Math.max(0, rowCount - 30))
      onWindowChange({ startIndex, endIndex: Math.min(rowCount, startIndex + 30) })
    }, [onWindowChange, props.largeDataSource, rows.length])

    return (
      <div
        data-testid="large-data-body"
        data-row-count={rows.length}
        data-first-row={rows[0]?.original.id || ""}
      />
    )
  }

  return { __esModule: true, default: MockBody }
})

describe("Table large-data mode", () => {
  it("gives TanStack Table only the active logical window", async () => {
    const getRow = jest.fn(index => ({ id: `node-${index}`, name: `Node ${index}` }))
    const source = {
      getRowCount: () => 50_000,
      getRow,
      getRowId: index => `node-${index}`,
    }

    const { getByTestId } = renderWithProviders(
      <Table
        data={[]}
        dataColumns={[{ id: "name", accessorKey: "name", header: "Name", cell: () => null }]}
        largeDataOptions={{ source }}
      />
    )

    await waitFor(() => {
      expect(getByTestId("large-data-body")).toHaveAttribute("data-row-count", "130")
      expect(getByTestId("large-data-body")).toHaveAttribute("data-first-row", "node-9950")
    })

    expect(getRow).toHaveBeenCalledTimes(180)
  })

  it("owns filtering and whole-result selection outside the visible window", async () => {
    const data = [
      { id: "outside", name: "Outside" },
      { id: "enabled", name: "Inside" },
      { id: "disabled", name: "Inside disabled", disabled: true },
    ]
    const tableRef = { current: null }
    const onRowSelected = jest.fn()

    renderWithProviders(
      <Table
        data={data}
        dataColumns={[
          {
            id: "name",
            accessorKey: "name",
            header: "Name",
            cell: () => null,
            filterFn: (row, id, value) => row.getValue(id).toLowerCase().includes(value),
          },
        ]}
        enableColumnVisibility
        enableSelection
        getRowId={row => row.id}
        globalFilter="inside"
        largeDataOptions={{
          enabled: true,
          filterRow: (row, value) => row.name.toLowerCase().includes(value),
        }}
        onRowSelected={onRowSelected}
        rowSelection={{ outside: true }}
        tableRef={tableRef}
      />
    )

    await waitFor(() => expect(tableRef.current?.largeDataSource.getRowCount()).toBe(2))

    act(() => tableRef.current.getColumn("name").setFilterValue("disabled"))
    await waitFor(() => expect(tableRef.current.largeDataSource.getRowCount()).toBe(1))
    act(() => tableRef.current.getColumn("name").setFilterValue(undefined))
    await waitFor(() => expect(tableRef.current.largeDataSource.getRowCount()).toBe(2))

    act(() => tableRef.current.toggleAllRowsSelected(true))

    await waitFor(() => expect(onRowSelected).toHaveBeenLastCalledWith([data[0], data[1]]))
    expect(tableRef.current.getIsAllRowsSelected()).toBe(true)

    act(() => tableRef.current.toggleAllRowsSelected(false))

    await waitFor(() => expect(onRowSelected).toHaveBeenLastCalledWith([data[0]]))
  })
})
