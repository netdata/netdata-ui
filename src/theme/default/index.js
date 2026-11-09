import colors from "./colors"
import * as constants from "./constants"

const root = {
  name: "Default",
  version: "0.0.1",
}

export const DefaultTheme = {
  ...root,
  constants,
  colors,
  shadows: {
    segmentedSelected: `0 0 0 1px ${colors.segmentedBorder}, 0 1px 2px rgba(23, 32, 32, 0.14)`,
    segmentedAccentSelected: `inset 0 0 0 1px color-mix(in srgb, ${colors.segmentedAccentText} 30%, transparent)`,
  },
}
