import React from "react"
import { renderWithProviders, screen, waitFor } from "testUtilities"
import TableProvider from "../provider"
import Body from "."
import { useVirtualizer } from "@tanstack/react-virtual"

jest.mock("@tanstack/react-virtual", () => ({
  defaultRangeExtractor: jest.fn(() => []),
  useVirtualizer: jest.fn(() => ({
    getTotalSize: () => 0,
    getVirtualItems: () => [],
    measureElement: jest.fn(),
    measurementsCache: [],
  })),
}))

jest.mock("./row", () => ({ row }) => (
  <div data-testid="row-content" data-row-value={row.original?.value} />
))
jest.mock("./header", () => () => <div data-testid="header-content" />)

describe("Table Body large-data mode", () => {
  it("keeps virtual measurement callbacks stable across equivalent renders", () => {
    const largeDataSource = {
      getRowCount: () => 50_000,
      getRowId: index => `node-${index}`,
    }
    const props = {
      largeDataSource,
      meta: {},
      onWindowChange: jest.fn(),
      table: { getRowModel: () => ({ rows: [] }) },
    }
    const renderBody = dataGa => (
      <TableProvider>
        <Body {...props} dataGa={dataGa} />
      </TableProvider>
    )
    const { rerender } = renderWithProviders(renderBody("first"))

    const firstOptions = useVirtualizer.mock.calls.at(-1)[0]
    rerender(renderBody("second"))
    const secondOptions = useVirtualizer.mock.calls.at(-1)[0]

    expect(secondOptions.getItemKey).toBe(firstOptions.getItemKey)
    expect(secondOptions.estimateSize).toBe(firstOptions.estimateSize)
  })

  it("shortens the scroll reset delay only for deferred row mounting", () => {
    const props = {
      largeDataSource: { getRowCount: () => 50_000, getRowId: index => `node-${index}` },
      meta: {},
      onWindowChange: jest.fn(),
      table: { getRowModel: () => ({ rows: [] }) },
    }
    const renderBody = deferRowMount => (
      <TableProvider>
        <Body {...props} deferRowMount={deferRowMount} />
      </TableProvider>
    )
    const { rerender } = renderWithProviders(renderBody(false))

    expect(useVirtualizer.mock.calls.at(-1)[0].isScrollingResetDelay).toBeUndefined()

    rerender(renderBody(true))

    expect(useVirtualizer.mock.calls.at(-1)[0].isScrollingResetDelay).toBe(50)
  })

  it("publishes an unchanged virtual window only once", () => {
    useVirtualizer.mockImplementation(() => ({
      getTotalSize: () => 1_750_000,
      getVirtualItems: () => [
        { index: 1, key: "node-0", start: 35 },
        { index: 2, key: "node-1", start: 70 },
      ],
      measureElement: jest.fn(),
      measurementsCache: [],
    }))

    const onWindowChange = jest.fn()
    const largeDataSource = {
      getRowCount: () => 50_000,
      getRowId: index => `node-${index}`,
    }
    const props = {
      largeDataSource,
      meta: {},
      onWindowChange,
      table: { getRowModel: () => ({ rows: [] }) },
    }
    const { rerender } = renderWithProviders(
      <TableProvider>
        <Body {...props} dataGa="first" />
      </TableProvider>
    )

    rerender(
      <TableProvider>
        <Body {...props} dataGa="second" />
      </TableProvider>
    )

    expect(onWindowChange).toHaveBeenCalledTimes(1)
    expect(onWindowChange).toHaveBeenCalledWith({ startIndex: 0, endIndex: 2 })
  })

  it("publishes the final large-data window after deferred scrolling stops", () => {
    let isScrolling = true
    useVirtualizer.mockImplementation(() => ({
      getTotalSize: () => 1_750_000,
      getVirtualItems: () => [
        { index: 10, key: "node-9", start: 350 },
        { index: 11, key: "node-10", start: 385 },
      ],
      isScrolling,
      measureElement: jest.fn(),
      measurementsCache: [],
    }))

    const onWindowChange = jest.fn()
    const props = {
      deferRowMount: true,
      largeDataSource: {
        getRowCount: () => 50_000,
        getRowId: index => `node-${index}`,
      },
      meta: {},
      onWindowChange,
      table: { getRowModel: () => ({ rows: [] }) },
    }
    const renderBody = dataGa => (
      <TableProvider>
        <Body {...props} dataGa={dataGa} />
      </TableProvider>
    )
    const { rerender } = renderWithProviders(renderBody("scrolling"))

    expect(onWindowChange).not.toHaveBeenCalled()

    isScrolling = false
    rerender(renderBody("idle"))

    expect(onWindowChange).toHaveBeenCalledTimes(1)
    expect(onWindowChange).toHaveBeenCalledWith({ startIndex: 9, endIndex: 11 })
  })

  it("measures large-data rows with wrapped content", () => {
    const measureElement = jest.fn()
    useVirtualizer.mockImplementation(() => ({
      getTotalSize: () => 70,
      getVirtualItems: () => [
        { index: 0, key: "header", start: 0 },
        { index: 1, key: "node-0", start: 35 },
      ],
      measureElement,
      measurementsCache: [],
    }))

    const largeDataSource = {
      getRowCount: () => 1,
      getRowId: () => "node-0",
    }

    renderWithProviders(
      <TableProvider>
        <Body
          largeDataSource={largeDataSource}
          meta={{}}
          onWindowChange={jest.fn()}
          table={{ getRowModel: () => ({ rows: [{ id: "node-0" }] }) }}
        />
      </TableProvider>
    )

    expect(measureElement.mock.calls.some(([element]) => element?.dataset.index === "1")).toBe(true)
  })

  it("sizes a deferred placeholder from the virtual row", () => {
    useVirtualizer.mockImplementation(() => ({
      getTotalSize: () => 80.4,
      getVirtualItems: () => [
        { index: 0, key: "header", size: 46, start: 0 },
        { index: 1, key: "node-0", size: 34.4, start: 46 },
      ],
      isScrolling: true,
      measureElement: jest.fn(),
      measurementsCache: [],
    }))

    const { container } = renderWithProviders(
      <TableProvider>
        <Body
          deferRowMount
          meta={{}}
          table={{
            getRowModel: () => ({
              rows: [{ id: "node-0", original: { id: "node-0" } }],
            }),
          }}
        />
      </TableProvider>
    )

    expect(container.querySelector('[data-index="1"] > [aria-hidden="true"]')).toHaveStyle({
      height: "34.4px",
      overflow: "hidden",
      width: "100%",
    })
  })

  it("wraps only data rows with the optional RowWrapper", () => {
    useVirtualizer.mockImplementation(() => ({
      getTotalSize: () => 70,
      getVirtualItems: () => [
        { index: 0, key: "header", start: 0 },
        { index: 1, key: "node-0", start: 35 },
      ],
      isScrolling: true,
      measureElement: jest.fn(),
      measurementsCache: [],
    }))

    const RowWrapper = ({ children, row, virtualIndex, logicalIndex }) => (
      <div
        data-testid="row-wrapper"
        data-row-id={row.id}
        data-virtual-index={virtualIndex}
        data-logical-index={logicalIndex}
      >
        {children}
      </div>
    )
    const onIsScrollingChange = jest.fn()

    renderWithProviders(
      <TableProvider>
        <Body
          RowWrapper={RowWrapper}
          onIsScrollingChange={onIsScrollingChange}
          largeDataSource={{ getRowCount: () => 1, getRowId: () => "node-0" }}
          meta={{}}
          onWindowChange={jest.fn()}
          table={{ getRowModel: () => ({ rows: [{ id: "node-0" }] }) }}
        />
      </TableProvider>
    )

    expect(document.querySelectorAll('[data-testid="row-wrapper"]')).toHaveLength(1)
    expect(document.querySelector('[data-testid="row-wrapper"]')).toHaveAttribute(
      "data-row-id",
      "node-0"
    )
    expect(document.querySelector('[data-testid="row-wrapper"]')).toHaveAttribute(
      "data-virtual-index",
      "1"
    )
    expect(document.querySelector('[data-testid="row-wrapper"]')).toHaveAttribute(
      "data-logical-index",
      "0"
    )
    expect(onIsScrollingChange).toHaveBeenCalledWith(true)
  })

  it("updates a mounted deferred row when its canonical record changes", async () => {
    useVirtualizer.mockImplementation(() => ({
      getTotalSize: () => 70,
      getVirtualItems: () => [
        { index: 0, key: "header", start: 0 },
        { index: 1, key: "alert-1", start: 35 },
      ],
      isScrolling: false,
      measureElement: jest.fn(),
      measurementsCache: [],
    }))

    const renderBody = value => (
      <TableProvider>
        <Body
          deferRowMount
          meta={{}}
          table={{
            getRowModel: () => ({
              rows: [{ id: "alert-1", original: { id: "alert-1", value } }],
            }),
          }}
        />
      </TableProvider>
    )
    const { rerender } = renderWithProviders(renderBody("warning"))

    await waitFor(() =>
      expect(screen.getByTestId("row-content")).toHaveAttribute("data-row-value", "warning")
    )

    rerender(renderBody("critical"))

    expect(screen.getByTestId("row-content")).toHaveAttribute("data-row-value", "critical")
  })
})
