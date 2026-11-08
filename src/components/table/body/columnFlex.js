export default (table, column, header) => {
  if (table.options.meta?.fluidSizing) return false

  const hasExplicitSize = table.getState().columnSizing?.[column.id] != null
  return (column.columnDef.notFlex || column.getCanResize()) &&
    (!column.columnDef.fullWidth || hasExplicitSize)
    ? false
    : header.colSpan
}
