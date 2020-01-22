import React, { useContext } from "react"
import { LayoutContext } from "../../layout-context"

interface Props {
  column: any
  sortableBy: string[]
  customProps?: Object
}

export const ColumnHead = ({ column, sortableBy, customProps }: Props) => {
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
