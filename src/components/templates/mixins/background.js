import { getColor } from "src/theme"

export default ({ theme, background }) => {
  if (!background) return ""

  const value = getColor(background)({ theme })
  return value && `background-color: ${value};`
}
