import React, { useContext, useState, useMemo } from "react"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import { LayoutContext } from "../../layout-context"

export const ColumnHead = ({ column, sortableBy, customProps }) => {
  const [hover, setHover] = useState(false)
  const layoutType = useContext(LayoutContext)
  const { id, getSortByToggleProps, getHeaderProps, render, isSorted, isSortedDesc } = column

  const isColumnSortable = sortableBy.includes(id)
  const showHoverIndicator = isColumnSortable && hover
  const sortProps = useMemo(() => (isColumnSortable ? getSortByToggleProps() : {}), [
    isColumnSortable,
  ])
  return layoutType === "table" ? (
    <th
      {...sortProps}
      {...getHeaderProps()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isColumnSortable ? (
        <Flex alignItems="center" justifyContent="start" height={{ min: 6 }} gap={2}>
          {render("Header", { ...customProps })}
          {isSorted ? (
            <Icon
              name="arrow_down"
              color="selected"
              rotate={isSortedDesc ? null : 2}
              data-testid="columnHhead-sortingIcon"
            />
          ) : (
            showHoverIndicator && <Icon name="arrow_down" color="selected" rotate={2} />
          )}
        </Flex>
      ) : (
        render("Header", { ...customProps })
      )}
    </th>
  ) : (
    <div {...sortProps} {...getHeaderProps()} className="column-head">
      {render("Header", { ...customProps })}
    </div>
  )
}
