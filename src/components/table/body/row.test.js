import { areRowPropsEqual } from "./row"

describe("Table row memoization", () => {
  const original = { id: "node-1" }
  const makeRow = overrides => ({
    id: "node-1",
    original,
    depth: 0,
    parentId: undefined,
    ...overrides,
  })

  it("keeps an overlapping logical row when only the TanStack wrapper changes", () => {
    expect(
      areRowPropsEqual(
        { row: makeRow(), logicalIndex: 10, table: "table" },
        { row: makeRow(), logicalIndex: 10, table: "table" }
      )
    ).toBe(true)
  })

  it("rerenders for changed data, hierarchy, logical position, or other props", () => {
    const base = { row: makeRow(), logicalIndex: 10, table: "table" }

    expect(areRowPropsEqual(base, { ...base, row: makeRow({ original: { id: "node-1" } }) })).toBe(
      false
    )
    expect(areRowPropsEqual(base, { ...base, row: makeRow({ depth: 1 }) })).toBe(false)
    expect(areRowPropsEqual(base, { ...base, logicalIndex: 11 })).toBe(false)
    expect(areRowPropsEqual(base, { ...base, table: "next-table" })).toBe(false)
  })
})
