import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme"
import DropContainer from "./container"

const renderText = props => renderWithProviders(<DropContainer {...props}>Refresh</DropContainer>)

describe("DropContainer string children", () => {
  it("uses tooltip ink on the default tooltip surface", () => {
    renderText()

    expect(screen.getByText("Refresh")).toHaveStyleRule("color", DefaultTheme.colors.tooltipText)
  })

  it("keeps tooltip ink on any custom surface", () => {
    renderText({ background: "primary" })

    expect(screen.getByText("Refresh")).toHaveStyleRule("color", DefaultTheme.colors.tooltipText)
  })

  it("uses body ink only on the dropdown surface", () => {
    renderText({ background: "dropdown" })

    expect(screen.getByText("Refresh")).toHaveStyleRule("color", DefaultTheme.colors.text)
  })

  it("renders node children untouched", () => {
    renderWithProviders(
      <DropContainer>
        <b>bold</b>
      </DropContainer>
    )

    expect(screen.getByText("bold").tagName).toBe("B")
  })
})

describe("DropContainer arrow", () => {
  // Tooltips draw no arrow, but DropContainer keeps one for consumers that pass `align`.
  it.each([
    ["top", "-1px 0 0 0"],
    ["bottom", "0 0 -1px 0"],
    ["right", "0 -1px 0 0"],
    ["left", "0 0 0 -1px"],
  ])("tucks the %s arrow 1px into the bubble so no seam shows", (align, margin) => {
    const { getByTestId } = renderWithProviders(<DropContainer align={align}>tip</DropContainer>)
    expect(getByTestId("drop-arrow")).toHaveStyleRule("margin", margin)
    expect(getByTestId("drop-arrow")).toHaveStyleRule("fill", DefaultTheme.colors.tooltip)
  })
})
