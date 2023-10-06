import React from "react"
import Table from "./table"
import { renderWithProviders, screen, act } from "testUtilities"
import userEvent from "@testing-library/user-event"

const onGlobalSearchChange = jest.fn()
const handleDelete = jest.fn()
const handleDownload = jest.fn()
const handleToggleAlarms = jest.fn()
const handleInfo = jest.fn()
const onClickRow = jest.fn()
const mockDisableRow = jest.fn()

const mockBulkActions = {
  delete: { handleAction: handleDelete },
  download: { handleAction: handleDownload },
  toggleAlarm: { handleAction: handleToggleAlarms },
}

const mockRowActions = {
  delete: { handleAction: handleDelete },
  info: { handleAction: handleInfo },
}

const mockDataColumns = [
  { header: "Nodes", id: "nodes", enableColumnFilter: true, cell: ({ getValue }) => getValue() },
  {
    id: "alerts",
    header: "Text",
    enableColumnFilter: true,
    filterFn: (row, columnId, value) => {
      const { original } = row
      const rowValue = original[columnId]

      return rowValue.toString().includes(value.toString())
    },
    cell: ({ getValue }) => getValue(),
  },
  {
    header: "user",
    id: "user",
    enableColumnFilter: true,
    cell: () => "Text",
  },
]

const mockData = () => [
  { nodes: "nodeB", alerts: 11, user: "koukouroukou" },
  { nodes: "nodeC", alerts: 22, user: "reena" },
  { nodes: "nodeA", alerts: 15, user: "mitsos" },
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

const renderTable = ({
  disableRow,
  rowActions,
  bulkActions,
  paginationOptions,
  data = mockData(),
} = {}) => {
  renderWithProviders(
    <Table
      enablePagination
      paginationOptions={paginationOptions}
      onGlobalSearchChange={onGlobalSearchChange}
      enableSorting
      rowActions={rowActions || mockRowActions}
      bulkActions={bulkActions || mockBulkActions}
      enableSelection
      dataColumns={mockDataColumns}
      data={data}
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
    renderTable()
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
      const user = userEvent.setup()
      jest.useFakeTimers({ advanceTimers: true })
      renderTable()
      const filterParams = "nodeB"
      const nodesFilter = screen.getByTestId(nodesColumnFilter)

      await act(async () => {
        await user.type(nodesFilter, filterParams)
        jest.runOnlyPendingTimers()
      })

      expect(nodesFilter).toBeInTheDocument()
      expect(screen.queryAllByTestId(rowTestid)).toHaveLength(1)
    })
  })

  describe("Row Action", () => {
    it.skip("should trigger confirmation dialog when clicking delete and handle confirm", async () => {
      const user = userEvent.setup()
      renderTable()
      const deleteAction = screen.queryAllByTestId(deleteActionTestid)
      const expectedDeletedItem = mockData()[0]
      await user.click(deleteAction[0])

      expect(screen.getByTestId("layer-container")).toBeInTheDocument()

      await user.click(screen.getByTestId("confirmationDialog-confirmAction"))

      expect(handleDelete).toHaveBeenCalledWith(expectedDeletedItem, expect.anything())
    })

    it.skip("should trigger confirmation dialog when clicking delete and handle decline", async () => {
      const user = userEvent.setup()
      renderTable()
      const deleteAction = screen.queryAllByTestId(deleteActionTestid)

      await user.click(deleteAction[0])

      expect(screen.getByTestId("layer-container")).toBeInTheDocument()

      await user.click(screen.getByTestId("confirmationDialog-cancelAction"))

      expect(handleDelete).not.toHaveBeenCalled()
    })

    it.skip("should trigger info action when clicking it", async () => {
      const user = userEvent.setup()
      renderTable()
      const infoAction = screen.getAllByTestId(infoActionTestid)
      console.log(infoAction)
      await user.click(infoAction[0])

      expect(handleInfo).toHaveBeenCalled()
    })

    it("should disable row action when it meets the requirements", async () => {
      const rowActions = {
        delete: { handleAction: handleDelete, isDisabled: true },
      }
      renderTable({ rowActions })

      const deleteAction = screen.queryAllByTestId(deleteActionTestid)[0]

      expect(deleteAction).toBeDisabled()
    })
  })

  describe("Bulk Actions", () => {
    it("should select multiple rows and handle delete bulk action", async () => {
      const user = userEvent.setup()
      renderTable()
      const headerCheckbox = screen.getByTestId(headerCheckBoxTestid)
      const deleteBulkAction = screen.getByTestId(bulkDeleteActionTestid)
      const expectedDeletedItem = mockData()

      await user.click(headerCheckbox)
      await user.click(deleteBulkAction)

      expect(screen.getByTestId("layer-container")).toBeInTheDocument()

      await user.click(screen.getByTestId("confirmationDialog-confirmAction"))

      expect(handleDelete).toHaveBeenCalledWith(expectedDeletedItem, expect.anything())
    })
    it("should disable bulk action when no rows are selected", async () => {
      renderTable()
      const deleteBulkAction = screen.getByTestId(bulkDeleteActionTestid)

      expect(deleteBulkAction).toBeDisabled()
    })

    it("should disable bulk action when it meets the requirements", async () => {
      const user = userEvent.setup()
      const bulkActions = {
        delete: { handleAction: handleDelete, isDisabled: true },
      }
      renderTable({ bulkActions })

      const deleteBulkAction = screen.getByTestId(bulkDeleteActionTestid)
      const headerCheckbox = screen.getByTestId(headerCheckBoxTestid)

      await user.click(headerCheckbox)

      expect(deleteBulkAction).toBeDisabled()
    })
  })

  describe("Global Search Filter", () => {
    it("should change global search and filter nodes", async () => {
      jest.useFakeTimers({ advanceTimers: true })
      renderTable()
      const filterParams = "nodeB"
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
      const user = userEvent.setup()
      renderTable()
      const expectedValue = mockData()[0]
      const row = screen.queryAllByTestId(rowTestid)[0]

      await user.click(row)

      expect(onClickRow).toHaveBeenCalledWith(expectedValue)
    })

    it("should not  allow to click a row when is disabled", async () => {
      const user = userEvent.setup()
      renderTable({ disableRow: true })
      const expectedValue = mockData()[0]

      const row = screen.queryAllByTestId(rowTestid)[0]

      await user.click(row)

      expect(onClickRow).not.toHaveBeenCalled()
      expect(mockDisableRow).toHaveBeenCalledWith(expectedValue)
    })
  })

  describe("Sorting", () => {
    it("should allow as to sort the table", async () => {
      const user = userEvent.setup()
      renderTable({ disableRow: true })

      const headCell = screen.getByTestId(headeCellNodesSortTestId)
      const beforeClickNodeCell = screen.queryAllByTestId(nodeCellTestid)[0]

      await user.click(headCell)

      let afterClickNodeCell = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(beforeClickNodeCell).toHaveTextContent("nodeA")
      expect(afterClickNodeCell).toHaveTextContent("nodeA")

      await user.click(headCell)

      afterClickNodeCell = screen.queryAllByTestId(nodeCellTestid)[0]
      expect(afterClickNodeCell).toHaveTextContent("nodeC")
    })
  })

  describe("Pagination", () => {
    it("should go to next page", async () => {
      const user = userEvent.setup()
      const data = [...mockData(), { nodes: "nodeD", alerts: 122, user: "secondPage" }]
      const paginationOptions = { pageIndex: 0, pageSize: 3 }

      renderTable({ disableRow: true, data, paginationOptions })

      const goToNext = screen.getByTestId("pagination-go-to-next")
      const beforePaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(beforePaginationNode).toHaveTextContent("nodeB")

      await user.click(goToNext)

      const afterPaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(afterPaginationNode).toHaveTextContent("nodeD")
    })
    it("should go to previous page", async () => {
      const user = userEvent.setup()
      const data = [...mockData(), { nodes: "nodeD", alerts: 122, user: "secondPage" }]
      const paginationOptions = { pageIndex: 1, pageSize: 3 }

      renderTable({ disableRow: true, data, paginationOptions })

      const goToPrevious = screen.getByTestId("pagination-go-to-previous")
      const beforePaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(beforePaginationNode).toHaveTextContent("nodeD")

      await user.click(goToPrevious)

      const afterPaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(afterPaginationNode).toHaveTextContent("nodeB")
    })

    it("should go to last page", async () => {
      const user = userEvent.setup()
      const data = [...mockData(), { nodes: "nodeD", alerts: 122, user: "secondPage" }]
      const paginationOptions = { pageIndex: 0, pageSize: 1 }

      renderTable({ disableRow: true, data, paginationOptions })

      const goToLast = screen.getByTestId("pagination-go-to-last")
      const beforePaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(beforePaginationNode).toHaveTextContent("nodeB")

      await user.click(goToLast)

      const afterPaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(afterPaginationNode).toHaveTextContent("nodeD")
    })

    it("should go to first page", async () => {
      const user = userEvent.setup()
      const data = [...mockData(), { nodes: "nodeD", alerts: 122, user: "secondPage" }]
      const paginationOptions = { pageIndex: 3, pageSize: 1 }

      renderTable({ disableRow: true, data, paginationOptions })

      const goToFirst = screen.getByTestId("pagination-go-to-first")
      const beforePaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(beforePaginationNode).toHaveTextContent("nodeD")

      await user.click(goToFirst)

      const afterPaginationNode = screen.queryAllByTestId(nodeCellTestid)[0]

      expect(afterPaginationNode).toHaveTextContent("nodeB")
    })
  })
})
