import React, { useContext, useState, useMemo } from "react"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import { LayoutContext } from "../../layout-context"

export const ColumnHead = ({ column, sortableBy, customProps }) => {
  const [hover, setHover] = useState(false)
  const layoutType = useContext(LayoutContext)
  const {
    id,
    getSortByToggleProps,
    getHeaderProps,
    render,
    canSort,
    isSorted,
    isSortedDesc,
  } = column
  const showHoverIndicator = canSort && hover
  const sortProps = useMemo(() => (sortableBy.includes(id) ? getSortByToggleProps() : {}), [id])
  return layoutType === "table" ? (
    <th
      {...sortProps}
      {...getHeaderProps()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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
    </th>
  ) : (
    <div {...sortProps} {...getHeaderProps()} className="column-head">
      {render("Header", { ...customProps })}
    </div>
  )
}
