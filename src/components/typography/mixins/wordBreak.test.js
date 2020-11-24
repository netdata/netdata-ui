import wordBreak from "./wordBreak"

it("renders nothing", () => {
  expect(wordBreak({})).toBe(false)
})

it("renders normal", () => {
  expect(wordBreak({ wordBreak: "normal" })).toBe("word-break: normal;")
})

it("renders break-all", () => {
  expect(wordBreak({ wordBreak: "break-all" })).toBe("word-break: break-all;")
})

it("renders keep-all", () => {
  expect(wordBreak({ wordBreak: "keep-all" })).toBe("word-break: keep-all;")
})

it("renders break-word", () => {
  expect(wordBreak({ wordBreak: "break-word" })).toBe("word-break: break-word;")
})
