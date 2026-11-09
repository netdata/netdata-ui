import React from "react"
import { renderWithProviders, screen, fireEvent, act } from "testUtilities"
import { DefaultTheme } from "@/theme"
import Dropdown from "./dropdown"
import DropdownItem from "./dropdownItem"

const items = [
  { value: "cpu", label: "CPU usage" },
  { value: "load", label: "Load" },
  { value: "memory", label: "Memory" },
]

const renderDropdown = props =>
  renderWithProviders(
    <Dropdown items={items} Item={DropdownItem} onItemClick={jest.fn()} {...props} />
  )

const listbox = () => screen.getByRole("listbox")

describe("Dropdown surface", () => {
  it("is a ul listbox", () => {
    renderDropdown()

    expect(listbox().tagName).toBe("UL")
  })

  it("rounds at 12px and casts the shared floating shadow", () => {
    renderDropdown()
    const shadow = DefaultTheme.colors.dropdownShadow

    expect(listbox()).toHaveStyleRule("border-radius", "12px")
    expect(listbox()).toHaveStyleRule("box-shadow", `0 4px 12px ${shadow},0 1px 2px ${shadow}`)
  })

  it("casts no shadow with hideShadow", () => {
    renderDropdown({ hideShadow: true })

    expect(listbox()).not.toHaveStyleRule("box-shadow", expect.anything())
  })

  it("insets the virtual content while the scroll viewport reaches the panel edge", () => {
    const scrollRef = React.createRef()
    renderDropdown({ ref: scrollRef })

    expect(listbox()).not.toHaveStyleRule("padding", expect.anything())
    expect(scrollRef.current).toHaveStyleRule("overflow", "hidden auto")
    expect(scrollRef.current).not.toHaveStyleRule("padding", expect.anything())
    expect(scrollRef.current.firstElementChild).toHaveStyleRule("padding", "0 12px 0 12px")
  })

  it("keeps asymmetric consumer padding on the menu content", () => {
    const scrollRef = React.createRef()
    renderDropdown({
      ref: scrollRef,
      padding: [1, 2, 3, 4],
      dropTitle: "Metrics",
      Footer: () => <div>Footer</div>,
    })

    expect(screen.getByText("Metrics").parentElement).toHaveStyleRule("padding", "4px 8px 0 16px")
    expect(scrollRef.current.firstElementChild).toHaveStyleRule("padding", "0 8px 0 16px")
    expect(screen.getByText("Footer").parentElement).toHaveStyleRule("padding", "0 8px 12px 16px")
  })
})

describe("Dropdown behaviour", () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  const search = value => {
    fireEvent.change(screen.getByTestId("dropdown-search"), { target: { value } })
    act(() => jest.advanceTimersByTime(400))
  }

  it("renders the title, rows and footer", async () => {
    jest.useRealTimers()
    renderDropdown({ dropTitle: "Metrics", Footer: () => <div>Footer</div> })

    expect(screen.getByText("Metrics")).toBeInTheDocument()
    expect(await screen.findAllByRole("option")).toHaveLength(3)
    expect(screen.getByText("Footer")).toBeInTheDocument()
  })

  it("filters rows by label", () => {
    renderDropdown({ hasSearch: true })

    search("mem")

    expect(screen.getAllByRole("option")).toHaveLength(1)
    expect(screen.getByText("Memory")).toBeInTheDocument()
  })

  it("shows a muted empty state when nothing matches", () => {
    renderDropdown({ hasSearch: true })

    search("zzz")

    expect(screen.queryAllByRole("option")).toHaveLength(0)
    expect(screen.getByText("No results were found")).toHaveStyleRule(
      "color",
      DefaultTheme.colors.textLite
    )
  })

  it("marks the selected value", async () => {
    jest.useRealTimers()
    renderDropdown({ value: "load" })

    expect(await screen.findByRole("option", { selected: true })).toHaveTextContent("Load")
  })
})
