import { defaultColumnSizing } from "@tanstack/react-table"

const visibleLeaves = columns =>
  columns.flatMap(column => (column.columns ? visibleLeaves(column.columns) : [column]))

export const fitColumnWidths = (columns, viewportWidth, visibility, pinning, manualSizing) => {
  const { size, minSize, maxSize } = defaultColumnSizing
  const pinned = new Set([...(pinning.left || []), ...(pinning.right || [])])
  const leaves = visibleLeaves(columns)
    .filter(({ id }) => visibility[id] !== false)
    .map(column => {
      const { id, notFlex } = column
      const maximum = column.maxSize ?? maxSize
      const minimum = Math.min(column.minSize ?? minSize, maximum)
      const manual = Number.isFinite(manualSizing[id])
      const preferred = manual ? manualSizing[id] : (column.size ?? size)
      return {
        id,
        maximum,
        minimum,
        width: Math.min(Math.max(preferred, minimum), maximum),
        fixed: manual || pinned.has(id) || notFlex,
      }
    })

  const occupied = leaves.reduce((sum, column) => sum + column.width, 0)
  let remaining = Math.abs(Math.round(viewportWidth - occupied))
  const direction = viewportWidth >= occupied ? 1 : -1
  const capacity = column =>
    direction === 1 ? column.maximum - column.width : column.width - column.minimum
  let flexible = leaves.filter(column => !column.fixed && capacity(column) > 0)

  while (remaining > 0 && flexible.length) {
    const share = Math.max(1, Math.floor(remaining / flexible.length))
    for (const column of flexible) {
      const change = Math.min(share, capacity(column), remaining)
      column.width += direction * change
      remaining -= change
    }
    flexible = flexible.filter(column => capacity(column) > 0)
  }

  const center = leaves.filter(column => !pinned.has(column.id))
  const pinnedWidth = leaves.reduce(
    (sum, column) => (pinned.has(column.id) ? sum + column.width : sum),
    0
  )
  return {
    sizes: Object.fromEntries(leaves.map(({ id, width }) => [id, width])),
    suspendPins:
      pinnedWidth > 0 &&
      center.length > 0 &&
      viewportWidth - pinnedWidth < Math.min(...center.map(column => column.minimum)),
  }
}
