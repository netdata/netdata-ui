import { dropdownBorder, dropdownRound, withDropdownDefaults } from "./dropdownStyles"

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

  it("leaves other backgrounds untouched", () => {
    const props = { background: "tooltip" }
    expect(withDropdownDefaults(props)).toBe(props)
  })
})
