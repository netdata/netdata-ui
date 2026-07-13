import createLargeDataSource from "./createLargeDataSource"
import {
  getIsAllRowsSelected,
  getIsSomeRowsSelected,
  getNextRowSelection,
  getSelectedOriginalRows,
} from "./largeDataSelection"

const rows = [
  { id: "outside", name: "Outside" },
  { id: "enabled", name: "Enabled" },
  { id: "disabled", name: "Disabled", disabled: true },
]

const source = createLargeDataSource({
  columns: [{ id: "name", accessorKey: "name" }],
  data: rows,
  filterRow: row => row.id !== "outside",
  getRowId: row => row.id,
})

describe("large-data row selection", () => {
  it("resolves offscreen selections in core-row order and excludes disabled rows", () => {
    expect(
      getSelectedOriginalRows(source, { disabled: true, outside: true, enabled: true })
    ).toEqual([rows[0], rows[1]])
  })

  it("evaluates all and some against the complete filtered result", () => {
    expect(getIsAllRowsSelected(source, { outside: true })).toBe(false)
    expect(getIsSomeRowsSelected(source, { outside: true })).toBe(true)
    expect(getIsAllRowsSelected(source, { outside: true, enabled: true, disabled: true })).toBe(
      true
    )
    expect(getIsAllRowsSelected(source, { outside: true, enabled: true })).toBe(true)
    expect(getIsSomeRowsSelected(source, { enabled: true })).toBe(false)
    expect(getIsSomeRowsSelected(source, { outside: true, enabled: true })).toBe(false)
    expect(getIsSomeRowsSelected(source, { outside: true, enabled: true, disabled: true })).toBe(
      false
    )
    expect(getIsSomeRowsSelected(source, { disabled: true })).toBe(false)
  })

  it("toggles only the selectable filtered result and preserves selections outside it", () => {
    expect(getNextRowSelection(source, { outside: true }, true)).toEqual({
      outside: true,
      enabled: true,
    })
    expect(
      getNextRowSelection(source, { outside: true, enabled: true, disabled: true }, false)
    ).toEqual({ outside: true })
  })
})
