import React from "react"
import { renderWithProviders } from "testUtilities"
import Table from "./table"

const serverColumn = { id: "server", accessorKey: "server", header: "Server" }
const alertsColumn = { id: "alerts", accessorKey: "alerts", header: "Alerts" }
const cpuColumn = { id: "cpu", accessorKey: "cpu", header: "CPU" }

it("renders drag handles only on leaf header cells when columns are grouped", async () => {
  const { container, findByText } = renderWithProviders(
    <Table
      data={[]}
      dataColumns={[
        { id: "Device", header: "", headerString: () => "", columns: [serverColumn, alertsColumn] },
        { id: "Metrics", header: "", headerString: () => "", columns: [cpuColumn] },
      ]}
      enableColumnReordering
    />
  )

  await findByText("Server")

  expect(container.querySelectorAll(".drag-handle")).toHaveLength(3)
})

it("renders no drag handle on placeholder header cells of ungrouped columns", async () => {
  const { container, findByText } = renderWithProviders(
    <Table
      data={[]}
      dataColumns={[
        serverColumn,
        { id: "Metrics", header: "", headerString: () => "", columns: [cpuColumn, alertsColumn] },
      ]}
      enableColumnReordering
    />
  )

  await findByText("CPU")

  expect(container.querySelectorAll(".drag-handle")).toHaveLength(3)
})
