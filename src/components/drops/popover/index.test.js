import { renderWithProviders, fireEvent } from "testUtilities"
import { Text } from "@/components/typography"
import { DefaultTheme, DarkTheme } from "@/theme"
import Popover from "./index"

it("renders", () => {
  const { queryByText } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(queryByText("popover target")).toBeVisible()
  expect(queryByText("popover content")).not.toBeInTheDocument()
})

it("hovers", () => {
  const { queryByText } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))
  expect(queryByText("popover content")).toBeInTheDocument()
})

it("remains open on drop content hover", () => {
  const { queryByText } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))
  fireEvent.mouseOver(queryByText("popover content"))
  expect(queryByText("popover content")).toBeInTheDocument()
})

it("renders plain", () => {
  const { queryByTestId, queryByText } = renderWithProviders(
    <Popover plain content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))

  expect(queryByTestId("drop")).toHaveTextContent("popover content")
})

it("renders content from function", () => {
  const { queryByText } = renderWithProviders(
    <Popover content={() => "popover content"}>
      {props => <Text {...props}>popover target</Text>}
    </Popover>
  )

  fireEvent.mouseOver(queryByText("popover target"))

  expect(queryByText("popover target")).toBeVisible()
  expect(queryByText("popover content")).toBeInTheDocument()
})

it("align", () => {
  const { getByTestId, queryByText, rerender } = renderWithProviders(
    <Popover content="popover content">
      <Text>popover target</Text>
    </Popover>
  )
  fireEvent.mouseOver(queryByText("popover target"))
  expect(getByTestId("drop-arrow")).not.toHaveStyleRule("transform")

  rerender(
    <Popover align="right" content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(90deg)")

  rerender(
    <Popover align="bottom" content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(180deg)")

  rerender(
    <Popover align="left" content="popover content">
      <Text>popover target</Text>
    </Popover>
  )

  expect(getByTestId("drop-arrow")).toHaveStyleRule("transform", "rotate(270deg)")
})

describe("popover surface", () => {
  const openPopover = (props = {}, options) => {
    const utils = renderWithProviders(
      <Popover content="popover content" {...props}>
        <Text>popover target</Text>
      </Popover>,
      options
    )
    fireEvent.mouseOver(utils.getByText("popover target"))
    return utils
  }

  it.each([
    ["light", DefaultTheme],
    ["dark", DarkTheme],
  ])("sits on the opaque menu surface with a hairline border in %s", (_, theme) => {
    const { getByText } = openPopover({}, { theme })
    const bubble = getByText("popover content").parentNode

    expect(bubble).toHaveStyleRule("background-color", theme.colors.dropdown)
    expect(bubble).toHaveStyleRule("border", `1px solid ${theme.colors.border}`)
    expect(bubble).toHaveStyleRule("border-radius", "6px")
    expect(bubble).toHaveStyleRule("padding", "8px 12px")
  })

  it("uses body text, not inverse tooltip text, on the menu surface", () => {
    const { getByText } = openPopover()

    expect(getByText("popover content")).toHaveStyleRule("color", DefaultTheme.colors.text)
  })

  it("fills the arrow with the same surface", () => {
    const { getByTestId } = openPopover()

    expect(getByTestId("drop-arrow")).toHaveStyleRule("fill", DefaultTheme.colors.dropdown)
  })
})

describe("popover behaviour", () => {
  it("describes the target while open", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <Popover content="popover content">
        <button>popover target</button>
      </Popover>
    )
    const target = getByText("popover target")

    fireEvent.focus(target)
    expect(target.getAttribute("aria-describedby")).toBe(getByTestId("drop").id)
  })

  it("reports hover changes", () => {
    const onHoverChange = jest.fn()
    const { getByText } = renderWithProviders(
      <Popover content="popover content" onHoverChange={onHoverChange}>
        <Text>popover target</Text>
      </Popover>
    )

    fireEvent.mouseOver(getByText("popover target"))
    expect(onHoverChange).toHaveBeenLastCalledWith(true)
    fireEvent.mouseLeave(getByText("popover target"))
    expect(onHoverChange).toHaveBeenLastCalledWith(false)
  })

  it("follows the controlled open prop", () => {
    const { queryByText, rerender } = renderWithProviders(
      <Popover content="popover content" open>
        <Text>popover target</Text>
      </Popover>
    )
    expect(queryByText("popover content")).toBeInTheDocument()

    rerender(
      <Popover content="popover content" open={false}>
        <Text>popover target</Text>
      </Popover>
    )
    expect(queryByText("popover content")).not.toBeInTheDocument()
  })
})
