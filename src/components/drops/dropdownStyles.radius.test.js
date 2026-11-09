import { dropdownRound } from "./dropdownStyles"

describe("dropdownRound", () => {
  it("rounds floating menus at 6px on the 4px sub-unit scale", () => {
    expect(dropdownRound * 4).toBe(6)
  })
})
