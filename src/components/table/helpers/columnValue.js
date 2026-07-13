export const getPathValue = (value, path) =>
  path.split(".").reduce((current, key) => current?.[key], value)

export const getColumnValue = (row, index, column) => {
  if (column.accessorFn) return column.accessorFn(row, index)
  if (column.accessorKey) return getPathValue(row, column.accessorKey)
  return row?.[column.id]
}
