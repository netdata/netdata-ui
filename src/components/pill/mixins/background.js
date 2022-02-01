import { getColor } from "src/theme"
import { getMasterCardColor, getPillColor } from "./colors"

export const getMasterCardBackground = (background, flavour) => background || getMasterCardColor(flavour)

const getPillBackground = ({ theme, background, flavour = "neutral", hollow }) => {
  if (background) return
  const type = hollow ? "hollow" : "background"
  const value = getColor(getPillColor(type, flavour))({ theme })
  return `background-color: ${value};`
}

export default getPillBackground
