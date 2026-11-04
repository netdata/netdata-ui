import React from "react"
import { renderWithProviders } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { Text } from "@/components/typography"
import { TooltipInk } from "@/index"

describe("TooltipInk", () => {
  it.each([
    ["light", DefaultTheme],
    ["dark", DarkTheme],
  ])("inks text, textLite and textDescription with tooltipText in %s", (_, theme) => {
    const { getByText } = renderWithProviders(
      <TooltipInk>
        <Text>main</Text>
        <Text color="textLite">lite</Text>
        <Text color="textDescription">description</Text>
      </TooltipInk>,
      { theme }
    )

    ;["main", "lite", "description"].forEach(label =>
      expect(getByText(label)).toHaveStyleRule("color", theme.colors.tooltipText)
    )
  })

  it("leaves other colours untouched", () => {
    const { getByText } = renderWithProviders(
      <TooltipInk>
        <Text color="primary">accent</Text>
      </TooltipInk>
    )

    expect(getByText("accent")).toHaveStyleRule("color", DefaultTheme.colors.primary)
  })
})
