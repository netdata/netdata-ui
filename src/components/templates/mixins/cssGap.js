const resolve = (value, baseUnit) => {
  if (typeof value === "string") return value
  if (typeof value === "number") return `${baseUnit * value}px`
  return null
}

export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  gap: gapX,
  gapY,
}) => {
  const x = resolve(gapX, baseUnit)
  const y = resolve(gapY, baseUnit)

  if (x === null && y === null) return ""
  if (y === null) return `gap: ${x};`
  if (x === null) return `row-gap: ${y};`
  return `gap: ${y} ${x};`
}
