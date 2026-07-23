import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import Header from "."

const props = {
  dataColumns: [{ id: "group", name: "Group" }],
  groupByColumns: { group: { columns: ["group"], name: "Group" } },
  grouping: "group",
  onGroupBy: () => {},
  tableMeta: {},
}

describe("Table Header", () => {
  it("shows the Group By control by default", () => {
    renderWithProviders(<Header {...props} />)

    expect(screen.getByTestId("tableGroupBy")).toBeInTheDocument()
  })

  it("can hide the Group By control without removing grouping configuration", () => {
    renderWithProviders(<Header {...props} enableGroupByControl={false} title="Nodes" />)

    expect(screen.queryByTestId("tableGroupBy")).not.toBeInTheDocument()
  })
})
