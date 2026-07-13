import clamp from "lodash/clamp"

export const normalizeWindowRange = ({ startIndex = 0, endIndex = startIndex }, count) => {
  const start = clamp(startIndex, 0, count)
  const end = clamp(Math.max(start, endIndex), start, count)

  return { startIndex: start, endIndex: end }
}

export const containsWindowRange = (windowRange, range) =>
  range.startIndex >= windowRange.startIndex && range.endIndex <= windowRange.endIndex

export const getBufferedWindowRange = (range, count, buffer = 50) =>
  normalizeWindowRange(
    {
      startIndex: range.startIndex - buffer,
      endIndex: range.endIndex + buffer,
    },
    count
  )

export const getWindowPublication = (source, range) => {
  const normalized = normalizeWindowRange(range, source.getRowCount())
  const rows = []
  const rowIds = []

  for (let index = normalized.startIndex; index < normalized.endIndex; index += 1) {
    rows.push(source.getRow(index))
    rowIds.push(source.getRowId(index))
  }

  return { ...normalized, rows, rowIds }
}
