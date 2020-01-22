import React, { useContext } from "react"
import { LayoutContext } from "../../layout-context"

interface Props {
  column: any
  sortableBy: string[]
}

export const ColumnHead = ({ column, sortableBy }: Props) => {
  const layoutType = useContext(LayoutContext)
  const sortProps = sortableBy.includes(column.id) ? column.getSortByToggleProps() : {}
  return layoutType === "table" ? (
    <th {...sortProps} {...column.getHeaderProps()}>
      {column.render("Header")}
    </th>
  ) : (
    <div {...sortProps} {...column.getHeaderProps()} className="column-head">
      {column.render("Header")}
    </div>
  )
}
