import { getMasterCardColor, getPillColor } from "./colors"

export const getMasterCardBackground = (background, flavour) =>
  background || getMasterCardColor(flavour)

const getPillBackground = ({ background, flavour = "neutral", hollow }) => {
  if (background) return background
  const type = hollow ? "hollow" : "background"
  return getPillColor(type, flavour)
}

export default getPillBackground
