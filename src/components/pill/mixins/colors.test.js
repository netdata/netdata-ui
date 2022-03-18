import { getMasterCardColor, getPillColor } from "./colors"

describe("getMasterCardColor mixin", () => {
  test("should return warning color", () => {
    expect(getMasterCardColor("warning")).toEqual(["yellow", "seaBuckthorn"])
  })
})

describe("getPillColor mixin", () => {
  test("should return success background color", () => {
    expect(getPillColor("background", "success")).toEqual(["green", "netdata"])
  })
})