import React, { useContext, useMemo, useState } from "react"
import styled, { css } from "styled-components"
import { getColor } from "src/theme"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import { LayoutContext } from "../../layout-context"

const StyledColumnHead = styled(Flex)`
  &:hover {
    opacity: 0.7;
  }
`
const StyledTh = styled.th`
  position: ${({ hasStickyHeader }) => hasStickyHeader && "relative"};
  ${({ background = "mainBackground", hasStickyHeader, stickyTop = 0 }) =>
    hasStickyHeader &&
    css`
      position: sticky;
      top: ${stickyTop};
      background: ${getColor(background)};
    `};
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
  const { hasStickyHeader, stickyTop } = customProps
  return layoutType === "table" ? (
    <StyledTh
      hasStickyHeader={hasStickyHeader}
      stickyTop={stickyTop}
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
              color="text"
              width="10"
              height="10"
              rotate={isSortedDesc ? null : 2}
              data-testid="columnHhead-sortingIcon"
            />
          ) : (
            showHoverIndicator && (
              <Icon name="arrow_s_down" color="text" width="10" height="10" rotate={2} />
            )
          )}
        </StyledColumnHead>
      ) : (
        render("Header", { ...customProps })
      )}
    </StyledTh>
  ) : (
    <div {...sortProps} {...getHeaderProps()} className="column-head">
      {render("Header", { ...customProps })}
    </div>
  )
}
