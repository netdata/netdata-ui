import React from "react"
import { fireEvent, renderWithProviders, waitFor } from "testUtilities"
import Table from "./table"

const dataColumns = [
  {
    id: "dynamic",
    accessorKey: "dynamic",
    header: <span>XYZ…</span>,
    headerString: () => "XYZ complete dynamic column name",
  },
  {
    id: "literal",
    accessorKey: "literal",
    header: "Complete literal column name",
  },
]

const setDimensions = (
  target,
  { clientHeight = 16, clientWidth = 100, scrollHeight = 16, scrollWidth = 200 } = {}
) => {
  Object.defineProperties(target, {
    clientHeight: { configurable: true, value: clientHeight },
    clientWidth: { configurable: true, value: clientWidth },
    scrollHeight: { configurable: true, value: scrollHeight },
    scrollWidth: { configurable: true, value: scrollWidth },
  })
}

const elementIsOverflowing = element =>
  element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight

const overflowTooltip = {
  getContent: target => target.dataset.tableHeaderTooltip,
  isOverflowing: target =>
    elementIsOverflowing(target) || [...target.querySelectorAll("*")].some(elementIsOverflowing),
  renderContent: content => <span>{content}</span>,
  selector: "[data-table-header-tooltip]",
}

it("exposes truncated headers to keyboard focus without replacing drag or resize controls", async () => {
  const onColumnSizingChange = jest.fn()
  const onSortingChange = jest.fn()
  const { container, getByRole, getByTestId } = renderWithProviders(
    <Table
      data={[]}
      dataColumns={dataColumns}
      enableColumnReordering
      enableResizing
      enableSorting
      onColumnSizingChange={onColumnSizingChange}
      onSortingChange={onSortingChange}
    />
  )

  const header = await waitFor(() =>
    getByRole("button", { name: "XYZ complete dynamic column name, sortable, not sorted" })
  )
  const tooltipTarget = container.querySelector(
    '[data-table-header-tooltip="XYZ complete dynamic column name"]'
  )
  const dragHandle = header.parentElement.querySelector(".drag-handle")
  const resizeHandler = getByTestId("netdata-table-header-resize-handler-dynamic")

  expect(header).toHaveAttribute("tabindex", "0")
  expect(header).toHaveAttribute(
    "aria-label",
    "XYZ complete dynamic column name, sortable, not sorted"
  )
  expect(tooltipTarget).toBeInTheDocument()
  expect(tooltipTarget).not.toContainElement(dragHandle)
  expect(dragHandle).toHaveAttribute("role", "button")
  expect(dragHandle).toHaveAttribute("tabindex", "0")

  fireEvent.click(dragHandle)
  fireEvent.keyDown(dragHandle, { key: "Enter" })
  expect(onSortingChange).not.toHaveBeenCalled()

  fireEvent.doubleClick(resizeHandler)
  expect(onColumnSizingChange).toHaveBeenCalledWith({ dynamic: 250 })
})

it("opens a header tooltip on focus only when the label is truncated", async () => {
  const { container, queryByText } = renderWithProviders(
    <Table data={[]} dataColumns={dataColumns} overflowTooltip={overflowTooltip} />
  )
  await waitFor(() =>
    expect(
      container.querySelector('[data-table-header-tooltip="XYZ complete dynamic column name"]')
    ).toHaveAttribute("tabindex", "0")
  )
  const target = container.querySelector(
    '[data-table-header-tooltip="XYZ complete dynamic column name"]'
  )

  setDimensions(target)
  fireEvent.focus(target)
  expect(queryByText("XYZ complete dynamic column name")).toBeInTheDocument()

  fireEvent.blur(target)
  setDimensions(target, { scrollWidth: 100 })
  fireEvent.focus(target)
  expect(queryByText("XYZ complete dynamic column name")).not.toBeInTheDocument()

  fireEvent.blur(target)
  setDimensions(target)
  fireEvent.mouseOver(target)
  expect(queryByText("XYZ complete dynamic column name")).toBeInTheDocument()
})

it("does not add an inert tab stop when a React header has no tooltip content", async () => {
  const { findByText } = renderWithProviders(
    <Table
      data={[]}
      dataColumns={[
        {
          id: "visual",
          accessorKey: "visual",
          enableSorting: false,
          header: <span>Visual header</span>,
        },
      ]}
    />
  )

  expect(await findByText("Visual header")).not.toHaveAttribute("tabindex")
})

it("sorts focused headers with Enter and Space", async () => {
  const onSortingChange = jest.fn()
  const { getByRole } = renderWithProviders(
    <Table
      data={[{ dynamic: "value", literal: "value" }]}
      dataColumns={dataColumns}
      enableSorting
      onSortingChange={onSortingChange}
    />
  )
  const header = await waitFor(() =>
    getByRole("button", { name: "XYZ complete dynamic column name, sortable, not sorted" })
  )

  fireEvent.keyDown(header, { key: "Enter" })
  expect(onSortingChange).toHaveBeenLastCalledWith([{ desc: false, id: "dynamic" }])
  await waitFor(() =>
    expect(header).toHaveAttribute(
      "aria-label",
      "XYZ complete dynamic column name, sorted ascending"
    )
  )

  fireEvent.keyDown(header, { key: " " })
  expect(onSortingChange).toHaveBeenLastCalledWith([{ desc: true, id: "dynamic" }])
  await waitFor(() =>
    expect(header).toHaveAttribute(
      "aria-label",
      "XYZ complete dynamic column name, sorted descending"
    )
  )
})

it("preserves custom header keyboard behavior and accessible props", async () => {
  const onSortingChange = jest.fn()
  const onKeyDown = jest.fn(event => event.preventDefault())
  const { getByRole } = renderWithProviders(
    <Table
      data={[{ custom: "value" }]}
      dataColumns={[
        {
          id: "custom",
          accessorKey: "custom",
          header: "Custom header",
          labelProps: {
            "aria-label": "Custom accessible header",
            onKeyDown,
            role: "columnheader",
            tabIndex: -1,
          },
        },
      ]}
      enableSorting
      onSortingChange={onSortingChange}
    />
  )
  const header = await waitFor(() =>
    getByRole("columnheader", { name: "Custom accessible header" })
  )

  expect(header).toHaveAttribute("tabindex", "-1")

  fireEvent.keyDown(header, { key: "Enter" })

  expect(onKeyDown).toHaveBeenCalledTimes(1)
  expect(onSortingChange).not.toHaveBeenCalled()
})
