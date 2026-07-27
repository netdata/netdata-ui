import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import HeaderGroupBy from "./groupBy"

const longGroup = "label:kubernetes.io/metadata.name"
const groupByColumns = {
  [longGroup]: { name: longGroup },
}
const dataColumns = [{ id: longGroup, name: longGroup }]

const renderGroupBy = tableMeta =>
  renderWithProviders(
    <HeaderGroupBy
      dataColumns={dataColumns}
      groupByColumns={groupByColumns}
      grouping={longGroup}
      onGroupBy={() => {}}
      tableMeta={tableMeta}
    />
  )

describe("HeaderGroupBy", () => {
  it("keeps the existing 120 px minimum by default", () => {
    renderGroupBy({})

    expect(screen.getByTestId("tableGroupByFilterControl")).toHaveStyle({ minWidth: "120px" })
  })

  it("accepts a reusable Select style override for long values", () => {
    renderGroupBy({ groupBySelectStyles: { minWidth: 240 } })

    expect(screen.getByText(longGroup)).toBeInTheDocument()
    expect(screen.getByTestId("tableGroupByFilterControl")).toHaveStyle({ minWidth: "240px" })
  })
})
