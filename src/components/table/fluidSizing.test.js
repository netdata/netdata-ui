import { renderWithProviders, screen } from "testUtilities"
import Table from "./table"

const data = [{ left: "Server", name: "Node", status: "Live", right: "More" }]
const columns = [
  { id: "left", size: 120, minSize: 90, maxSize: 200 },
  { id: "name", size: 180, minSize: 80, maxSize: 300 },
  { id: "status", size: 150, minSize: 80, maxSize: 300 },
  { id: "right", size: 80, notFlex: true },
].map(column => ({ ...column, header: column.id, cell: ({ getValue }) => getValue() }))
const pinning = { left: ["left"], right: ["right"] }

const mockViewportWidth = width => {
  const getWidth = Object.getOwnPropertyDescriptor(Element.prototype, "clientWidth").get
  return jest.spyOn(Element.prototype, "clientWidth", "get").mockImplementation(function () {
    return this.dataset?.testid === "netdata-table" ? width : getWidth.call(this)
  })
}

it("fits untouched columns around pinned columns and a saved width without writing a preference", async () => {
  const width = mockViewportWidth(450)
  try {
    const tableRef = { current: null }
    const saveWidth = jest.fn()
    const { rerender } = renderWithProviders(
      <Table
        data={data}
        dataColumns={columns}
        tableRef={tableRef}
        enableResizing
        columnSizingMode="fluid"
        columnPinning={pinning}
        columnSizing={{ name: 130 }}
        onColumnSizingChange={saveWidth}
      />
    )
    expect(tableRef.current.getColumn("name").getSize()).toBe(130)
    expect(tableRef.current.getColumn("status").getSize()).toBe(120)
    expect(tableRef.current.getLeftTotalSize()).toBe(120)
    expect(tableRef.current.getRightTotalSize()).toBe(80)
    expect(saveWidth).not.toHaveBeenCalled()

    rerender(
      <Table
        data={data}
        dataColumns={columns}
        tableRef={tableRef}
        enableResizing
        columnSizingMode="fluid"
        columnPinning={pinning}
        columnSizing={{ name: 100 }}
        onColumnSizingChange={saveWidth}
      />
    )
    expect(tableRef.current.getColumn("name").getSize()).toBe(100)
    expect(tableRef.current.getColumn("status").getSize()).toBe(150)
    expect(saveWidth).not.toHaveBeenCalled()
  } finally {
    width.mockRestore()
  }
})

it("lets pinned sections scroll with the row when they crowd out the center", async () => {
  const width = mockViewportWidth(190)
  try {
    renderWithProviders(
      <Table
        data={data}
        dataColumns={columns}
        enableResizing
        columnSizingMode="fluid"
        columnPinning={pinning}
      />
    )
    expect(
      (await screen.findByTestId("netdata-table")).getAttribute("data-table-suspend-pins")
    ).toBe("")
  } finally {
    width.mockRestore()
  }
})
