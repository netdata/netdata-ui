import { getDimensions } from "@/mixins/utils"

export default ({ theme, padding }) => {
  if (!padding) return ""

  if (Array.isArray(padding) && padding.length >= 1 && padding.length <= 4) {
    return `padding: ${getDimensions(theme, padding)};`
  }

  console.error("Please provide an array (max 4 elements) for `padding` style helper.")

  return ""
}
