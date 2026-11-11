import styled from "styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme"
import { focusRing, focusRingOutline, fieldFocusRing, fieldFocusWithinRing } from "@/index"

const Bar = styled.div`
  ${fieldFocusWithinRing}
`

describe("focus ring mixins from the package entry", () => {
  it("exports every focus ring", () => {
    ;[focusRing, focusRingOutline, fieldFocusRing, fieldFocusWithinRing].forEach(mixin =>
      expect(mixin).toBeDefined()
    )
  })

  it("draws the field ring when anything inside the wrapper has focus", () => {
    renderWithProviders(
      <Bar data-testid="bar">
        <input />
      </Bar>
    )
    const bar = screen.getByTestId("bar")
    expect(bar).toHaveStyleRule("border-color", DefaultTheme.colors.primary, {
      modifier: ":focus-within",
    })
    expect(bar).toHaveStyleRule("box-shadow", `inset 0 0 0 1px ${DefaultTheme.colors.primary}`, {
      modifier: ":focus-within",
    })
  })
})
