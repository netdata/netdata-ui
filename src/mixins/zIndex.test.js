import zIndex from "./zIndex"

it("renders", () => {
  expect(zIndex({})).toBe(undefined)
})

it("renders z-index", () => {
  expect(zIndex({ zIndex: 1000 })).toBe("z-index: 1000;")
})

it("renders invalid z-index", () => {
  expect(zIndex({ zIndex: "invalid" })).toBe(undefined)
})
