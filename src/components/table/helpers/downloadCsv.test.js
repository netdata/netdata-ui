import downloadCsvAction from "./downloadCsv"

describe("downloadCsvAction", () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn(() => "blob:csv")
    HTMLAnchorElement.prototype.click = jest.fn()
  })

  it("exports every logical row without requesting the rendered row model", () => {
    const rows = [
      { id: "a", name: "Alpha" },
      { id: "b", name: "Beta" },
    ]
    const column = {
      id: "name",
      parent: null,
      columnDef: { accessorKey: "name", headerString: () => "Name" },
    }
    const table = {
      forEachExportRow: callback => rows.forEach(callback),
      getFlatHeaders: () => [{ id: "name", subHeaders: [], column }],
      getRowModel: jest.fn(),
    }

    downloadCsvAction("nodes")(null, table)

    expect(table.getRowModel).not.toHaveBeenCalled()
    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })
})
