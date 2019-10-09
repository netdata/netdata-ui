import createTheme from "../generic"

// System info. Mostly needed for storybook.
const root = {
  name: "MockTheme",
  version: "0.0.1",
  fontColor: "black",
}

export const MockTheme = [{}].reduce((acc, current) => createTheme(acc, current), root)
