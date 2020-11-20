import overflow from "./overflow"

it("renders", () => {
  expect(overflow({})).toBe("")
})

it("renders overflow", () => {
  expect(overflow({ overflow: "scroll" })).toBe("overflow: scroll;")
})

it("renders overflow vertical", () => {
  expect(overflow({ overflow: { vertical: "scroll" } }).trim()).toBe("overflow-y: scroll;")
})

it("renders overflow horizontal", () => {
  expect(overflow({ overflow: { horizontal: "scroll" } }).trim()).toBe("overflow-x: scroll;")
})

it("renders overflow both axis", () => {
  expect(overflow({ overflow: { horizontal: "scroll", vertical: "auto" } })).toBe(`
    overflow-y: auto;
    overflow-x: scroll;
  `)
})
