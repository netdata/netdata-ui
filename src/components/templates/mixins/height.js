export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  height,
}) => {
  if (typeof height === "object") {
    const { min = "", max = "" } = height
    return `
      ${min && `min-height: ${typeof min === "number" ? `${baseUnit * min}px` : min};`}
      ${max && `max-height: ${typeof max === "number" ? `${baseUnit * max}px` : max};`}
    `
  }

  return height && `height: ${typeof height === "number" ? `${baseUnit * height}px` : height};`
}
