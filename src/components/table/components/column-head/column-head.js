import React, { useContext } from "react"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import { LayoutContext } from "../../layout-context"

export const ColumnHead = ({ column, sortableBy, customProps }) => {
  const layoutType = useContext(LayoutContext)
  const sortProps = sortableBy.includes(column.id) ? column.getSortByToggleProps() : {}
  return layoutType === "table" ? (
    <th {...sortProps} {...column.getHeaderProps()}>
      <Flex alignItems="center" justifyContent="start" height={{ min: 6 }} gap={2}>
        {column.render("Header", { ...customProps })}
        {column.isSorted ? (
          <Icon name="arrow_down" color="selected" rotate={column.isSortedDesc ? null : 2} />
        ) : (
          ""
        )}
      </Flex>
    </th>
  ) : (
    <div {...sortProps} {...column.getHeaderProps()} className="column-head">
      {column.render("Header", { ...customProps })}
    </div>
  )
}
