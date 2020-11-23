import textAlign from "./textAlign"

it("renders nothing", () => {
  expect(textAlign({})).toBe(false)
})

it("aligns left", () => {
  expect(textAlign({ textAlign: "left" })).toBe("text-align: left;")
})

it("aligns center", () => {
  expect(textAlign({ textAlign: "center" })).toBe("text-align: center;")
})

it("aligns right", () => {
  expect(textAlign({ textAlign: "right" })).toBe("text-align: right;")
})
