import getPillPadding from "./padding"

describe("getPillPadding mixin", () => {
  test("should return padding attribute", () => {
    const mockedPadding = [2]
    expect(getPillPadding(mockedPadding, "large", true)).toEqual(mockedPadding)
  })

  test("should return padding for tiny pill", () => {
    expect(getPillPadding(undefined, "large", true)).toEqual([0])
  })

  test("should return padding for large sized pill", () => {
    expect(getPillPadding(undefined, "large", undefined)).toEqual([1, 3])
  })

  test("should return default height", () => {
    expect(getPillPadding(undefined, undefined, undefined)).toEqual([1, 2])
  })
})
