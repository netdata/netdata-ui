import createLargeDataSource from "./createLargeDataSource"
import {
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

const columns = [
  { id: "name", accessorKey: "name", sortingFn: "basic" },
  {
    id: "score",
    accessorKey: "score",
    sortingFn: (left, right) => left.original.score - right.original.score,
  },
]

const data = [
  {
    id: "group-b",
    name: "Group B",
    isGroup: true,
    children: [
      { id: "node-b", name: "Beta", score: 2 },
      { id: "node-a", name: "Alpha", score: 1 },
    ],
  },
  { id: "node-c", name: "Charlie", score: 3 },
]

describe("createLargeDataSource", () => {
  it("owns complete sorting and expansion while exposing a flat display index", () => {
    const source = createLargeDataSource({
      columns,
      data,
      expanded: { "group-b": true },
      getRowId: row => row.id,
      sorting: [{ id: "name", desc: false }],
    })

    expect(source.getRowCount()).toBe(4)
    expect(Array.from({ length: 4 }, (_, index) => source.getRowId(index))).toEqual([
      "node-c",
      "group-b",
      "node-a",
      "node-b",
    ])
    expect(source.getDisplayIndex("node-a")).toBe(2)
    expect(source.getDisplayIndex("group-b", { leaf: true })).toBe(3)
  })

  it("keeps collapsed descendants available to complete export", () => {
    const source = createLargeDataSource({
      columns,
      data,
      expanded: {},
      getRowId: row => row.id,
      sorting: [{ id: "score", desc: true }],
    })
    const exported = []

    source.forEachExportRow(row => exported.push(row.id))

    expect(source.getRowCount()).toBe(2)
    expect(source.getDisplayIndex("node-a")).toBe(0)
    expect(exported).toEqual(["group-b", "node-b", "node-a", "node-c"])
  })

  it("matches TanStack sorting, expansion, and flat export order", () => {
    const sorting = [
      { id: "name", desc: false },
      { id: "score", desc: true },
    ]
    const expanded = { "group-b": true }
    const table = createTable({
      columns,
      data,
      expanded,
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getRowId: row => row.id,
      getSortedRowModel: getSortedRowModel(),
      getSubRows: row => row.children,
      onStateChange: () => {},
      renderFallbackValue: null,
      state: { expanded, sorting },
    })
    const source = createLargeDataSource({
      columns,
      data,
      expanded,
      getRowId: row => row.id,
      sorting,
    })
    const exported = []
    source.forEachExportRow(row => exported.push(row.id))

    expect(
      Array.from({ length: source.getRowCount() }, (_, index) => source.getRowId(index))
    ).toEqual(table.getRowModel().rows.map(row => row.id))
    expect(exported).toEqual(table.getRowModel().flatRows.map(row => row.id))
  })

  it("matches TanStack default undefined-value ordering", () => {
    const sparseData = [
      { id: "missing" },
      { id: "beta", name: "Beta" },
      { id: "alpha", name: "Alpha" },
    ]
    const sorting = [{ id: "name", desc: false }]
    const sparseColumns = [{ id: "name", accessorKey: "name", sortingFn: "alphanumeric" }]
    const source = createLargeDataSource({
      columns: sparseColumns,
      data: sparseData,
      getRowId: row => row.id,
      sorting,
    })
    const table = createTable({
      columns: sparseColumns,
      data: sparseData,
      getCoreRowModel: getCoreRowModel(),
      getRowId: row => row.id,
      getSortedRowModel: getSortedRowModel(),
      onStateChange: () => {},
      renderFallbackValue: null,
      state: { sorting },
    })

    const tableIds = table.getRowModel().rows.map(row => row.id)
    const sourceIds = Array.from({ length: source.getRowCount() }, (_, index) =>
      source.getRowId(index)
    )

    expect(tableIds).toEqual(["alpha", "beta", "missing"])
    expect(sourceIds).toEqual(tableIds)
  })

  it("keeps complete row identity while filtering display and export rows", () => {
    const source = createLargeDataSource({
      columns,
      data: [
        { id: "hidden", name: "Hidden", score: 1 },
        { id: "visible", name: "Visible", score: 2 },
      ],
      filterRow: row => row.id === "visible",
      getRowId: row => row.id,
    })
    const allIds = []
    const exportIds = []

    source.forEachRow((_, id) => allIds.push(id))
    source.forEachExportRow((_, id) => exportIds.push(id))

    expect(allIds).toEqual(["hidden", "visible"])
    expect(exportIds).toEqual(["visible"])
    expect(source.getFlatRowCount()).toBe(1)
    expect(source.getRowCount()).toBe(1)
  })

  it("applies existing column filter predicates before sorting and publication", () => {
    const source = createLargeDataSource({
      columns: [
        {
          id: "state",
          accessorKey: "state",
          filterFn: (row, id, values) => values.includes(row.getValue(id)),
        },
      ],
      columnFilters: [{ id: "state", value: ["live"] }],
      data: [
        { id: "stale", state: "stale" },
        { id: "live", state: "live" },
      ],
      getRowId: row => row.id,
    })

    expect(source.getRowCount()).toBe(1)
    expect(source.getRowId(0)).toBe("live")
  })

  it("matches TanStack automatic column filtering", () => {
    const source = createLargeDataSource({
      columns: [{ id: "name", accessorKey: "name" }],
      columnFilters: [{ id: "name", value: "alp" }],
      data: [
        { id: "alpha", name: "Alpha" },
        { id: "beta", name: "Beta" },
      ],
      getRowId: row => row.id,
    })

    expect(source.getRowCount()).toBe(1)
    expect(source.getRowId(0)).toBe("alpha")
  })

  it("uses array membership filtering for array-valued columns", () => {
    const source = createLargeDataSource({
      columns: [{ id: "roles", accessorKey: "roles" }],
      columnFilters: [{ id: "roles", value: "admin" }],
      data: [
        { id: "admin", roles: ["admin", "viewer"] },
        { id: "viewer", roles: ["viewer"] },
      ],
      getRowId: row => row.id,
    })

    expect(source.getRowCount()).toBe(1)
    expect(source.getRowId(0)).toBe("admin")
  })
})
