import position from "./position"

it("renders", () => {
  expect(position({})).toBe("")
})

it("renders relative position", () => {
  expect(position({ position: "relative" })).toBe(`position: relative;`)
})
