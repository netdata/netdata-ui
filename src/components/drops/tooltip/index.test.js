import React from "react"
import { renderWithProviders, fireEvent, waitFor, act } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { Text } from "@/components/typography"
import Tooltip from "./index"

it("renders", () => {
  const { queryByText } = renderWithProviders(
    <Tooltip content="tooltip content">
      <Text>tooltip target</Text>
    </Tooltip>
  )

  expect(queryByText("tooltip target")).toBeVisible()
  expect(queryByText("tooltip content")).not.toBeInTheDocument()
})

it("hovers", () => {
  const { queryByText } = renderWithProviders(
    <Tooltip content="tooltip content" delay={0}>
      <Text>tooltip target</Text>
    </Tooltip>
  )

  fireEvent.mouseOver(queryByText("tooltip target"))
  expect(queryByText("tooltip content")).toBeInTheDocument()
})

it("renders plain", () => {
  const { queryByTestId, queryByText } = renderWithProviders(
    <Tooltip plain content="tooltip content" delay={0}>
      <Text>tooltip target</Text>
    </Tooltip>
  )

  fireEvent.mouseOver(queryByText("tooltip target"))

  expect(queryByTestId("drop")).toHaveTextContent("tooltip content")
})

it("renders content from function", () => {
  const { queryByText } = renderWithProviders(
    <Tooltip content={() => "tooltip content"} delay={0}>
      {props => <Text {...props}>tooltip target</Text>}
    </Tooltip>
  )

  fireEvent.mouseOver(queryByText("tooltip target"))

  expect(queryByText("tooltip target")).toBeVisible()
  expect(queryByText("tooltip content")).toBeInTheDocument()
})

it.each(["top", "right", "bottom", "left"])("draws no arrow when aligned %s", align => {
  const { queryByTestId, queryByText } = renderWithProviders(
    <Tooltip align={align} content="tooltip content" delay={0}>
      <Text>tooltip target</Text>
    </Tooltip>
  )
  fireEvent.mouseOver(queryByText("tooltip target"))
  expect(queryByText("tooltip content")).toBeInTheDocument()
  expect(queryByTestId("drop-arrow")).not.toBeInTheDocument()
})

describe("tooltip surface", () => {
  const openTooltip = (props = {}, options) => {
    const utils = renderWithProviders(
      <Tooltip content="tooltip content" delay={0} {...props}>
        <Text>tooltip target</Text>
      </Tooltip>,
      options
    )
    fireEvent.mouseOver(utils.getByText("tooltip target"))
    return utils
  }

  it("uses the inverse tooltip tokens", () => {
    const { getByText } = openTooltip()

    expect(getByText("tooltip content")).toHaveStyleRule("color", DefaultTheme.colors.tooltipText)
    expect(getByText("tooltip content").parentNode).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.tooltip
    )
  })

  it("rounds the bubble at 6px and uses tabular numbers", () => {
    const { getByText } = openTooltip()
    const bubble = getByText("tooltip content").parentNode

    expect(bubble).toHaveStyleRule("border-radius", "6px")
    expect(bubble).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  })

  it("casts one floating silhouette over bubble and arrow", () => {
    const { getByText } = openTooltip({}, { theme: DarkTheme })
    const shadow = DarkTheme.colors.dropdownShadow

    expect(getByText("tooltip content").parentNode.parentNode).toHaveStyleRule(
      "filter",
      `drop-shadow(0 4px 12px ${shadow}) drop-shadow(0 1px 2px ${shadow})`
    )
  })

  it("sets text at 13px and wraps it at 300px", () => {
    const { getByText } = openTooltip()
    expect(getByText("tooltip content")).toHaveStyleRule("font-size", "13px")
    expect(getByText("tooltip content").parentNode).toHaveStyleRule("max-width", "300px")
  })

  it.each([
    ["light", DefaultTheme],
    ["dark", DarkTheme],
  ])("inks custom node content with the tooltip text colour in %s", (_, theme) => {
    const { getByText } = openTooltip(
      {
        content: (
          <div>
            <Text>custom body</Text>
            <Text color="textLite">custom note</Text>
          </div>
        ),
      },
      { theme }
    )
    expect(getByText("custom body")).toHaveStyleRule("color", theme.colors.tooltipText)
    expect(getByText("custom note")).toHaveStyleRule("color", theme.colors.tooltipText)
  })

  it("leaves plain content on its own surface colours", () => {
    const { getByText } = openTooltip({ plain: true, content: <Text>plain body</Text> })
    expect(getByText("plain body")).toHaveStyleRule("color", DefaultTheme.colors.text)
  })

  it("renders a title and description pair", () => {
    const { getByText } = openTooltip({
      content: { title: "Room: All nodes", description: "See all your rooms and switch room" },
    })
    const title = getByText("Room: All nodes")
    const description = getByText("See all your rooms and switch room")
    expect(title).toHaveStyleRule("font-size", "13px")
    expect(title).toHaveStyleRule("font-weight", "600")
    expect(title).toHaveStyleRule("color", DefaultTheme.colors.tooltipText)
    expect(description).toHaveStyleRule("font-size", "13px")
    expect(description).toHaveStyleRule("color", DefaultTheme.colors.tooltipText)
  })
})

describe("tooltip behaviour", () => {
  it("opens on focus, describes the target, and closes on blur", () => {
    const { getByText, queryByText } = renderWithProviders(
      <Tooltip content="tooltip content">
        <button>tooltip target</button>
      </Tooltip>
    )
    const target = getByText("tooltip target")

    fireEvent.focus(target)
    expect(queryByText("tooltip content")).toBeInTheDocument()
    expect(target.getAttribute("aria-describedby")).toBe(getByTestIdDrop().id)

    fireEvent.blur(target)
    expect(queryByText("tooltip content")).not.toBeInTheDocument()
  })

  it("does not render when disabled", () => {
    const { getByText, queryByText } = renderWithProviders(
      <Tooltip content="tooltip content" disabled>
        <Text>tooltip target</Text>
      </Tooltip>
    )

    fireEvent.mouseOver(getByText("tooltip target"))
    expect(queryByText("tooltip content")).not.toBeInTheDocument()
  })

  it("waits 600ms by default before opening on hover", () => {
    jest.useFakeTimers()
    const { getByText, queryByText } = renderWithProviders(
      <Tooltip content="tooltip content">
        <Text>tooltip target</Text>
      </Tooltip>
    )

    fireEvent.mouseOver(getByText("tooltip target"))
    act(() => jest.advanceTimersByTime(599))
    expect(queryByText("tooltip content")).not.toBeInTheDocument()
    act(() => jest.advanceTimersByTime(1))
    expect(queryByText("tooltip content")).toBeInTheDocument()
    jest.useRealTimers()
  })

  it("waits for the delay before opening", () => {
    jest.useFakeTimers()
    const { getByText, queryByText } = renderWithProviders(
      <Tooltip content="tooltip content" delay={300}>
        <Text>tooltip target</Text>
      </Tooltip>
    )

    fireEvent.mouseOver(getByText("tooltip target"))
    expect(queryByText("tooltip content")).not.toBeInTheDocument()
    act(() => jest.advanceTimersByTime(300))
    expect(queryByText("tooltip content")).toBeInTheDocument()
    jest.useRealTimers()
  })

  it("does not render without content", () => {
    const { getByText, queryByTestId } = renderWithProviders(
      <Tooltip content="">
        <Text>tooltip target</Text>
      </Tooltip>
    )

    fireEvent.mouseOver(getByText("tooltip target"))
    expect(queryByTestId("drop")).not.toBeInTheDocument()
  })
})

const getByTestIdDrop = () => document.querySelector('[data-testid="drop"]')

describe("tooltip content shapes", () => {
  it("renders an array of nodes as given", () => {
    const { getByText } = renderWithProviders(
      <Tooltip content={[<span key="a">first part</span>, " second part"]} delay={0}>
        <Text>tooltip target</Text>
      </Tooltip>
    )
    fireEvent.mouseOver(getByText("tooltip target"))
    expect(getByText("first part")).toBeInTheDocument()
    expect(getByTestIdDrop()).toHaveTextContent("first part second part")
  })
})
