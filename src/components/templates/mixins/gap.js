const makeDirection = ({ column, columnReverse, rowReverse }) => {
  return column || columnReverse ? "bottom" : rowReverse ? "left" : "right"
}
export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  gap,
  column,
  columnReverse,
  rowReverse,
}) => {
  if (typeof gap !== "number") {
    return ""
  }

  const direction = makeDirection({ column, columnReverse, rowReverse })
  return `
    &> *:not(:last-child) {
      margin-${direction}: ${baseUnit * gap}px;
    }
  `
}
