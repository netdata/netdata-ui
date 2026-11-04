import { getOrElse } from "@/theme/utils"

const fallback = {
  compact: { height: 24, fontSize: 12 },
  default: { height: 28, fontSize: 13 },
  large: { height: 32, fontSize: 14 },
}

const getSizes = getOrElse(["constants", "CONTROL_SIZES"], fallback)

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
