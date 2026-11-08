import { defaultRangeExtractor } from "@tanstack/react-virtual"

export const virtualRangeWithIndex = (range, index) => {
  const visible = defaultRangeExtractor(range)
  return index >= 0 && index < range.count && !visible.includes(index)
    ? [...visible, index].sort((a, b) => a - b)
    : visible
}
