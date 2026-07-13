import React from "react"
import { renderWithProviders, waitFor } from "testUtilities"
import Table from "./table"

const columns = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => getValue(),
  },
]

const getRowId = row => row.id
const largeDataOptions = { enabled: true }

describe("Table large-data body integration", () => {
  it("settles after publishing the initial virtual window", async () => {
    const data = Array.from({ length: 50_000 }, (_, index) => ({
      id: `node-${index}`,
      name: `Node ${index}`,
    }))

    const { getByTestId } = renderWithProviders(
      <div style={{ height: 500 }}>
        <Table
          bulkActions={{ download: { handleAction: jest.fn() } }}
          data={data}
          dataColumns={columns}
          enableColumnVisibility
          enableSelection
          getRowId={getRowId}
          largeDataOptions={largeDataOptions}
        />
      </div>
    )

    await waitFor(() => expect(getByTestId("netdata-table")).toBeInTheDocument())
  })
})
