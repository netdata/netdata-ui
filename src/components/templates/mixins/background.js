import { getColor, getRgbColor } from "@/theme"

export default ({ theme, background, backgroundOpacity }) => {
  if (!background) return ""

  const value = backgroundOpacity
    ? getRgbColor(background, backgroundOpacity)({ theme })
    : getColor(background)({ theme })

  return value && `background-color: ${value};`
}
