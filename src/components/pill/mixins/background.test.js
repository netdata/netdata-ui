import getPillBackground, { getMasterCardBackground } from "./background"

describe("getMasterCardBackground mixin", () => {
  test("should return warning color", () => {
    expect(getMasterCardBackground(undefined, "warning")).toEqual(["yellow", "seaBuckthorn"])
  })

  test("should return background", () => {
    const mockedBackground = "main"
    expect(getMasterCardBackground(mockedBackground)).toEqual(mockedBackground)
  })
})

describe("getPillBackground mixin", () => {
  const mockedNetdata = "#00AB44"
  const mockedPorcelain = "#fff"
  const mockedRegentgrey = "#fff"
  const mockedTheme = {
    colors: {
      green: {
        netdata: mockedNetdata,
      },
      neutral: {
        porcelain: mockedPorcelain,
        regentgrey: mockedRegentgrey,
      },
    },
  }

  test("should return default background color", () => {
    expect(getPillBackground({ theme: mockedTheme })).toEqual(
      `background-color: ${mockedRegentgrey};`
    )
  })

  test("should return hollow default background color", () => {
    expect(getPillBackground({ hollow: true, theme: mockedTheme })).toEqual(
      `background-color: ${mockedPorcelain};`
    )
  })

  test("should return success flavour background color", () => {
    expect(getPillBackground({ flavour: "success", theme: mockedTheme })).toEqual(
      `background-color: ${mockedNetdata};`
    )
  })

  test("should return undefined", () => {
    expect(getPillBackground({ background: "main" })).toEqual(undefined)
  })
})
