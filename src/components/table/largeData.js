const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

const normalizeRange = ({ startIndex = 0, endIndex = startIndex }, count) => {
  const start = clamp(startIndex, 0, count)
  const end = clamp(Math.max(start, endIndex), start, count)

  return { startIndex: start, endIndex: end }
}

export const containsWindowRange = (windowRange, range) =>
  range.startIndex >= windowRange.startIndex && range.endIndex <= windowRange.endIndex

export const getBufferedWindowRange = (range, count, buffer = 50) =>
  normalizeRange(
    {
      startIndex: range.startIndex - buffer,
      endIndex: range.endIndex + buffer,
    },
    count
  )

export const getVirtualWindowRange = (virtualItems, count) => {
  let startIndex
  let endIndex

  virtualItems.forEach(item => {
    if (item.index === 0) return
    const index = item.index - 1
    startIndex = startIndex === undefined ? index : Math.min(startIndex, index)
    endIndex = endIndex === undefined ? index + 1 : Math.max(endIndex, index + 1)
  })

  return normalizeRange({ startIndex, endIndex }, count)
}

export const getWindowPublication = (source, range) => {
  const normalized = normalizeRange(range, source.getRowCount())
  const rows = []
  const rowIds = []

  for (let index = normalized.startIndex; index < normalized.endIndex; index += 1) {
    rows.push(source.getRow(index))
    rowIds.push(source.getRowId(index))
  }

  return { ...normalized, rows, rowIds }
}
