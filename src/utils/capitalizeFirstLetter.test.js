import capitalizeFirstLetter from "./capitalizeFirstLetter"

describe("capitalizeFirstLetter util", () => {
  test("should return string with capitalized first letter", () => {
    const result = capitalizeFirstLetter("hello")
    expect(result).toEqual("Hello")
  })

  test("should return capitalized string with capitalized first letter only", () => {
    const result = capitalizeFirstLetter("HELLO", true)
    expect(result).toEqual("Hello")
  })
})
