import { getOrElse } from "@/theme/utils"
import { CONTROL_SIZES } from "@/theme/default/constants"

const getSizes = getOrElse(["constants", "CONTROL_SIZES"], CONTROL_SIZES)

// Buttons use boolean `large`/`compact`; fields use `size`. Both resolve to the same ladder.
export const controlSizeOf = ({ size, large, compact } = {}) => {
  if (large || size === "large") return "large"
  if (compact || size === "compact") return "compact"
  return "default"
}

const pick = (key, size) => props => {
  const sizes = getSizes(props)
  return `${(sizes[size] || sizes.default)[key]}px`
}

export const controlHeight = size => pick("height", size)

export const controlFontSize = size => pick("fontSize", size)
