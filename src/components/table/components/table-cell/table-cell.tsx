import React, { useContext } from "react"
import { LayoutContext } from "../../layout-context"

interface Props {
  cell: any // react-tabel cell instance
  selectedRowIds: string[]
}

export const TableCell = ({ cell, selectedRowIds, ...props }: Props) => {
  const layoutType = useContext(LayoutContext)
  return layoutType === "table" ? (
    <td {...props}>{cell.render("Cell", { selectedRowIds })}</td>
  ) : (
    <div className="table-cell">{cell.render("Cell", { selectedRowIds })}</div>
  )
}
