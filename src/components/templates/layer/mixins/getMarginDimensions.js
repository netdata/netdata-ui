import { getDimension } from "@/mixins/utils"

const blank = { top: "0", right: "0", bottom: "0", left: "0" }

export default (theme, margin) => {
  if (!Array.isArray(margin) || margin.length < 1 || margin.length > 4) {
    return blank
  }

  const dimensions = margin.map(size => getDimension(theme, size))

  if (dimensions.length === 1) {
    return { top: dimensions[0], right: dimensions[0], bottom: dimensions[0], left: dimensions[0] }
  }

  if (dimensions.length === 2) {
    return { top: dimensions[0], right: dimensions[1], bottom: dimensions[0], left: dimensions[1] }
  }

  if (dimensions.length === 3) {
    return { top: dimensions[0], right: dimensions[1], bottom: dimensions[2], left: dimensions[1] }
  }

  return { top: dimensions[0], right: dimensions[1], bottom: dimensions[2], left: dimensions[3] }
}
