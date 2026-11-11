import "jest-styled-components"
import { renderWithProviders, screen, waitFor } from "testUtilities"
import { DarkTheme, DefaultTheme } from "@/theme"
import rawColors from "@/theme/rawColors"
import Table from "../../table"

const data = [
  { id: "a", name: "alpha", cpu: 10 },
  { id: "b", name: "beta", cpu: 30 },
  { id: "c", name: "gamma", cpu: 20 },
]

const dataColumns = [
  { id: "name", header: "Name", cell: ({ getValue }) => getValue() },
  { id: "cpu", header: "CPU", cell: ({ getValue }) => getValue() },
]

const sortBy = [{ id: "cpu", desc: true }]

const renderSorted = options =>
  renderWithProviders(
    <Table data={data} dataColumns={dataColumns} enableSorting sortBy={sortBy} enableResizing />,
    options
  )

const label = name => screen.findByRole("button", { name })
const sortIcon = async name => (await label(name)).parentElement.querySelector("svg").parentElement

describe("Table header label", () => {
  it("renders labels at weight 600", async () => {
    renderSorted()

    expect(await label("Name, sortable, not sorted")).toHaveStyleRule("font-weight", "600")
  })

  it("keeps unsorted labels in the lite text colour", async () => {
    renderSorted()

    expect(await label("Name, sortable, not sorted")).toHaveStyleRule(
      "color",
      DefaultTheme.colors.textLite
    )
  })

  it("draws the actively sorted label in the main ink colour", async () => {
    renderSorted()

    expect(await label("CPU, sorted descending")).toHaveStyleRule(
      "color",
      DefaultTheme.colors.main
    )
  })

  it("uses the dark ink for the sorted label in the dark theme", async () => {
    renderSorted({ theme: DarkTheme })

    expect(await label("CPU, sorted descending")).toHaveStyleRule("color", DarkTheme.colors.main)
  })

  it("shows a green focus ring inset so the clipped cell does not hide it", async () => {
    renderSorted()

    const el = await label("CPU, sorted descending")
    expect(el).toHaveStyleRule("outline", `2px solid ${DefaultTheme.colors.primary}`, {
      modifier: ":focus-visible",
    })
    expect(el).toHaveStyleRule("outline-offset", "-2px", { modifier: ":focus-visible" })
    expect(el).toHaveStyleRule("outline", "none", { modifier: ":focus" })
  })
})

describe("Table header sort indicator", () => {
  it("is faintly visible at rest on sortable unsorted columns", async () => {
    renderSorted()

    expect(await sortIcon("Name, sortable, not sorted")).toHaveStyleRule("opacity", "0.35")
  })

  it("is fully visible on the sorted column", async () => {
    renderSorted()

    expect(await sortIcon("CPU, sorted descending")).toHaveStyleRule("opacity", "1")
  })

  it("fades in 140ms and stops animating under reduced motion", async () => {
    renderSorted()

    const icon = await sortIcon("Name, sortable, not sorted")
    expect(icon).toHaveStyleRule("transition", "opacity 140ms ease-out")
    expect(icon).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion: reduce)",
    })
  })
})

describe("Table sorted column tint", () => {
  it("tints the sorted header with the column highlight at a visible strength", async () => {
    renderSorted()

    const cell = (await screen.findByTestId("netdata-table-header-resize-handler-cpu"))
      .parentElement
    expect(cell).toHaveStyleRule("background-color", "rgba(238, 240, 238, 0.5)")
  })

  it("tints every sorted body cell the same regardless of the row's data index", async () => {
    renderSorted()

    const cells = await waitFor(() => {
      const found = screen.getAllByTestId("netdata-table-cell-cpu")
      expect(found).toHaveLength(3)
      return found
    })
    cells.forEach(cell =>
      expect(cell).toHaveStyleRule("background-color", "rgba(238, 240, 238, 0.5)")
    )
  })
})

describe("Table column resize handle", () => {
  const handle = () => screen.findByTestId("netdata-table-header-resize-handler-name")

  it("stays visible at rest instead of appearing only on header hover", async () => {
    renderSorted()

    expect(window.getComputedStyle(await handle()).display).not.toBe("none")
  })

  it("draws a short hairline separator in the border colour at rest", async () => {
    renderSorted()

    const el = await handle()
    expect(el).toHaveStyleRule("width", "1px", { modifier: "::after" })
    expect(el).toHaveStyleRule("top", "8px", { modifier: "::after" })
    expect(el).toHaveStyleRule("bottom", "8px", { modifier: "::after" })
    expect(el).toHaveStyleRule("background-color", DefaultTheme.colors.tableBorder, {
      modifier: "::after",
    })
  })

  it("grows into a full-height 2px resizer line on hover and while dragging", async () => {
    renderSorted()

    const el = await handle()
    ;[":hover::after", ":active::after"].forEach(modifier => {
      expect(el).toHaveStyleRule("width", "2px", { modifier })
      expect(el).toHaveStyleRule("top", "0", { modifier })
      expect(el).toHaveStyleRule("background-color", rawColors.green.green100, { modifier })
    })
  })

  it("does not animate the separator under reduced motion", async () => {
    renderSorted()

    expect(await handle()).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion: reduce)",
      modifier: "::after",
    })
  })

  it("keeps the 8px grab area and the column-resize cursor", async () => {
    renderSorted()

    const el = await handle()
    expect(el).toHaveStyleRule("width", "8px")
    expect(el).toHaveStyleRule("cursor", "col-resize")
  })
})
