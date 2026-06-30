export default (column, header, hasExplicitSize) =>
  (column.columnDef.notFlex || column.getCanResize()) &&
  (!column.columnDef.fullWidth || hasExplicitSize)
    ? false
    : header.colSpan
