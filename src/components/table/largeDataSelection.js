export const getSelectedOriginalRows = (source, rowSelection) => {
  if (!Object.keys(rowSelection).length) return []

  const rows = []
  source.forEachRow((row, id) => {
    if (rowSelection[id] && !row?.disabled && !row?.unselectable) rows.push(row)
  })
  return rows
}

export const getIsAllRowsSelected = (source, rowSelection) => {
  if (!source.getFlatRowCount() || !Object.keys(rowSelection).length) return false

  let allSelected = true
  source.forEachExportRow((_, id) => {
    if (!rowSelection[id]) allSelected = false
  })
  return allSelected
}

export const getIsSomeRowsSelected = (source, rowSelection) => {
  const selectedCount = Object.keys(rowSelection).length
  return selectedCount > 0 && selectedCount < source.getFlatRowCount()
}

export const getNextRowSelection = (source, rowSelection, value) => {
  const selected = value ?? !getIsAllRowsSelected(source, rowSelection)
  const next = { ...rowSelection }

  source.forEachExportRow((_, id) => {
    if (selected) next[id] = true
    else delete next[id]
  })

  return next
}
