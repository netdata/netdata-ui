import colors from "./colors"
import * as constants from "./constants"

const root = {
  name: "Dark",
  version: "0.0.1",
}

export const DarkTheme = {
  ...root,
  constants,
  colors,
  shadows: {
    segmentedSelected: "none",
    segmentedAccentSelected: `inset 0 0 0 1px color-mix(in srgb, ${colors.segmentedAccentText} 30%, transparent)`,
  },
}
