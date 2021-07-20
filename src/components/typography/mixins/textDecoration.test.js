import textDecoration from "./textDecoration"

it("renders nothing", () => {
  expect(textDecoration({})).toBe(false)
})

it("decorates with underline", () => {
  expect(textDecoration({ textDecoration: "underline" })).toBe("text-decoration: underline;")
})

it("decorates with none", () => {
  expect(textDecoration({ textDecoration: "none" })).toBe("text-decoration: none;")
})

it("decorates with line-through", () => {
  expect(textDecoration({ textDecoration: "line-through" })).toBe("text-decoration: line-through;")
})

it("doesnt decorate on invalid value", () => {
  expect(textDecoration({ textDecoration: "funny-decoration" })).toBe(false)
})
