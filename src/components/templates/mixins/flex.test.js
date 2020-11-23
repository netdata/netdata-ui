import flex from "./flex"

it("renders", () => {
  expect(flex({})).toBe("")
})

it("renders flex", () => {
  expect(flex({ flex: true })).toBe("flex: 1 1 auto;")
})

it("renders no flex", () => {
  expect(flex({ flex: false })).toBe("flex: 0 0 auto;")
})

it("renders flex grow", () => {
  expect(flex({ flex: "grow" })).toBe("flex: 1 0 auto;")
})

it("renders flex grow", () => {
  expect(flex({ flex: "shrink" })).toBe("flex: 0 1 auto;")
})

it("renders fixed flex", () => {
  expect(flex({ flex: 2 })).toBe("flex: 2 0 auto;")
})

it("renders configured flex", () => {
  expect(flex({ flex: { grow: 3, shrink: 1 } })).toBe("flex: 3 1 auto;")
})

it("renders basis", () => {
  expect(flex({ basis: "50%" })).toBe("flex-basis: 50%;")
})

it("renders flex and basis", () => {
  expect(flex({ flex: true, basis: "3px" })).toBe("flex: 1 1 3px;")
})
