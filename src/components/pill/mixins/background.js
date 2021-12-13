import { getColor } from "src/theme"
import getPillColor from "./colors"

const getPillBackground = ({ theme, background, flavour = "neutral", hollow }) => {
  if (background) return
  const type = hollow ? "hollow" : "background"
  const value = getColor(getPillColor(type, flavour))({ theme })
  return `background-color: ${value};`
}

export default getPillBackground
