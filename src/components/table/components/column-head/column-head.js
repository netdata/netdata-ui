import React, { useContext, useState, useMemo } from "react"
import styled from "styled-components"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import { LayoutContext } from "../../layout-context"

const StyledColumnHead = styled(Flex)`
  &:hover {
    opacity: 0.7;
  }
`

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
        <StyledColumnHead alignItems="center" justifyContent="start" height={{ min: 6 }} gap={2}>
          {render("Header", { ...customProps })}
          {isSorted ? (
            <Icon
              name="arrow_s_down"
              color="selected"
              width="10"
              height="10"
              rotate={isSortedDesc ? null : 2}
              data-testid="columnHhead-sortingIcon"
            />
          ) : (
            showHoverIndicator && (
              <Icon name="arrow_s_down" color="selected" width="10" height="10" rotate={2} />
            )
          )}
        </StyledColumnHead>
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
