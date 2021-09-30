import whiteSpace from "./whiteSpace"

it("renders nothing", () => {
  expect(whiteSpace({})).toBe(false)
})

it("renders normal", () => {
  expect(whiteSpace({ whiteSpace: "normal" })).toBe("white-space: normal;")
})

it("renders nowrap", () => {
  expect(whiteSpace({ whiteSpace: "nowrap" })).toBe("white-space: nowrap;")
})

it("renders pre-line", () => {
  expect(whiteSpace({ whiteSpace: "pre-line" })).toBe("white-space: pre-line;")
})
