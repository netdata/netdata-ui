import React from "react"
import NetdataTable from "./netdataTable"
import { renderWithProviders, screen, act } from "testUtilities"
import userEvent from "@testing-library/user-event"

const onGlobalSearchChange = jest.fn()
const handleDelete = jest.fn()
const handleDownload = jest.fn()
const handleToggleAlarms = jest.fn()
const handleInfo = jest.fn()
const onClickRow = jest.fn()
const mockDisableRow = jest.fn()

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
const nodeCellTestid = makeTestId("cell-nodes")
const checkboxCellTestid = makeTestId("cell-checkbox")
const alertsCellTestid = makeTestId("cell-alerts")
const userCellTestid = makeTestId("cell-user")
const headeCellNodesSortTestId = makeTestId("head-cell-sortyBy-nodes")

const headRowTestid = makeTestId("headRow")
const headCellTestid = makeTestId("head-cell")
const nodesColumnFilter = makeTestId("filter-nodes")
const deleteActionTestid = makeTestId("action-delete")
const infoActionTestid = makeTestId("action-info")
const headerCheckBoxTestid = makeTestId("header-checkbox")
const bulkDeleteActionTestid = makeTestId("action-delete-bulk")

const renderNetdataTable = disableRow => {
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
      onClickRow={({ data }) => {
        onClickRow(data)
      }}
      disableClickRow={({ data }) => {
        mockDisableRow(data)
        return disableRow
      }}
    />
  )
}

describe("Netdata table", () => {
  afterEach(() => {
    jest.useRealTimers()
  })
  it("Should render netdata table", () => {
    renderNetdataTable()
    expect(screen.queryAllByTestId(rowTestid)).toHaveLength(3)
    expect(screen.getByTestId(headTestid)).toBeInTheDocument()
    expect(screen.getByTestId(headRowTestid)).toBeInTheDocument()
    expect(screen.queryAllByTestId(headCellTestid)).toHaveLength(5)

    expect(screen.queryAllByTestId(nodeCellTestid)).toHaveLength(3)
    expect(screen.queryAllByTestId(checkboxCellTestid)).toHaveLength(6)
    expect(screen.queryAllByTestId(alertsCellTestid)).toHaveLength(3)
    expect(screen.queryAllByTestId(userCellTestid)).toHaveLength(3)
  })

  describe("Column filter", () => {
    it("should filter the columns when changing the column search filter", async () => {
      renderNetdataTable()
      const filterParams = "node8"
      const nodesFilter = screen.getByTestId(nodesColumnFilter)

      await userEvent.type(nodesFilter, filterParams)

      expect(nodesFilter).toBeInTheDocument()
      expect(screen.queryAllByTestId(rowTestid)).toHaveLength(1)
    })
  })

  describe("Row Action", () => {
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
  })

  describe("Bulk Actions", () => {
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
  })

  describe("Global Search Filter", () => {
    it("should change global search and filter nodes", async () => {
      jest.useFakeTimers({ advanceTimers: true })
      renderNetdataTable()
      const filterParams = "node8"
      const globalSearchFilter = screen.getByTestId("table-global-search-filter")

      await act(async () => {
        await userEvent.type(globalSearchFilter, filterParams)
        jest.runOnlyPendingTimers()
      })

      expect(onGlobalSearchChange).toHaveBeenCalledWith(filterParams)
      expect(globalSearchFilter).toBeInTheDocument()
      expect(screen.queryAllByTestId(rowTestid)).toHaveLength(1)
    })
  })

  describe("OnClickRow", () => {
    it("should allow as to click a row", async () => {
      renderNetdataTable()
      const expectedValue = mockData()[0]
      const row = screen.queryAllByTestId(rowTestid)[0]

      await userEvent.click(row)

      expect(onClickRow).toHaveBeenCalledWith(expectedValue)
    })

    it("should not  allow to click a row when is disabled", async () => {
      renderNetdataTable(true)
      const expectedValue = mockData()[0]

      const row = screen.queryAllByTestId(rowTestid)[0]

      await userEvent.click(row)

      expect(onClickRow).not.toHaveBeenCalled()
      expect(mockDisableRow).toHaveBeenCalledWith(expectedValue)
    })
  })

  describe("Sorting", () => {
    it("should allow as to sort the table", async () => {
      renderNetdataTable(true)
      const expectedValue = mockData()[0]

      const headCell = screen.getByTestId(headeCellNodesSortTestId)
      const beforeClickNodeCell = screen.queryAllByTestId(nodeCellTestid)[0]

      await userEvent.click(headCell)

      const afterClickNodeCell = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(beforeClickNodeCell).toHaveTextContent("node8")
      expect(afterClickNodeCell).toHaveTextContent("node10")
    })
  })
})
