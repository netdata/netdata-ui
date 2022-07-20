import React from "react"
import NetdataTable from "./netdataTable"
import { renderWithProviders, screen } from "testUtilities"
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
    cell: () => "Text",
  },
]

const mockData = () => [
  { nodes: "node8", alerts: 15, user: "mitsos" },
  { nodes: "node9", alerts: 11, user: "koukouroukou" },
  { nodes: "node10", alerts: 22, user: "reena" },
]

const testPrefix = "-mock"
const testName = "netdata-table-"

const makeTestId = elementName => `${testName}${elementName}${testPrefix}`

const rowTestid = makeTestId("row")
const headTestid = makeTestId("head")
const cellTestid = makeTestId("cell")
const headRowTestid = makeTestId("headRow")
const headCellTestid = makeTestId("head-cell")
const nodesColumnFilter = makeTestId("filter-nodes")
const deleteActionTestid = makeTestId("action-delete")
const infoActionTestid = makeTestId("action-info")
const headerCheckBoxTestid = makeTestId("header-checkbox")
const bulkDeleteActionTestid = makeTestId("action-delete-bulk")

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
    expect(screen.queryAllByTestId(rowTestid)).toHaveLength(3)
    expect(screen.getByTestId(headTestid)).toBeInTheDocument()
    expect(screen.getByTestId(headRowTestid)).toBeInTheDocument()
    expect(screen.queryAllByTestId(headCellTestid)).toHaveLength(5)
    expect(screen.queryAllByTestId(cellTestid)).toHaveLength(15)
  })

  it("should filter the columns when changing the column search filter", async () => {
    renderNetdataTable()
    const filterParams = "node8"
    const nodesFilter = screen.getByTestId(nodesColumnFilter)

    await userEvent.type(nodesFilter, filterParams)

    expect(nodesFilter).toBeInTheDocument()
    expect(screen.queryAllByTestId(rowTestid)).toHaveLength(1)
  })

  it("should trigger confirmation dialog when clicking delete and hanlde confirm", async () => {
    renderNetdataTable()
    const deleteAction = screen.queryAllByTestId(deleteActionTestid)
    const expectedDeletedItem = mockData()[0]
    await userEvent.click(deleteAction[0])

    expect(screen.getByTestId("layer-container")).toBeInTheDocument()

    await userEvent.click(screen.getByTestId("confirmationDialog-confirmAction"))

    expect(handleDelete).toHaveBeenCalledWith(expectedDeletedItem, expect.anything())
  })

  it("should trigger confirmation dialog when clicking delete and hanlde decline", async () => {
    renderNetdataTable()
    const deleteAction = screen.queryAllByTestId(deleteActionTestid)

    await userEvent.click(deleteAction[0])

    expect(screen.getByTestId("layer-container")).toBeInTheDocument()

    await userEvent.click(screen.getByTestId("confirmationDialog-cancelAction"))

    expect(handleDelete).not.toHaveBeenCalled()
  })

  it("should trigger info action when clicking it", async () => {
    renderNetdataTable()
    const infoAction = screen.queryAllByTestId(infoActionTestid)

    await userEvent.click(infoAction[0])

    expect(handleInfo).toHaveBeenCalled()
  })

  it("should select multiple rows and handle delete bulk action", async () => {
    renderNetdataTable()
    const headerCheckbox = screen.getByTestId(headerCheckBoxTestid)
    const deleteBulkAction = screen.getByTestId(bulkDeleteActionTestid)
    const expectedDeletedItem = mockData()

    await userEvent.click(headerCheckbox)
    await userEvent.click(deleteBulkAction)

    expect(screen.getByTestId("layer-container")).toBeInTheDocument()

    await userEvent.click(screen.getByTestId("confirmationDialog-confirmAction"))

    expect(handleDelete).toHaveBeenCalledWith(expectedDeletedItem, expect.anything())
  })

  it("should change global search and filter nodes", async () => {
    renderNetdataTable()
    const filterParams = "node8"
    const globalSearchFilter = screen.getByTestId("table-global-search-filter")

    await userEvent.type(globalSearchFilter, filterParams)

    expect(globalSearchFilter).toBeInTheDocument()
    expect(screen.queryAllByTestId(rowTestid)).toHaveLength(1)
  })
})
