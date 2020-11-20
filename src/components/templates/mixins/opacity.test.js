import styledOpacity from "./opacity"

it("renders", () => {
  expect(styledOpacity({})).toBe("")
})

it("renders weak opacity", () => {
  expect(styledOpacity({ opacity: "weak" })).toBe(`opacity: 0.2;`)
})

it("renders invalid opacity", () => {
  expect(styledOpacity({ opacity: "invalid" })).toBe("")
})
