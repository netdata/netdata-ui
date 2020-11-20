import alignSelf from "./alignSelf"

it("renders nothing", () => {
  expect(alignSelf({})).toBe(false)
})

it("renders start", () => {
  expect(alignSelf({ alignSelf: "start" })).toBe("align-self: flex-start;")
})

it("renders center", () => {
  expect(alignSelf({ alignSelf: "center" })).toBe("align-self: center;")
})

it("renders end", () => {
  expect(alignSelf({ alignSelf: "end" })).toBe("align-self: flex-end;")
})

it("renders stretch", () => {
  expect(alignSelf({ alignSelf: "stretch" })).toBe("align-self: stretch;")
})
