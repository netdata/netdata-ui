import justifyContent from "./justifyContent"

it("renders", () => {
  expect(justifyContent({})).toBe("")
})

it("renders between", () => {
  expect(justifyContent({ justifyContent: "between" })).toBe("justify-content: space-between;")
})

it("renders invalid", () => {
  expect(justifyContent({ justifyContent: "invalid" })).toBe("")
})
