import "jest-styled-components"
import { renderWithProviders, screen, waitFor } from "testUtilities"
import { DefaultTheme, getRgbColor } from "@/theme"
import rawColors from "@/theme/rawColors"
import Table from "../table"

const data = [
  {
    id: "web",
    name: "web",
    cpu: 42,
    children: [{ id: "web-1", name: "web-1", cpu: 12 }],
  },
  { id: "db", name: "db", cpu: 7 },
]

const dataColumns = [
  { id: "name", header: "Name", cell: ({ getValue }) => getValue() },
  { id: "cpu", header: "CPU", cell: ({ getValue }) => getValue() },
]

const selectedTint = getRgbColor("primary", 0.1)({ theme: DefaultTheme })
const depthTint = "rgba(45, 62, 51, 0.03)"
const selectedRule = { modifier: '[data-selected="true"]>*>.row-content' }
const railRule = { modifier: '[data-selected="true"]>*>.row-content:first-child' }
const depthRule = { modifier: "[data-depth]>*>.row-content" }

const renderRows = (props = {}) =>
  renderWithProviders(
    <Table
      data={data}
      dataColumns={dataColumns}
      getRowId={row => row.id}
      enableSelection
      expanded={{ web: true }}
      {...props}
    />
  )

const rowByText = async text => {
  const rows = await screen.findAllByTestId("netdata-table-row")
  const row = rows.find(el => el.getAttribute("data-id") === text)
  if (!row) throw new Error(`row ${text} not rendered`)
  return row
}

describe.each([
  ["flex cells", {}],
  ["direct cells", { virtualizeOptions: { directCellContent: true } }],
])("Table row states with %s", (_, extraProps) => {
  it("centers cell contents without fixing their height", async () => {
    renderRows(extraProps)

    const cell = (await rowByText("db")).querySelector('[data-testid="netdata-table-cell-name"]')
    if (extraProps.virtualizeOptions?.directCellContent) {
      expect(cell).toHaveStyle({ alignItems: "center" })
      expect(cell.style.height).toBe("")
    } else {
      expect(cell).toHaveStyleRule("align-items", "center")
      expect(cell).not.toHaveStyleRule("height")
    }
  })

  it("preserves an explicit vertical cell alignment", async () => {
    renderRows({
      ...extraProps,
      dataColumns: [{ ...dataColumns[0], align: "start" }],
    })

    const cell = (await rowByText("db")).querySelector('[data-testid="netdata-table-cell-name"]')
    if (extraProps.virtualizeOptions?.directCellContent) {
      expect(cell).toHaveStyle({ alignItems: "flex-start" })
    } else {
      expect(cell).toHaveStyleRule("align-items", "flex-start")
    }
  })

  it("marks only selected rows", async () => {
    renderRows({ rowSelection: { db: true }, ...extraProps })

    await waitFor(async () =>
      expect((await rowByText("db")).getAttribute("data-selected")).toBe("true")
    )
    expect((await rowByText("web")).getAttribute("data-selected")).toBeNull()
  })

  it("tints a selected row green and draws a 2px rail on its first section", async () => {
    renderRows(extraProps)

    const row = await rowByText("db")
    const tint = `linear-gradient(${selectedTint},${selectedTint})`
    expect(row).toHaveStyleRule("background-image", tint, selectedRule)
    expect(row).toHaveStyleRule(
      "box-shadow",
      `inset 2px 0 0 ${DefaultTheme.colors.primary}`,
      railRule
    )
  })

  it("marks nested rows with their depth and gives them a faint tint", async () => {
    renderRows(extraProps)

    expect((await rowByText("web-1")).getAttribute("data-depth")).toBe("1")
    expect((await rowByText("web")).getAttribute("data-depth")).toBeNull()
    expect(await rowByText("web")).toHaveStyleRule(
      "background-image",
      `linear-gradient(${depthTint},${depthTint})`,
      depthRule
    )
  })

  it("uses tabular numerals for every cell", async () => {
    renderRows(extraProps)

    expect(await rowByText("db")).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  })
})

describe("Table row hover", () => {
  it("uses the table hover token, which stays distinct from the row divider", async () => {
    renderRows()

    const row = await rowByText("db")
    expect(row).toHaveStyleRule("background-color", rawColors.neutral.grey190, {
      modifier: ":hover",
    })
    expect(row).toHaveStyleRule("border-bottom", `1px solid ${DefaultTheme.colors.tableBorder}`)
  })
})
