import React from "react"
import { renderWithProviders } from "testUtilities"
import Table from "./table"

const data = [{ id: "node-1", name: "Node 1" }]
const dataColumns = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => getValue(),
  },
]

const renderTable = props =>
  renderWithProviders(
    <Table
      data={data}
      dataColumns={dataColumns}
      enableColumnVisibility
      getRowId={row => row.id}
      headerChildren={<button data-testid="trailing-control">View</button>}
      {...props}
    />
  )

const expectBefore = (first, second) => {
  expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
}

describe("Table header action order", () => {
  it("keeps custom children before built-in actions by default", () => {
    const { getByTestId } = renderTable()

    expectBefore(getByTestId("trailing-control"), getByTestId("bulk-actions"))
  })

  it("can place built-in actions before custom trailing controls", () => {
    const { getByTestId } = renderTable({ headerActionsBeforeChildren: true })

    expectBefore(getByTestId("bulk-actions"), getByTestId("trailing-control"))
  })
})
