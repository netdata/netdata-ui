import * as kit from "./index"

// New public pieces from the refresh must be importable from the package root.
it.each(["StatusWord", "MarkCounts", "useRovingFocus"])("exports %s from the package root", name => {
  expect(typeof kit[name]).toBe("function")
})
