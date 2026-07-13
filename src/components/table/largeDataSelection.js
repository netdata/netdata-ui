export const isRowSelectable = row => !row?.disabled && !row?.unselectable

export const getSelectedOriginalRows = (source, rowSelection) => {
  if (!Object.keys(rowSelection).length) return []

  const rows = []
  source.forEachRow((row, id) => {
    if (rowSelection[id] && isRowSelectable(row)) rows.push(row)
  })
  return rows
}

export const getIsAllRowsSelected = (source, rowSelection) => {
  if (!source.getFlatRowCount() || !Object.keys(rowSelection).length) return false

  let hasSelectable = false
  let allSelected = true
  source.forEachExportRow((row, id) => {
    if (!isRowSelectable(row)) return undefined
    hasSelectable = true
    if (rowSelection[id]) return undefined
    allSelected = false
    return false
  })
  return hasSelectable && allSelected
}

export const getIsSomeRowsSelected = (source, rowSelection) => {
  let selectedCount = Object.keys(rowSelection).length
  if (!selectedCount) return false

  let selectableCount = 0
  let selectedSelectableCount = 0
  source.forEachExportRow((row, id) => {
    if (!isRowSelectable(row)) {
      if (rowSelection[id]) selectedCount -= 1
      return
    }

    selectableCount += 1
    if (rowSelection[id]) selectedSelectableCount += 1
  })

  return selectedCount > 0 && selectedSelectableCount < selectableCount
}

export const getNextRowSelection = (source, rowSelection, value) => {
  const selected = value ?? !getIsAllRowsSelected(source, rowSelection)
  const next = { ...rowSelection }

  source.forEachExportRow((row, id) => {
    if (selected) {
      if (isRowSelectable(row)) next[id] = true
    } else {
      delete next[id]
    }
  })

  return next
}
