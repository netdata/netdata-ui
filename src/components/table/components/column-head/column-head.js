import React, { useContext } from "react"
import { LayoutContext } from "../../layout-context"

export const ColumnHead = ({ column, sortableBy, customProps }) => {
  const layoutType = useContext(LayoutContext)
  const sortProps = sortableBy.includes(column.id) ? column.getSortByToggleProps() : {}
  return layoutType === "table" ? (
    <th {...sortProps} {...column.getHeaderProps()}>
      {column.render("Header", { ...customProps })}
    </th>
  ) : (
    <div {...sortProps} {...column.getHeaderProps()} className="column-head">
      {column.render("Header", { ...customProps })}
    </div>
  )
}
