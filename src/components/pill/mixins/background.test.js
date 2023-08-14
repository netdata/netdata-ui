import getPillBackground, { getMasterCardBackground } from "./background"

describe("getMasterCardBackground mixin", () => {
  test("should return warning color", () => {
    expect(getMasterCardBackground(undefined, "warning")).toEqual("warning")
  })

  test("should return background", () => {
    expect(getMasterCardBackground("main")).toEqual("main")
  })
})

describe("getPillBackground mixin", () => {
  test("should return default background color", () => {
    expect(getPillBackground({ theme: {} })).toEqual(`background-color: nodeBadgeBackground;`)
  })

  test("should return hollow default background color", () => {
    expect(getPillBackground({ hollow: true, theme: {} })).toEqual(`background-color: generic;`)
  })

  test("should return success flavour background color", () => {
    expect(getPillBackground({ flavour: "success", theme: {} })).toEqual(
      `background-color: green,green100;`
    )
  })
})
