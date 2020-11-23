import alignContent from "./alignContent"

it("renders", () => {
  expect(alignContent({})).toBe("")
})

it("align content start", () => {
  expect(alignContent({ alignContent: "start" })).toBe("align-content: flex-start;")
})

it("align content invalid", () => {
  expect(alignContent({ alignContent: "invalid" })).toBe("")
})
