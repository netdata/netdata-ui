import createTheme from "../generic"

// System info. Mostly needed for storybook.
const root = {
  name: "MockTheme-2",
  version: "0.0.1",
  fontColor: "red",
}

export const MockTheme2 = [{}].reduce((acc, current) => createTheme(acc, current), root)
