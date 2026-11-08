import React from "react"
import "jest-styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { DarkTheme, DefaultTheme } from "@/theme"
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

  it("sits on the flat main surface instead of a gradient", () => {
    renderWithProviders(<Header {...props} />)

    const toolbar = screen.getByTestId("netdata-table-header-container")
    expect(toolbar).toHaveStyleRule("background-color", DefaultTheme.colors.mainBackground)
    expect(toolbar).not.toHaveStyleRule("background", expect.stringContaining("gradient"))
  })

  it("uses the dark main surface in the dark theme", () => {
    renderWithProviders(<Header {...props} />, { theme: DarkTheme })

    expect(screen.getByTestId("netdata-table-header-container")).toHaveStyleRule(
      "background-color",
      DarkTheme.colors.mainBackground
    )
  })

  it("spaces toolbar controls 8px apart", () => {
    renderWithProviders(<Header {...props} />)

    expect(screen.getByTestId("netdata-table-header-container")).toHaveStyleRule("gap", "8px")
  })

  it("keeps a 48px toolbar band while allowing controls to wrap", () => {
    renderWithProviders(<Header {...props} />)

    const toolbar = screen.getByTestId("netdata-table-header-container")
    expect(toolbar).toHaveStyleRule("min-height", "48px")
    expect(toolbar).toHaveStyleRule("flex-wrap", "wrap")
    expect(toolbar).not.toHaveStyleRule("height", "48px")
  })

  it("lets bulkActionsStyles override the toolbar spacing", () => {
    renderWithProviders(
      <Header {...props} tableMeta={{ bulkActionsStyles: { padding: [1, 2] } }} />
    )

    expect(screen.getByTestId("netdata-table-header-container")).toHaveStyleRule(
      "padding",
      "4px 8px"
    )
  })
})
