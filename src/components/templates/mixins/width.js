export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  width,
}) => {
  if (typeof width === "object") {
    const { min = "", max = "", base = "" } = width
    return `
      ${min && `min-width: ${typeof min === "number" ? `${baseUnit * min}px` : min};`}
      ${max && `max-width: ${typeof max === "number" ? `${baseUnit * max}px` : max};`}
      ${base && `width: ${typeof base === "number" ? `${baseUnit * base}px` : base};`}
    `
  }

  return width && `width: ${typeof width === "number" ? `${baseUnit * width}px` : width};`
}
