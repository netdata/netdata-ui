import styled from "styled-components"
import { renderWithProviders } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import Flex from "@/components/templates/flex"
import {
  dropdownBorder,
  dropdownRound,
  withDropdownDefaults,
  floatingShadow,
  floatingDropShadow,
} from "./dropdownStyles"

describe("withDropdownDefaults", () => {
  it("adds the dropdown border and radius to dropdown backgrounds", () => {
    expect(withDropdownDefaults({ background: "dropdown", padding: [2] })).toEqual({
      background: "dropdown",
      padding: [2],
      border: dropdownBorder,
      round: dropdownRound,
    })
  })

  it("keeps explicit border and radius overrides", () => {
    expect(withDropdownDefaults({ background: "dropdown", border: false, round: 2 })).toEqual({
      background: "dropdown",
      border: false,
      round: 2,
    })
  })

  it("rounds a rendered dropdown surface at 6px", () => {
    const { getByTestId } = renderWithProviders(
      <Flex data-testid="surface" {...withDropdownDefaults({ background: "dropdown" })} />
    )

    expect(getByTestId("surface")).toHaveStyleRule("border-radius", "6px")
  })

  it("leaves other backgrounds untouched", () => {
    const props = { background: "tooltip" }
    expect(withDropdownDefaults(props)).toBe(props)
  })
})

describe("floating layer shadow", () => {
  const Floating = styled.div`
    ${floatingShadow}
  `
  const FloatingSilhouette = styled.div`
    ${floatingDropShadow}
  `

  it.each([
    ["light", DefaultTheme],
    ["dark", DarkTheme],
  ])("uses the theme dropdownShadow token in %s", (_, theme) => {
    const { getByTestId } = renderWithProviders(<Floating data-testid="floating" />, { theme })
    const shadow = theme.colors.dropdownShadow

    expect(getByTestId("floating")).toHaveStyleRule(
      "box-shadow",
      `0 4px 12px ${shadow},0 1px 2px ${shadow}`
    )
  })

  it("offers the same recipe as a silhouette filter for shapes with arrows", () => {
    const { getByTestId } = renderWithProviders(<FloatingSilhouette data-testid="floating" />)
    const shadow = DefaultTheme.colors.dropdownShadow

    expect(getByTestId("floating")).toHaveStyleRule(
      "filter",
      `drop-shadow(0 4px 12px ${shadow}) drop-shadow(0 1px 2px ${shadow})`
    )
  })
})
