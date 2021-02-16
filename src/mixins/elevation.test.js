import elevation from "./elevation"

it("renders", () => {
  expect(elevation({})).toBe(undefined)
})

it("renders z-index", () => {
  expect(elevation({ elevation: 1000 })).toBe("z-index: 1000;")
})

it("renders invalid z-index", () => {
  expect(elevation({ elevation: "invalid" })).toBe(undefined)
})
