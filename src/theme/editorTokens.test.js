import { DarkTheme, DefaultTheme, getColor } from "./index"

describe("editor chip tokens", () => {
  it.each([
    ["labelTokenBackground", "#e2ecec", "#24393b"],
    ["labelTokenBorder", "#c4d4d4", "#3f5a5b"],
    ["labelTokenText", "#1a5560", "#a8d5d7"],
    ["patternTokenBackground", "#dcefec", "#163a3c"],
    ["patternTokenBorder", "#a6d0ca", "#2c6468"],
    ["patternTokenText", "#0e545a", "#a8e1dc"],
    ["patternTokenMark", "#08767d", "#62d6ce"],
    ["negatedTokenBackground", "#ebe4f7", "#30284b"],
    ["negatedTokenBorder", "#cbbce9", "#58498a"],
    ["negatedTokenText", "#47307f", "#d6c9fc"],
    ["negatedTokenMark", "#6544b0", "#b6a0f8"],
  ])("resolves %s to the existing editor chip color in each theme", (token, light, dark) => {
    expect(getColor(token)({ theme: DefaultTheme })).toBe(light)
    expect(getColor(token)({ theme: DarkTheme })).toBe(dark)
  })
})
