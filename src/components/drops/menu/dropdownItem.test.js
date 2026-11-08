import React from "react"
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import DropdownItem, { ItemContainer } from "./dropdownItem"

const renderItem = ({ item = {}, theme, ...props } = {}) =>
  renderWithProviders(
    <ul>
      <DropdownItem
        item={{ value: "cpu", label: "CPU usage", ...item }}
        onItemClick={jest.fn()}
        index={0}
        {...props}
      />
    </ul>,
    { theme }
  )

const option = () => screen.getByRole("option")

describe("DropdownItem contract", () => {
  it("renders an li option that reports selection", () => {
    renderItem({ value: "cpu" })

    expect(option().tagName).toBe("LI")
    expect(option()).toHaveAttribute("aria-selected", "true")
    expect(option()).toHaveAttribute("data-index", "0")
  })

  it("reports unselected rows", () => {
    renderItem({ value: "memory" })

    expect(option()).toHaveAttribute("aria-selected", "false")
  })

  it("calls the item onClick and onItemClick with the value", () => {
    const onClick = jest.fn()
    const onItemClick = jest.fn()
    renderItem({ item: { onClick }, onItemClick })

    fireEvent.click(option())

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onItemClick).toHaveBeenCalledWith("cpu")
  })

  it("puts the label before the icon when reversed", () => {
    renderItem({ item: { reverse: true, icon: <svg data-testid="icon" /> } })

    expect(option().firstChild).toHaveTextContent("CPU usage")
    expect(option().lastChild).toBe(screen.getByTestId("icon"))
  })

  it("spaces and centres the icon against the label", () => {
    renderItem({ item: { icon: <svg data-testid="icon" /> } })

    expect(option()).toHaveStyleRule("align-items", "center")
    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(option()).toHaveStyleRule("gap", "8px")
  })
})

describe("DropdownItem row styles", () => {
  it("is a 34px row with rounded corners and a 10px text inset", () => {
    renderItem()

    expect(option()).toHaveStyleRule("min-height", "34px")
    expect(option()).toHaveStyleRule("padding", "8px 10px")
    expect(option()).toHaveStyleRule("border-radius", "7px")
  })

  it("lets consumers set their own alignment and height", () => {
    renderWithProviders(
      <ItemContainer alignItems="start" height={10}>
        row
      </ItemContainer>
    )

    expect(option()).toHaveStyleRule("align-items", "flex-start")
    expect(option()).not.toHaveStyleRule("min-height", expect.anything())
  })

  it("lets consumers override the padding", () => {
    renderWithProviders(<ItemContainer padding={[0]}>row</ItemContainer>)

    expect(option()).toHaveStyleRule("padding", "0")
  })

  it.each([
    ["light", DefaultTheme],
    ["dark", DarkTheme],
  ])("uses menuItemHover on hover in %s", (_, theme) => {
    renderItem({ value: "memory", theme })

    expect(option()).toHaveStyleRule("background-color", theme.colors.menuItemHover, {
      modifier: ":hover",
    })
  })

  it("transitions state changes quickly and honours reduced motion", () => {
    renderItem()

    expect(option()).toHaveStyleRule("transition", "background-color 120ms ease-out")
    expect(option()).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion: reduce)",
    })
  })

  it("draws the selected row at full opacity with a tint and a green left rail", () => {
    renderItem({ value: "cpu" })

    expect(option()).toHaveStyleRule("opacity", "1")
    expect(option()).toHaveStyleRule("background-color", DefaultTheme.colors.menuItemSelected)
    expect(option()).toHaveStyleRule("box-shadow", `inset 3px 0 0 ${DefaultTheme.colors.primary}`)
    expect(option()).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.menuItemSelectedHover,
      {
        modifier: ":hover",
      }
    )
  })

  it("uses the same selected grammar in dark mode", () => {
    renderItem({ value: "cpu", theme: DarkTheme })

    expect(option()).toHaveStyleRule("background-color", DarkTheme.colors.menuItemSelected)
    expect(option()).toHaveStyleRule("box-shadow", "inset 3px 0 0 #00AB44")
  })

  it("fades and disables disabled rows", () => {
    renderItem({ value: "memory", item: { disabled: true } })

    expect(option()).toHaveStyleRule("opacity", "0.4")
    expect(option()).toHaveStyleRule("pointer-events", "none")
  })

  it("draws section titles with the separator token", () => {
    renderWithProviders(<ItemContainer justDesc>Network</ItemContainer>)

    expect(option()).toHaveStyleRule("border-top", `1px solid ${DefaultTheme.colors.separator}`)
  })

  it("exposes a focus style hook without adding behaviour", () => {
    renderItem({ value: "memory" })

    const ring = `inset 0 0 0 2px ${DefaultTheme.colors.primary}`
    expect(option()).toHaveStyleRule("box-shadow", ring, { modifier: ":focus-visible" })
    expect(option()).toHaveStyleRule("box-shadow", ring, { modifier: '[data-focused="true"]' })
    expect(option()).not.toHaveAttribute("tabindex")
  })

  it("keeps the selected rail inside the focus ring", () => {
    renderItem({ value: "cpu" })

    const { primary } = DefaultTheme.colors
    const railAndRing = `inset 3px 0 0 ${primary},inset 0 0 0 2px ${primary}`
    expect(option()).toHaveStyleRule("box-shadow", railAndRing, { modifier: ":focus-visible" })
    expect(option()).toHaveStyleRule("box-shadow", railAndRing, {
      modifier: '[data-focused="true"]',
    })
  })
})
