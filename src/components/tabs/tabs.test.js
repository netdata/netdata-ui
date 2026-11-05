/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { Tabs, Tab } from "."

describe("Tabs states", () => {
  it(" * should render uncontrolled", () => {
    const { container, getByText, queryByText } = renderWithProviders(
      <Tabs>
        <Tab label="hi">Hello</Tab>
        <Tab label="Hi again">Hello again</Tab>
        <Tab label="Bye">Goodbye</Tab>
        <Tab label="Bye Bye">Fairwell</Tab>
      </Tabs>
    )

    const tabs = container.firstChild
    expect(tabs).toMatchSnapshot()

    expect(queryByText("Hello")).toBeInTheDocument()
    expect(queryByText("Hello again")).not.toBeInTheDocument()
    expect(queryByText("Goodbye")).not.toBeInTheDocument()
    expect(queryByText("Fairwell")).not.toBeInTheDocument()

    const tab = getByText("Bye Bye")
    fireEvent.click(tab)

    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Fairwell")).toBeInTheDocument()
  })

  it(" * should render controlled", () => {
    const onChange = jest.fn()
    const Component = () => {
      const [selected, setSelected] = useState(2)

      return (
        <Tabs
          selected={selected}
          onChange={onChange.mockImplementation(index => setSelected(index))}
        >
          <Tab label="hi">Hello</Tab>
          <Tab label="Hi again">Hello again</Tab>
          <Tab label="Bye">Goodbye</Tab>
          <Tab label="Bye Bye">Fairwell</Tab>
        </Tabs>
      )
    }

    const { queryByText, getByText } = renderWithProviders(<Component />)

    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).not.toBeInTheDocument()
    expect(queryByText("Goodbye")).toBeInTheDocument()
    expect(queryByText("Fairwell")).not.toBeInTheDocument()

    const tab = getByText("Hi again")
    fireEvent.click(tab)
    expect(onChange).toHaveBeenCalledWith(1)
    expect(queryByText("Goodbye")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()
  })

  it(" * should not allow disabled to be selected", () => {
    const Component = () => (
      <Tabs>
        <Tab label="hi" disabled>
          Hello
        </Tab>
        <Tab label="Hi again">Hello again</Tab>
        <Tab label="Bye">Goodbye</Tab>
        <Tab label="Bye Bye">Fairwell</Tab>
      </Tabs>
    )
    const { queryByText, getByText } = renderWithProviders(<Component />)

    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()

    const tab = getByText("hi")
    fireEvent.click(tab)
    expect(queryByText("Hello")).not.toBeInTheDocument()
    expect(queryByText("Hello again")).toBeInTheDocument()
  })
})

describe("Tabs styles", () => {
  const { DefaultTheme, DarkTheme } = require("@/theme")
  const light = DefaultTheme.colors
  const dark = DarkTheme.colors

  const renderTabs = (props = {}, options) =>
    renderWithProviders(
      <Tabs {...props}>
        <Tab label="Overview">Overview content</Tab>
        <Tab label="Nodes">Nodes content</Tab>
        <Tab label="Billing" disabled>
          Billing content
        </Tab>
      </Tabs>,
      options
    )

  const tabByLabel = (container, label) => container.querySelector(`[label="${label}"]`)

  it(" * colors the active tab root with primary so string labels turn green", () => {
    const { container } = renderTabs()
    expect(tabByLabel(container, "Overview")).toHaveStyleRule("color", light.primary)
  })

  it(" * keeps coloring span labels of the active tab", () => {
    const { container } = renderTabs()
    expect(tabByLabel(container, "Overview")).toHaveStyleRule("color", light.primary, {
      modifier: "&>span",
    })
  })

  it(" * colors inactive tabs with the text color", () => {
    const { container } = renderTabs()
    expect(tabByLabel(container, "Nodes")).toHaveStyleRule("color", light.text)
  })

  it(" * draws a 2px primary inset indicator on the active tab", () => {
    const { container } = renderTabs()
    expect(tabByLabel(container, "Overview")).toHaveStyleRule(
      "box-shadow",
      `inset 0 -2px 0 ${light.primary}`
    )
  })

  // The indicator must sit on the divider, not 1px above it, so active tab and divider read as one line.
  it(" * puts the active indicator directly on the strip divider", () => {
    const { container } = renderTabs()
    const strip = container.querySelector("nav")
    expect(strip).toHaveStyleRule("box-shadow", `inset 0 -1px 0 ${light.border}`)
    expect(strip).not.toHaveStyleRule("border-bottom", expect.anything())
    expect(tabByLabel(container, "Overview")).not.toHaveStyleRule(
      "border-bottom-width",
      expect.anything()
    )
  })

  it(" * draws no divider with noDefaultBorder", () => {
    const { container } = renderWithProviders(
      <Tabs noDefaultBorder>
        <Tab label="Overview" />
      </Tabs>
    )
    expect(container.querySelector("nav")).not.toHaveStyleRule("box-shadow", expect.anything())
  })

  it(" * uses a neutral hover (surface step and grey rail), never a green one", () => {
    const { container } = renderTabs()
    const tab = tabByLabel(container, "Nodes")
    expect(tab).toHaveStyleRule("box-shadow", `inset 0 -2px 0 ${light.textLite}`, {
      modifier: ":hover",
    })
    expect(tab).toHaveStyleRule("background", light.elementBackground, { modifier: ":hover" })
    expect(tab).toHaveStyleRule("color", light.main, { modifier: ":hover" })
  })

  it(" * keeps the active indicator on hover", () => {
    const { container } = renderTabs()
    expect(tabByLabel(container, "Overview")).toHaveStyleRule(
      "box-shadow",
      `inset 0 -2px 0 ${light.primary}`,
      { modifier: ":hover" }
    )
  })

  it.each([
    ["warning", "warning"],
    ["error", "error"],
    ["success", "primary"],
  ])(" * active %s flavour uses its status color for label and indicator", (flavour, key) => {
    const { container } = renderWithProviders(
      <Tabs>
        <Tab label="Flavoured" flavour={flavour}>
          content
        </Tab>
      </Tabs>
    )
    const tab = tabByLabel(container, "Flavoured")
    expect(tab).toHaveStyleRule("color", light[key])
    expect(tab).toHaveStyleRule("box-shadow", `inset 0 -2px 0 ${light[key]}`)
  })

  it(" * renders the same grammar in dark theme: transparent background, primary indicator", () => {
    const { container } = renderTabs({}, { theme: DarkTheme })
    const active = tabByLabel(container, "Overview")
    const inactive = tabByLabel(container, "Nodes")
    expect(active).toHaveStyleRule("background", "rgba(255,255,255,0.0)")
    expect(inactive).toHaveStyleRule("background", "rgba(255,255,255,0.0)")
    expect(active).toHaveStyleRule("box-shadow", `inset 0 -2px 0 ${dark.primary}`)
    expect(inactive).toHaveStyleRule("color", dark.text)
  })

  it(" * keeps tab heights (32px default, 40px when small is false, 24px green small)", () => {
    const { container } = renderWithProviders(
      <Tabs>
        <Tab label="Default">a</Tab>
        <Tab label="Large" small={false}>
          b
        </Tab>
        <Tab label="Green" green>
          c
        </Tab>
      </Tabs>
    )
    expect(tabByLabel(container, "Default")).toHaveStyleRule("height", "32px")
    expect(tabByLabel(container, "Large")).toHaveStyleRule("height", "40px")
    expect(tabByLabel(container, "Green")).toHaveStyleRule("height", "24px")
  })

  it(" * tightens horizontal padding to 12px", () => {
    const { container } = renderTabs()
    expect(tabByLabel(container, "Nodes")).toHaveStyleRule("padding", "0 12px")
  })

  it(" * honours a consumer padding override", () => {
    const { container } = renderWithProviders(
      <Tabs>
        <Tab label="Padded" padding={[0, 6]}>
          a
        </Tab>
      </Tabs>
    )
    expect(tabByLabel(container, "Padded")).toHaveStyleRule("padding", "0 24px")
  })

  it(" * uses tabular numerals so counters do not jitter", () => {
    const { container } = renderTabs()
    expect(tabByLabel(container, "Nodes")).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  })

  it(" * animates state changes and drops the animation for reduced motion", () => {
    const { container } = renderTabs()
    const tab = tabByLabel(container, "Nodes")
    expect(tab).toHaveStyleRule("transition", expect.stringContaining("140ms ease-out"))
    expect(tab).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion:reduce)",
    })
  })

  it(" * dims disabled tabs and ignores clicks on them", async () => {
    const onChange = jest.fn()
    const { container } = renderTabs({ onChange })
    const tab = tabByLabel(container, "Billing")
    expect(tab).toHaveStyleRule("opacity", "0.4")
    expect(tab).toHaveStyleRule("pointer-events", "none")
    fireEvent.click(tab)
    expect(onChange).not.toHaveBeenCalled()
  })

  it(" * renders function labels with tab context", () => {
    const { getByText } = renderWithProviders(
      <Tabs>
        <Tab label={({ index, active }) => `Tab ${index} ${active ? "on" : "off"}`}>a</Tab>
        <Tab label={({ index, active }) => `Tab ${index} ${active ? "on" : "off"}`}>b</Tab>
      </Tabs>
    )
    expect(getByText("Tab 0 on")).toBeInTheDocument()
    expect(getByText("Tab 1 off")).toBeInTheDocument()
  })
})

describe("Tabs long labels", () => {
  // A label wider than maxWidth must stay inside its own tab instead of painting over the next one.
  it("clips and ellipsises a label longer than the tab", () => {
    const { getByText } = renderWithProviders(
      <Tabs>
        <Tab label="A very long tab label that is truncated by maxWidth" maxWidth="120px" />
        <Tab label="system.cpu" />
      </Tabs>
    )
    const label = getByText(/A very long tab label/)
    expect(label.tagName).toBe("SPAN")
    expect(label).toHaveStyleRule("overflow", "hidden")
    expect(label).toHaveStyleRule("text-overflow", "ellipsis")
    expect(label).toHaveStyleRule("min-width", "0")
    expect(label.parentElement).toHaveStyleRule("justify-content", "safe center")
  })

  it("keeps tabs at their own width so a crowded strip scrolls instead of squashing them", () => {
    const { getByText } = renderWithProviders(
      <Tabs>
        <Tab label="Overview" />
      </Tabs>
    )
    expect(getByText("Overview").parentElement).toHaveStyleRule("flex-shrink", "0")
  })
})

describe("Tabs layout", () => {
  // The strip lines up with the content below it, and content does not sit flush under the line.
  it("aligns the strip with the content and leaves spacing below it to the consumer", () => {
    const { container } = renderWithProviders(
      <Tabs>
        <Tab label="Overview">Overview content</Tab>
      </Tabs>
    )
    const strip = container.querySelector("nav")
    expect(strip).toHaveStyleRule("padding", "0")
    expect(strip).not.toHaveStyleRule("margin", expect.anything())
  })
})

describe("Tabs text and slots", () => {
  const { DefaultTheme } = require("@/theme")
  const light = DefaultTheme.colors

  it("renders string labels at 13px instead of inheriting the page size", () => {
    const { getByText } = renderWithProviders(
      <Tabs>
        <Tab label="Overview" />
      </Tabs>
    )
    expect(getByText("Overview")).toHaveStyleRule("font-size", "13px")
  })

  it.each(["line", "contained"])(
    "renders a 16px icon before the label and a muted 12px count after it (%s)",
    variant => {
      const { getByText } = renderWithProviders(
        <Tabs variant={variant}>
          <Tab label="Nodes" icon="nodes" count={128} />
        </Tabs>
      )
      const label = getByText("Nodes")
      const tab = label.parentElement
      const icon = tab.querySelector("svg")
      const count = getByText("128")

      expect(tab.firstElementChild).toBe(icon)
      expect(icon).toHaveAttribute("width", "16px")
      expect(icon).toHaveAttribute("height", "16px")
      // The label names the tab, so the icon stays out of the accessible name.
      expect(icon).toHaveAttribute("aria-hidden", "true")
      expect(label.nextElementSibling).toBe(count)
      expect(count).toHaveStyleRule("font-size", "12px")
      expect(count).toHaveStyleRule("font-variant-numeric", "tabular-nums")
      expect(count).toHaveStyleRule("color", light.textLite)
    }
  )

  it("formats large counts with grouping", () => {
    const { getByText } = renderWithProviders(
      <Tabs>
        <Tab label="Metrics" count={2140} />
      </Tabs>
    )
    expect(getByText((2140).toLocaleString())).toBeInTheDocument()
  })

  it("renders no icon or count when they are not set", () => {
    const { container } = renderWithProviders(
      <Tabs>
        <Tab label="Overview" />
      </Tabs>
    )
    const tab = container.querySelector('[label="Overview"]')
    expect(tab.querySelector("svg")).toBeNull()
    expect(tab.children).toHaveLength(1)
  })
})

describe("Tabs contained variant", () => {
  const { DefaultTheme, getRgbColor } = require("@/theme")
  const light = DefaultTheme.colors
  const theme = DefaultTheme

  const renderContained = (props = {}) =>
    renderWithProviders(
      <Tabs variant="contained" {...props}>
        <Tab label="Overview" flavour="error">
          Overview content
        </Tab>
        <Tab label="Nodes">Nodes content</Tab>
      </Tabs>
    )

  const tabByLabel = (container, label) => container.querySelector(`[label="${label}"]`)

  it("draws the strip on the segmented track without the divider and without stretching", () => {
    const { container } = renderContained()
    const strip = container.querySelector("nav")
    expect(strip).toHaveStyleRule("background", getRgbColor("textLite", 0.12)({ theme }))
    expect(strip).toHaveStyleRule("border", `1px solid ${light.borderSecondary}`)
    expect(strip).toHaveStyleRule("display", "inline-flex")
    expect(strip).toHaveStyleRule("align-self", "flex-start")
    expect(strip).not.toHaveStyleRule("box-shadow", expect.anything())
  })

  it("raises the active item instead of drawing an indicator, whatever the flavour", () => {
    const { container } = renderContained()
    const active = tabByLabel(container, "Overview")
    expect(active).toHaveStyleRule("background", light.dropdown)
    expect(active).toHaveStyleRule("color", light.textFocus)
    expect(active).toHaveStyleRule("box-shadow", `inset 0 0 0 1px ${light.border}`)
    expect(active).toHaveStyleRule("font-weight", "600")
  })

  it("keeps inactive items flat and muted", () => {
    const { container } = renderContained()
    const inactive = tabByLabel(container, "Nodes")
    expect(inactive).toHaveStyleRule("color", light.textLite)
    expect(inactive).toHaveStyleRule("box-shadow", "none")
  })

  it("switches content on click", () => {
    const { container, queryByText } = renderContained()
    fireEvent.click(tabByLabel(container, "Nodes"))
    expect(queryByText("Nodes content")).toBeInTheDocument()
  })

  it("keeps the line look by default", () => {
    const { container } = renderWithProviders(
      <Tabs>
        <Tab label="Overview" />
      </Tabs>
    )
    expect(container.querySelector("nav")).not.toHaveStyleRule("display", "inline-flex")
  })
})

describe("Tabs accessibility", () => {
  const renderStrip = (props = {}) =>
    renderWithProviders(
      <Tabs {...props}>
        <Tab label="Overview">Overview content</Tab>
        <Tab label="Billing" disabled>
          Billing content
        </Tab>
        <Tab label="Nodes">Nodes content</Tab>
      </Tabs>
    )

  it("exposes a tablist with tabs that report their selection", () => {
    const { getByRole, getAllByRole } = renderStrip()
    expect(getByRole("tablist")).toHaveClass("tabs")
    const tabs = getAllByRole("tab")
    expect(tabs).toHaveLength(3)
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
    expect(tabs[2]).toHaveAttribute("aria-selected", "false")
    expect(tabs[1]).toHaveAttribute("aria-disabled", "true")
  })

  it("keeps only the selected tab in the page tab order", () => {
    const { getAllByRole } = renderStrip()
    const [first, disabled, last] = getAllByRole("tab")
    expect(first).toHaveAttribute("tabindex", "0")
    expect(disabled).toHaveAttribute("tabindex", "-1")
    expect(last).toHaveAttribute("tabindex", "-1")
  })

  it.each(["line", "contained"])(
    "moves between enabled tabs with the arrow keys and wraps (%s)",
    variant => {
      const { getAllByRole, queryByText } = renderStrip({ variant })
      const [first, , last] = getAllByRole("tab")

      first.focus()
      fireEvent.keyDown(first, { key: "ArrowRight" })
      expect(last).toHaveFocus()
      expect(queryByText("Nodes content")).toBeInTheDocument()

      fireEvent.keyDown(last, { key: "ArrowRight" })
      expect(first).toHaveFocus()
      expect(queryByText("Overview content")).toBeInTheDocument()

      fireEvent.keyDown(first, { key: "ArrowLeft" })
      expect(last).toHaveFocus()
      expect(queryByText("Nodes content")).toBeInTheDocument()
    }
  )

  it("reports arrow-key moves through onChange when controlled", () => {
    const onChange = jest.fn()
    const { getAllByRole } = renderStrip({ selected: 0, onChange })
    const [first] = getAllByRole("tab")
    fireEvent.keyDown(first, { key: "ArrowRight" })
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it("shows a focus ring on keyboard focus", () => {
    const { getAllByRole } = renderStrip()
    const { DefaultTheme } = require("@/theme")
    // Inset, because the scrolling strip clips anything drawn outside the tab.
    const tab = getAllByRole("tab")[0]
    expect(tab).toHaveStyleRule("outline", `2px solid ${DefaultTheme.colors.primary}`, {
      modifier: ":focus-visible",
    })
    expect(tab).toHaveStyleRule("outline-offset", "-2px", { modifier: ":focus-visible" })
  })
})
