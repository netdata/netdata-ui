import direction from "./direction"

it("renders", () => {
  expect(direction({})).toBe("flex-direction: row;")
})

it("renders column", () => {
  expect(direction({ column: true })).toBe("flex-direction: column;")
})

it("renders column reverse", () => {
  expect(direction({ columnReverse: true })).toBe("flex-direction: column-reverse;")
})

it("renders row reverse", () => {
  expect(direction({ rowReverse: true })).toBe("flex-direction: row-reverse;")
})
