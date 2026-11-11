import { renderWithProviders } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import TabSeparator from "./tabSeparator"

describe("TabSeparator", () => {
  it("draws a 16px divider in the shared border colour, centred in the strip", () => {
    const { container } = renderWithProviders(<TabSeparator />)
    const wrapper = container.firstChild
    const line = wrapper.firstChild

    expect(wrapper).toHaveStyleRule("align-items", "center")
    expect(line).toHaveStyleRule("width", "1px")
    expect(line).toHaveStyleRule("height", "16px")
    expect(line).toHaveStyleRule("background-color", DefaultTheme.colors.border)
  })
})
