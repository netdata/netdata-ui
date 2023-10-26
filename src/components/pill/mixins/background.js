import { getMasterCardColor, getPillColor } from "./colors"

export const getMasterCardBackground = (background, flavour) =>
  background || getMasterCardColor(flavour)

const getPillBackground = ({ background, flavour = "neutral", hollow, semi }) => {
  if (background) return background
  if (hollow) return semi ? getPillColor("hollow", flavour) : "transparent"

  return getPillColor("background", flavour)
}

export default getPillBackground
