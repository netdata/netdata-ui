import { DarkTheme, DefaultTheme, getColor, getRgbColor } from "./index"

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

describe("editor surface tokens", () => {
  it.each([
    ["editorAccent", "#1d6470", "#93c9cb"],
    ["modalBackdrop", "rgba(0, 0, 0, 0.28)", "rgba(0, 0, 0, 0.5)"],
    ["dialogShadow", "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.5)"],
    ["stripShadow", "rgba(0, 0, 0, 0.18)", "rgba(0, 0, 0, 0.7)"],
    ["logoTileBackground", "#F6F7F7", "#C2CAC4"],
    ["searchMatchBackground", "rgba(113, 128, 115, 0.12)", "rgba(152, 166, 157, 0.2)"],
  ])("resolves %s in each theme", (token, light, dark) => {
    expect(getColor(token)({ theme: DefaultTheme })).toBe(light)
    expect(getColor(token)({ theme: DarkTheme })).toBe(dark)
  })
})

describe("threshold tint tokens", () => {
  it.each([
    ["thresholdWarningBand", "warningBackground", 0.8, 0.32],
    ["thresholdWarningZone", "warningBackground", 0.4, 0.15],
    ["thresholdCriticalBand", "errorBackground", 0.35, 0.55],
    ["thresholdCriticalZone", "errorBackground", 0.18, 0.28],
  ])("resolves %s from %s in each theme", (token, base, lightAlpha, darkAlpha) => {
    expect(getColor(token)({ theme: DefaultTheme })).toBe(
      getRgbColor(base, lightAlpha)({ theme: DefaultTheme })
    )
    expect(getColor(token)({ theme: DarkTheme })).toBe(
      getRgbColor(base, darkAlpha)({ theme: DarkTheme })
    )
  })
})
