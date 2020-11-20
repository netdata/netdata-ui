import width from "./width"

it("renders", () => {
  expect(width({})).toBe(undefined)
})

it("renders value", () => {
  expect(width({ width: "10rem" })).toBe("width: 10rem;")
})

it("renders min max", () => {
  expect(width({ width: { min: "20rem", max: "45rem" } })).toBe(`
      min-width: 20rem;
      max-width: 45rem;
    `)
})

it("renders max", () => {
  expect(width({ width: { max: "45rem" } }).trim()).toBe("max-width: 45rem;")
})

it("renders min", () => {
  expect(width({ width: { min: "20rem" } }).trim()).toBe("min-width: 20rem;")
})
