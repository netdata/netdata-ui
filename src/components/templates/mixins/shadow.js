import { getColor } from "src/theme"

export default ({ boxShadow, theme }) => {
  if (!boxShadow) return ""

  const color = boxShadow.color ? getColor(boxShadow.color)({ theme }) : ""
  const size = boxShadow.size ? boxShadow.size : ""
  return `box-shadow:${size} ${color}`
}
