import React from "react"
import NetdataTable from "./netdataTable"
import { renderWithProviders, screen, act } from "testUtilities"
import userEvent from "@testing-library/user-event"

const onGlobalSearchChange = jest.fn()
const handleDelete = jest.fn()
const handleDownload = jest.fn()
const handleToggleAlarms = jest.fn()
const handleInfo = jest.fn()

const bulkActions = {
  delete: { handleAction: handleDelete },
  download: { handleAction: handleDownload },
  toggleAlarm: { handleAction: handleToggleAlarms },
}

const rowActions = { delete: { handleAction: handleDelete }, info: { handleAction: handleInfo } }

const mockDataColumns = [
  { header: "Nodes", id: "nodes", enableFilter: true },
  {
    id: "alerts",
    header: "Text",
    enableFilter: true,
    filterFn: (row, columnId, value) => {
      const { original } = row
      const rowValue = original[columnId]

      return rowValue.toString().includes(value.toString())
    },
  },
  {
    header: "user",
    id: "user",
    enableFilter: true,
    cell: ({ getValue }) => "Text",
  },
]

const mockData = () => [
  { nodes: "node8", alerts: 15, user: "mitsos" },
  { nodes: "node9", alerts: 11, user: "koukouroukou" },
  { nodes: "node10", alerts: 22, user: "reena" },
]

const paginationOptions = { pageIndex: 0, pageSize: 5 }

const testPrefix = "-mock"
const testName = "netdata-table-"

const makeTestId = elementName => `${testName}${elementName}${testPrefix}`

const rowTestId = makeTestId("row")
const headTestid = makeTestId("head")
const cellTestid = makeTestId("cell")
const headeRowTestid = makeTestId("headRow")
const headCellTestid = makeTestId("head-cell")
const nodesColumnFilter = makeTestId("filter-nodes")

const renderNetdataTable = () => {
  renderWithProviders(
    <NetdataTable
      onGlobalSearchChange={onGlobalSearchChange}
      enableSorting
      rowActions={rowActions}
      bulkActions={bulkActions}
      enableSelection
      dataColumns={mockDataColumns}
      data={mockData()}
      testPrefix={testPrefix}
    />
  )
}

describe("Netdata table", () => {
  it("Should render netdata table", () => {
    renderNetdataTable()
    expect(screen.queryAllByTestId(rowTestId)).toHaveLength(3)
    expect(screen.getByTestId(headTestid)).toBeInTheDocument()
    expect(screen.getByTestId(headeRowTestid)).toBeInTheDocument()
    expect(screen.queryAllByTestId(headCellTestid)).toHaveLength(5)
    expect(screen.queryAllByTestId(cellTestid)).toHaveLength(15)
  })

  it("should filter the columns with", () => {
    renderNetdataTable()
    const filterParams = "node8"
    const nodesFilter = screen.getByTestId(nodesColumnFilter)

    userEvent.type(nodesFilter, filterParams)

    expect(nodesFilter).toBeInTheDocument()
    expect(screen.queryAllByTestId(rowTestId)).toHaveLength(1)
  })

  it("should trigger action when we are clicking it", () => {
    renderNetdataTable()
    const filterParams = "node8"
    const nodesFilter = screen.getByTestId(nodesColumnFilter)

    userEvent.type(nodesFilter, filterParams)

    expect(nodesFilter).toBeInTheDocument()
    expect(screen.queryAllByTestId(rowTestId)).toHaveLength(1)
  })
})
