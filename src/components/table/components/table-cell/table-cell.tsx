import React, { useContext } from "react"
import { LayoutContext } from "../../layout-context"

interface Props {
  cell: any // react-table cell instance
  selectedRowIds: string[]
  customProps?: Object
}

export const TableCell = ({ cell, selectedRowIds, customProps, ...props }: Props) => {
  const layoutType = useContext(LayoutContext)
  return layoutType === "table" ? (
    <td {...props}>{cell.render("Cell", { selectedRowIds, ...customProps })}</td>
  ) : (
    <div className="table-cell" {...props}>
      {cell.render("Cell", { selectedRowIds, ...customProps })}
    </div>
  )
}
