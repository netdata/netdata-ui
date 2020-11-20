import height from "./height"

it("renders", () => {
  expect(height({})).toBe(undefined)
})

it("renders value", () => {
  expect(height({ height: "10rem" })).toBe("height: 10rem;")
})

it("renders min max", () => {
  expect(height({ height: { min: "20rem", max: "45rem" } })).toBe(`
      min-height: 20rem;
      max-height: 45rem;
    `)
})

it("renders max", () => {
  expect(height({ height: { max: "45rem" } }).trim()).toBe("max-height: 45rem;")
})

it("renders min", () => {
  expect(height({ height: { min: "20rem" } }).trim()).toBe("min-height: 20rem;")
})
