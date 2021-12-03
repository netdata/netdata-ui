import textTransform from "./textTransform"

it("returns the default state", () => {
  expect(textTransform()).toBe("text-transform: none;")
})

it("returns text-transform: uppercase", () => {
  expect(textTransform({ textTransform: "uppercase" })).toBe("text-transform: uppercase;")
})

it("returns text-transform: lowercase", () => {
  expect(textTransform({ textTransform: "lowercase" })).toBe("text-transform: lowercase;")
})

it("returns text-transform: capitalize", () => {
  expect(textTransform({ textTransform: "capitalize" })).toBe("text-transform: capitalize;")
})

it("returns text-transform: full-width", () => {
  expect(textTransform({ textTransform: "fullWidth" })).toBe("text-transform: full-width;")
})

it("returns text-transform rule with lowercase value and then it transforms only the first letter of the text to uppercase", () => {
  expect(textTransform({ textTransform: "firstLetter" })).toBe(`text-transform: lowercase;
    &::first-letter {
      text-transform: uppercase;
    }
`)
})
