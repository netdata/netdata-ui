import { getColor, getRgbColor } from "@/theme"

export default ({ theme, background, backgroundOpacity }) => {
  if (!background) return ""

  const value = backgroundOpacity
    ? getRgbColor(background, backgroundOpacity)({ theme })
    : getColor(background)({ theme })

  if (!value) return value

  return typeof value === "string" && value.startsWith("linear-gradient")
    ? `background: ${value};`
    : `background-color: ${value};`
}
