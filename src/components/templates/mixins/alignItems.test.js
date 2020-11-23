import alignItems from "./alignItems"

it("renders", () => {
  expect(alignItems({})).toBe("")
})

it("align content start", () => {
  expect(alignItems({ alignItems: "end" })).toBe("align-items: flex-end;")
})

it("align content invalid", () => {
  expect(alignItems({ alignItems: "invalid" })).toBe("")
})
