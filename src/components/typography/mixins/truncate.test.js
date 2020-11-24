import truncate from "./truncate"

it("renders nothing", () => {
  expect(truncate({})).toBe(undefined)
})

it("renders truncate", () => {
  expect(truncate({ truncate: true })).toBe(`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`)
})
