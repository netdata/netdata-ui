import disabled from "./disabled"

it("renders", () => {
  expect(disabled({})).toBe(`
  pointer-events: auto;
  cursor: pointer;
`)
})

it("renders disabled", () => {
  expect(disabled({ disabled: true })).toBe(`
  pointer-events: none;
  cursor: default;
`)
})
