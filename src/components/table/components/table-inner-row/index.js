export const TableInnerRow = ({ row, children, selectedRowIds, customProps }) =>
  row.render("InnerRow", { selectedRowIds, children, ...customProps })
