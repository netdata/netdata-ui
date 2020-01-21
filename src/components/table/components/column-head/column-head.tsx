import React from "react"

interface Props {
  column: any
  sortableBy: string[]
}

// TODO - add condition to remove toggle function

export const ColumnHead = ({ column, sortableBy }: Props) => {
  const sortProps = sortableBy.includes(column.id) ? column.getSortByToggleProps() : {}
  return (
    <th {...sortProps} {...column.getHeaderProps()}>
      {column.render("Header")}
    </th>
  )
}
