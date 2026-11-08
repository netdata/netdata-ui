import { DarkTheme, DefaultTheme, getColor } from "./index"

describe("editor syntax, threshold and chart palette", () => {
  it.each([
    ["syntaxKey", "#1d6470", "#93c9cb"],
    ["syntaxNumber", "#8a2aa8", "#d79bf2"],
    ["syntaxParen1", "#b0306a", "#f38bc0"],
    ["syntaxParen2", "#6b6b00", "#c8c86b"],
    ["syntaxParen3", "#4f5f86", "#a8b4dc"],
    ["linkedContentBackground", "#ebf4f4", "#22393a"],
    ["errorContentBackground", "#fceef0", "#3a1d22"],
    ["thresholdWarningText", "#5a3500", "#1f1300"],
    ["thresholdCriticalText", "#4d0610", "#ffdfe3"],
    ["chartSeries1", "#1d6470", "#93c9cb"],
    ["chartSeries2", "#6b4fbf", "#a58be0"],
    ["chartSeries3", "#5b6b7a", "#b4c0cc"],
    ["chartSeries4", "#9c4f78", "#d58fb0"],
    ["chartWarningLine", "#df8400", "#bf7100"],
    ["chartMutedLine", "#bfc9c9", "#4d5c5c"],
  ])("resolves %s without changing either editor theme", (token, light, dark) => {
    expect([DefaultTheme, DarkTheme].map(theme => getColor(token)({ theme }))).toEqual([
      light,
      dark,
    ])
  })
})
