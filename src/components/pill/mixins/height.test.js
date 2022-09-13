import getPillHeight from "./height"

describe("getPillHeight mixin", () => {
  test("should return height attribute", () => {
    const mockedHeight = "30px"
    expect(getPillHeight(mockedHeight, "large", true)).toEqual(mockedHeight)
  })

  test("should return height for tiny pill", () => {
    expect(getPillHeight(undefined, "large", true)).toEqual("8px")
  })

  test("should return height for large sized pill", () => {
    expect(getPillHeight(undefined, "large", undefined)).toEqual("22px")
  })

  test("should return default height", () => {
    expect(getPillHeight(undefined, undefined, undefined)).toEqual("18px")
  })
})
