export const getScrollInset = (element, { dimension = "width", includeBorder = false } = {}) => {
  const isWidth = dimension === "width"
  const inset = isWidth
    ? element.offsetWidth - element.clientWidth
    : element.offsetHeight - element.clientHeight
  if (includeBorder) return inset

  const style = getComputedStyle(element)
  const start = isWidth ? style.borderLeftWidth : style.borderTopWidth
  const end = isWidth ? style.borderRightWidth : style.borderBottomWidth
  return Math.max(0, inset - ((parseFloat(start) || 0) + (parseFloat(end) || 0)))
}
