import React from "react"
import "jest-styled-components"
import { renderWithProviders, screen, user } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import Table from "./table"

const data = [{ id: "web", name: "Web" }]
const dataColumns = [{ id: "name", header: "Name", cell: ({ getValue }) => getValue() }]

const legacyTheme = {
  ...DefaultTheme,
  constants: { ...DefaultTheme.constants, CONTROL_SIZES: undefined },
}

it.each([
  ["the current theme", DefaultTheme],
  ["a theme without control sizes", legacyTheme],
])(
  "reserves the full target, gap and padding width for three row actions with %s",
  async (_, theme) => {
    const tableRef = { current: null }
    const activated = []
    renderWithProviders(
      <Table
        data={data}
        dataColumns={dataColumns}
        tableRef={tableRef}
        columnPinning={{ right: ["actions"] }}
        enableColumnPinning
        virtualizeOptions={{ directCellContent: true }}
        rowActions={{
          edit: { handleAction: () => activated.push("edit") },
          info: { handleAction: () => activated.push("info") },
          goto: { handleAction: () => activated.push("goto") },
        }}
      />,
      { theme }
    )

    await screen.findByTestId("netdata-table-action-edit")
    expect(tableRef.current.getColumn("actions").getSize()).toBe(122)
    expect(screen.getByTestId("netdata-table-cell-actions")).toHaveStyle({ alignItems: "center" })
    expect(screen.getByTestId("action-cell")).toHaveStyleRule("align-items", "center")
    for (const action of ["edit", "info", "goto"]) {
      await user().click(screen.getByTestId(`netdata-table-action-${action}`))
    }
    expect(activated).toEqual(["edit", "info", "goto"])
  }
)
