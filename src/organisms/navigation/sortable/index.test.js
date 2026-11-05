import React from "react"
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import Tab from "@/organisms/navigation/tab"
import Tabs from "@/organisms/navigation/tabs"
import Sortable from "."

const items = [
  { id: "a", title: "alpha" },
  { id: "b", title: "beta", fixed: true },
  { id: "c", title: "gamma" },
]

const Item = ({ title, ref, ...rest }) => (
  <Tab ref={ref} {...rest}>
    <span>{title}</span>
  </Tab>
)

const renderSortable = (props = {}) =>
  renderWithProviders(
    <Tabs>
      <Sortable items={items} Item={Item} onDragEnd={jest.fn()} onTabClose={jest.fn()} {...props} />
    </Tabs>
  )

describe("Sortable navigation tabs", () => {
  it("renders every item in order with its index", () => {
    renderSortable()
    const tabs = ["alpha", "beta", "gamma"].map(t => screen.getByText(t).closest("[data-index]"))
    expect(tabs.map(t => t.getAttribute("data-index"))).toEqual(["0", "1", "2"])
    expect(tabs.map(t => t.getAttribute("data-id"))).toEqual(["a", "b", "c"])
  })

  it("offers a drag handle only on non-fixed items", () => {
    renderSortable()
    expect(screen.getAllByTestId("navigation-tab-drag-handle")).toHaveLength(2)
  })

  it("closes a tab through the labelled close button", () => {
    const onTabClose = jest.fn()
    renderSortable({ onTabClose })
    fireEvent.mouseOver(screen.getByText("gamma").closest("[data-index]"))
    fireEvent.click(screen.getByRole("button", { name: "Close tab" }))
    expect(onTabClose).toHaveBeenCalledWith(2, undefined)
  })

  it("hides overflow arrows while tabs fit", () => {
    renderSortable()
    expect(screen.queryByRole("button", { name: /Scroll tabs/ })).not.toBeInTheDocument()
  })
})
