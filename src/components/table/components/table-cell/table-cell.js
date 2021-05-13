import React, { useContext } from "react"
import { LayoutContext } from "../../layout-context"

export const TableCell = ({ cell, selectedRowIds, customProps, ...props }) => {
  const layoutType = useContext(LayoutContext)
  return layoutType === "table" ? (
    <td {...props}>{cell.render("Cell", { selectedRowIds, ...customProps })}</td>
  ) : (
    <div className="table-cell" {...props}>
      {cell.render("Cell", { selectedRowIds, ...customProps })}
    </div>
  )
}
