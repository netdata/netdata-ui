import wrap from "./wrap"

it("renders", () => {
  expect(wrap({})).toBe("")
})

it("renders wrap", () => {
  expect(wrap({ flexWrap: true })).toBe("flex-wrap: wrap;")
})

it("renders nowrap", () => {
  expect(wrap({ flexWrap: false })).toBe("flex-wrap: nowrap;")
})

it("renders reverse", () => {
  expect(wrap({ flexWrap: "reverse" })).toBe("flex-wrap: reverse;")
})

it("renders invalid", () => {
  expect(wrap({ flexWrap: "invalid" })).toBe("")
})
