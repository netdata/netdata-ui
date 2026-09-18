import React from "react"
import { fireEvent } from "@testing-library/react"
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

describe("Table column visibility trigger", () => {
  it("renders a subtle labelled columns trigger that opens the columns menu", () => {
    const { getByRole, getByTestId, getByText, queryByText } = renderTable()

    const trigger = getByRole("button", { name: "Columns" })
    expect(trigger.querySelector('[title="columns"]')).not.toBeNull()
    expect(trigger.parentElement).not.toBe(getByTestId("bulk-actions"))
    expect(queryByText("Show columns")).not.toBeInTheDocument()

    fireEvent.click(trigger)

    expect(getByText("Show columns")).toBeInTheDocument()
  })

  it("renders an outlined columns button when opted in", () => {
    const { getByRole, getByTestId, getByText } = renderTable({
      columnVisibilityFlavour: "hollow",
    })

    const trigger = getByRole("button", { name: "Columns" })
    expect(trigger.querySelector('[title="columns"]')).not.toBeNull()
    expect(trigger.parentElement).toBe(getByTestId("bulk-actions"))
    expect(trigger).toHaveAttribute(
      "data-testid",
      "netdata-table-action-columnVisibility-bulk-bulk"
    )

    fireEvent.click(trigger)

    expect(getByText("Show columns")).toBeInTheDocument()
  })
})
