import getPillWidth from "./width"

describe("getPillWidth mixin", () => {
  test("should return width attribute", () => {
    const mockedWidth = "10px"
    expect(getPillWidth(mockedWidth, true)).toEqual(mockedWidth)
  })

  test("should return width for tiny pill", () => {
    expect(getPillWidth(undefined, true)).toEqual("8px")
  })

  test("should not return width", () => {
    const mockedTiny = undefined
    expect(getPillWidth(undefined, mockedTiny)).toEqual(mockedTiny)
  })
})
