import React from "react"
import { act, fireEvent, renderWithProviders, screen } from "testUtilities"
import Table from "./table"

const data = [{ name: "Server 1", status: "Online" }]
const name = { id: "name", header: "Name", size: 120, minSize: 80, maxSize: 250 }
const status = { id: "status", header: "Status", size: 80, minSize: 50, maxSize: 150 }
const columns = [name, status]

const setup = (props = {}) => {
  const onColumnSizingChange = jest.fn()
  renderWithProviders(
    <Table
      data={data}
      dataColumns={columns}
      enableResizing
      onColumnSizingChange={onColumnSizingChange}
      {...props}
    />
  )
  return onColumnSizingChange
}

const getHandle = id => screen.findByTestId(`netdata-table-header-resize-handler-${id}`)

const drag = (handle, start, end) => {
  fireEvent.mouseDown(handle, { clientX: start })
  fireEvent.mouseMove(document, { clientX: end })
  fireEvent.mouseUp(document, { clientX: end })
}

it("does not save a width when clicking a flexible header handle without dragging", async () => {
  const onSizingChange = setup({ dataColumns: [{ ...name, fullWidth: true }, status] })
  const handle = await getHandle("name")
  Object.defineProperty(handle.parentElement, "getBoundingClientRect", {
    value: () => ({ width: 210 }),
  })

  fireEvent.mouseDown(handle, { clientX: 100 })
  fireEvent.mouseUp(document, { clientX: 100 })

  expect(onSizingChange).not.toHaveBeenCalled()
})

it("uses the displayed width and saves the bounded width while retaining other saved columns", async () => {
  const onSizingChange = setup({
    dataColumns: [{ ...name, fullWidth: true }, status],
    columnSizing: { status: 110 },
  })
  const handle = await getHandle("name")
  Object.defineProperty(handle.parentElement, "getBoundingClientRect", {
    value: () => ({ width: 280 }),
  })

  fireEvent.mouseDown(handle, { clientX: 200 })
  fireEvent.mouseMove(document, { clientX: 150 })
  expect(onSizingChange).not.toHaveBeenCalled()
  fireEvent.mouseUp(document, { clientX: 150 })

  expect(onSizingChange).toHaveBeenCalledTimes(1)
  expect(onSizingChange).toHaveBeenCalledWith({ name: 230, status: 110 })
})

it("commits the maximum width on mouse release even when the pointer moves farther", async () => {
  const onSizingChange = setup({ columnSizing: { name: 200, status: 110 } })
  const handle = await getHandle("name")

  drag(handle, 10, 120)

  expect(onSizingChange).toHaveBeenCalledTimes(1)
  expect(onSizingChange).toHaveBeenCalledWith({ name: 250, status: 110 })
})

it("saves a touch drag when the final finger lifts and retains saved widths on cancellation", async () => {
  const onSizingChange = setup({ columnSizing: { name: 200, status: 110 } })
  const handle = await getHandle("name")
  const fingerAt = clientX => ({ identifier: 1, clientX })

  fireEvent.touchStart(handle, { touches: [fingerAt(60)] })
  fireEvent.touchMove(document, { touches: [fingerAt(40)], changedTouches: [fingerAt(40)] })
  fireEvent.touchEnd(document, { touches: [], changedTouches: [fingerAt(20)] })

  expect(onSizingChange).toHaveBeenCalledTimes(1)
  expect(onSizingChange).toHaveBeenCalledWith({ name: 160, status: 110 })

  fireEvent.touchStart(handle, { touches: [fingerAt(60)] })
  fireEvent.touchMove(document, { touches: [fingerAt(100)], changedTouches: [fingerAt(100)] })
  fireEvent.touchCancel(document, { touches: [], changedTouches: [fingerAt(100)] })

  expect(onSizingChange).toHaveBeenCalledTimes(1)
})

it("resizes only eligible leaves of a group and omits the synthetic group width", async () => {
  const onSizingChange = setup({
    dataColumns: [
      { id: "server", header: "Server", columns: [name, { ...status, enableResizing: false }] },
    ],
    columnSizing: { status: 110 },
  })
  const handle = await getHandle("server")

  drag(handle, 10, 60)

  expect(onSizingChange).toHaveBeenCalledTimes(1)
  expect(onSizingChange).toHaveBeenCalledWith({ name: 170, status: 110 })
})

it("omits the group resize handle when all its leaves are ineligible", async () => {
  setup({
    enableResizing: false,
    dataColumns: [{ id: "server", header: "Server", columns }],
  })

  await screen.findByText("Server")
  expect(screen.queryByTestId("netdata-table-header-resize-handler-server")).toBeNull()
})

it("commits consecutive sparse sizing updates through the current save callback", () => {
  const previousSave = jest.fn()
  const save = jest.fn()
  const tableRef = { current: null }
  const columnSizing = { status: 110 }
  const renderTable = onColumnSizingChange => (
    <Table
      data={data}
      dataColumns={columns}
      columnSizing={columnSizing}
      onColumnSizingChange={onColumnSizingChange}
      tableRef={tableRef}
      enableResizing
    />
  )
  const { rerender } = renderWithProviders(renderTable(previousSave))
  rerender(renderTable(save))

  act(() => {
    tableRef.current.setColumnSizing(widths => ({ ...widths, name: 190 }))
    tableRef.current.setColumnSizing(widths => ({ ...widths, status: 130 }))
  })

  expect(previousSave).not.toHaveBeenCalled()
  expect(save.mock.calls).toEqual([[{ name: 190, status: 110 }], [{ name: 190, status: 130 }]])
})

it("accepts TanStack's reset map and saves only the first reset", () => {
  const tableRef = { current: null }
  const onSizingChange = setup({ columnSizing: { name: 200 }, tableRef })

  act(() => {
    tableRef.current.resetColumnSizing(true)
    tableRef.current.resetColumnSizing(true)
  })

  expect(onSizingChange).toHaveBeenCalledTimes(1)
  expect(onSizingChange).toHaveBeenCalledWith({})
})
