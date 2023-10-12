import { getDimensions } from "@/mixins/utils"

export default ({ theme, margin }) => {
  if (!margin) return ""

  if (Array.isArray(margin) && margin.length >= 1 && margin.length <= 4) {
    return `margin: ${getDimensions(theme, margin)};`
  }

  // eslint-disable-next-line no-console
  console.error("Please provide an array (max 4 elements) for `margin` style helper.")

  return ""
}
