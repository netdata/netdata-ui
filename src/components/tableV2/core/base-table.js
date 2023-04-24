import React, { forwardRef, useCallback } from "react"
import styled from "styled-components"
import { getColor } from "src/theme/utils"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import { Text } from "src/components/typography"
import Tooltip from "src/components/drops/tooltip"
import useToggle from "src/hooks/use-toggle"
import { useTableContext } from "../features/provider"

//TODO heights in Table.Cell and Table.HeadCell needs to change and not be direct.
// the problem is when we are applying column pin the second table has different sizes
// than the first one. This is happening when we have a head with a filter and the all
// the cells are being addapted to that size.

const StyledRow = styled(Text).attrs(props => ({ as: "tr", width: "fit-content", ...props }))``

const HeaderCell = styled(Box)`
  border-bottom: 1px solid ${getColor("borderSecondary")};
  &:not(:last-child) {
    border-right: 1px solid
      ${({ background, theme }) => getColor(background || "borderSecondary")({ theme })};
  }
`

const Table = forwardRef(({ children, width, ...props }, ref) => (
  <Box
    sx={{ borderCollapse: "separate", "table-layout": "fixed", borderSpacing: "0" }}
    ref={ref}
    as="table"
    width={width}
    {...props}
  >
    {children}
  </Box>
))

Table.Head = forwardRef(({ children, ...props }, ref) => (
  <Box ref={ref} sx={{ zIndex: 10, position: "sticky", top: 0 }} as="thead" {...props}>
    {children}
  </Box>
))

Table.HeadRow = forwardRef(({ children, ...props }, ref) => (
  <Box as="tr" ref={ref} background="tableRowBg" color="text" {...props}>
    {children}
  </Box>
))

Table.Resizer = ({ onMouseDown, onTouchStart, deltaOffset, getIsResizing, background }) => {
  if (!onMouseDown) return
  const resizingProps = getIsResizing() ? { transform: `translateX(${deltaOffset}px)` } : {}

  return (
    <Box
      _hover={{ background: "resizerLine", color: "resizerLine" }}
      _active={{ background: "resizerLine", color: "resizerLine" }}
      _before={{
        content: '":"',
        position: "absolute",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        left: "-8px",
        width: "8px",
      }}
      sx={{
        width: "2px",
        userSelect: "none",
        touchAction: "none",
        cursor: "col-resize",
        color: "border",
        ...resizingProps,
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      background={background || "borderSecondary"}
      position="absolute"
      top={0}
      right={0}
      bottom={0}
    />
  )
}

Table.HeadCell = forwardRef(
  (
    {
      id,
      children,
      align = "left",
      width,
      tooltipText,
      filter,
      onMouseDown,
      onTouchStart,
      getIsResizing,
      deltaOffset,
      styles = {},
      headStyles = {},
      ...props
    },
    ref
  ) => {
    const { onHover } = useTableContext()

    return (
      <HeaderCell
        as="th"
        ref={ref}
        sx={{
          textAlign: align,
          fontSize: "14px",
        }}
        position="relative"
        padding={[1, 2]}
        width={`${width}px`}
        onMouseEnter={() => onHover({ row: null, column: id })}
        onMouseLeave={() => onHover()}
        height="60px"
        {...props}
        {...styles}
        {...headStyles}
        background={props.background}
      >
        <Flex>
          {children}
          {tooltipText && (
            <Box position="absolute" top={1} right="12px" width={4} height={4}>
              <Tooltip align="bottom" content={tooltipText}>
                <Icon color="nodeBadgeColor" size="small" name="information" />
              </Tooltip>
            </Box>
          )}
        </Flex>
        <Box sx={{ fontWeight: "normal" }}>{filter}</Box>
        <Table.Resizer
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          getIsResizing={getIsResizing}
          deltaOffset={deltaOffset}
          background={props.background}
        />
      </HeaderCell>
    )
  }
)

const sortingIcons = {
  asc: "sort_ascending",
  desc: "sort_descending",
  indicator: "sort_indicator",
}

Table.SortingHeadCell = forwardRef(
  (
    {
      children,
      onSortClicked,
      setSortDirection,
      width,
      sortDirection,
      filter,
      align = "left",
      dataGa,
      "data-testid": dataTestid,
      "sortby-testid": sortbyTestid,
      styles = {},
      headStyles = {},
      tooltipText,
      coloredSortedColumn,
      ...props
    },
    ref
  ) => {
    const [isHovering, , onMouseEnter, onMouseLeave] = useToggle(false)

    const showHoveringIcon = isHovering && !sortDirection

    const onClick = useCallback(
      e => {
        e.preventDefault()

        onSortClicked?.(e)
      },
      [sortDirection, setSortDirection, onSortClicked]
    )

    return (
      <Table.HeadCell
        styles={styles}
        align={align}
        ref={ref}
        data-testid={dataTestid}
        width={width}
        tooltipText={tooltipText}
        headStyles={headStyles}
        {...props}
        filter={filter}
        {...(coloredSortedColumn && !!sortDirection && { background: "columnHighlight" })}
      >
        <Box
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          position="relative"
          cursor="pointer"
          data-testid={sortbyTestid}
          data-ga={`${dataGa}::click-${sortDirection ? "ascending" : "descending"}-column-${
            props.id
          }`}
        >
          <Flex
            position="relative"
            data-testid="sorting-cell-children-sorting-arrows-wrapper"
            gap={1}
          >
            {children}
            <Box position="absolute" top={0.5} right="-16px">
              <Icon
                height="16px"
                width="16px"
                color={showHoveringIcon ? "textLite" : "text"}
                name={sortingIcons[showHoveringIcon ? "indicator" : sortDirection] ?? null}
              />
            </Box>
          </Flex>
        </Box>
      </Table.HeadCell>
    )
  }
)

Table.Body = forwardRef(({ children, ...props }, ref) => (
  <Box ref={ref} as="tbody" {...props}>
    {children}
  </Box>
))

Table.Cell = forwardRef(
  (
    { align = "left", children, onClick, width, isRowHovering, index, meta, tableMeta, ...rest },
    ref
  ) => {
    const handleClick = e => {
      e.persist()
      if (rest.stopPropagation) e.stopPropagation()
      onClick?.()
    }

    return (
      <Box
        as="td"
        onClick={handleClick}
        padding={[1, 2]}
        ref={ref}
        sx={{
          textAlign: align,
        }}
        width={`${width}px`}
        {...rest}
        background={
          !rest.background && isRowHovering
            ? "tableRowBgHover"
            : rest.background || (index % 2 == 0 ? "mainBackground" : "tableRowBg")
        }
        backgroundOpacity={
          isRowHovering ? (rest.backgroundOpacity ? 0.8 : 1) : rest.backgroundOpacity || 0.7
        }
        height="65px"
        {...tableMeta?.cellStyles}
        {...tableMeta?.pinnedStyles}
        {...tableMeta?.styles}
        {...meta?.cellStyles}
        {...meta?.pinnedStyles}
        {...meta?.styles}
      >
        {children}
      </Box>
    )
  }
)

Table.Row = forwardRef(
  ({ children, onClick, disableClickRow, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const isRowDisabledForClick = disableClickRow && disableClickRow()
    const handleClick = e => {
      if (isRowDisabledForClick) return
      e.persist()
      e.stopPropagation()
      onClick?.()
    }

    const handleMouseEnter = event => {
      onMouseEnter?.(event)
    }

    const handleMouseLeave = event => {
      onMouseLeave?.(event)
    }

    const isRowClickable = !isRowDisabledForClick && onClick !== undefined
    const cursor = isRowClickable ? "pointer" : "intial"

    return (
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        as={StyledRow}
        cursor={cursor}
        isClickable={!!onClick}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

export default Table
