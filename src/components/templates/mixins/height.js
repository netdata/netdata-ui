export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  height,
}) => {
  if (typeof height === "object") {
    const { min = "", max = "", base = "" } = height
    return `
      ${min && `min-height: ${typeof min === "number" ? `${baseUnit * min}px` : min};`}
      ${max && `max-height: ${typeof max === "number" ? `${baseUnit * max}px` : max};`}
      ${base && `height: ${typeof base === "number" ? `${baseUnit * base}px` : base};`}
    `
  }

  return height && `height: ${typeof height === "number" ? `${baseUnit * height}px` : height};`
}
