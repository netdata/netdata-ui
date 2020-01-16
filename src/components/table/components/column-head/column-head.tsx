import React from "react"

interface Props {
  column: any
  sortableBy: string[]
  customProps: Object
}

export const ColumnHead = ({ column, sortableBy, customProps }: Props) => {
  const sortProps = sortableBy.includes(column.id) ? column.getSortByToggleProps() : {}
  return (
    <th {...sortProps} {...column.getHeaderProps()}>
      {column.render("Header", { ...customProps })}
    </th>
  )
}
