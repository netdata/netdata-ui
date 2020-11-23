export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  gap,
  column,
  columnReverse,
}) => {
  if (typeof gap !== "number") {
    return ""
  }

  const direction = column || columnReverse ? "bottom" : "right"
  return `
    &> *:not(:last-child) {
      margin-${direction}: ${baseUnit * gap}px;
    }
  `
}
