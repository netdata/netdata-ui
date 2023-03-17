import getPillBackground, { getMasterCardBackground } from "./background"

describe("getMasterCardBackground mixin", () => {
  test("should return warning color", () => {
    expect(getMasterCardBackground(undefined, "warning")).toEqual("warningLite")
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
    expect(getPillBackground({ hollow: true, theme: {} })).toEqual(
      `background-color: nodeBadgeBackground;`
    )
  })

  test("should return success flavour background color", () => {
    expect(getPillBackground({ flavour: "success", theme: {} })).toEqual(
      `background-color: green,netdata;`
    )
  })
})
