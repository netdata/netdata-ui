import { getMasterCardColor, getPillColor } from "./colors"
import { getSoftTone } from "./soft"

export const getMasterCardBackground = (background, flavour) =>
  background || getMasterCardColor(flavour)

const getPillBackground = ({ background, flavour = "neutral", look }) => {
  if (background) return { background }
  if (look === "hollow") return { background: ["transparent", "full"] }
  if (look === "semi") return { background: getPillColor("hollow", flavour) }
  if (look === "soft") {
    const { fill, fillOpacity } = getSoftTone(flavour)
    return { background: fill, backgroundOpacity: fillOpacity }
  }

  return { background: getPillColor("background", flavour) }
}

export default getPillBackground
