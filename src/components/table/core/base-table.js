import React, { forwardRef, useCallback } from "react"
import styled from "styled-components"
import { getColor } from "src/theme/utils"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"
import Tooltip from "src/components/drops/tooltip"
import useToggle from "src/hooks/use-toggle"
import { useTableContext } from "../features/provider"

const HeaderCell = styled(Flex)`
  border-bottom: 1px solid ${getColor("border")};
  &:not(:last-child) {
    border-right: 1px solid
      ${({ background, theme }) => getColor(background || "border")({ theme })};
  }
`

const Table = forwardRef(({ children, width, ...props }, ref) => (
  <Flex column ref={ref} width={width} {...props}>
    {children}
  </Flex>
))

Table.Head = forwardRef(({ children, ...props }, ref) => (
  <Flex ref={ref} sx={{ zIndex: 10, position: "sticky", top: 0 }} {...props}>
    {children}
  </Flex>
))

Table.HeadRow = forwardRef(({ children, ...props }, ref) => (
  <Flex ref={ref} background="tableRowBg" color="text" flex {...props}>
    {children}
  </Flex>
))

Table.Resizer = ({ onMouseDown, onTouchStart, deltaOffset, getIsResizing, background }) => {
  if (!onMouseDown) return
  const resizingProps = getIsResizing() ? { transform: `translateX(${deltaOffset}px)` } : {}

  return (
    <Flex
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
        ref={ref}
        sx={{
          textAlign: align,
          fontSize: "10px",
        }}
        position="relative"
        padding={[1, 2]}
        width={`${width}px`}
        onMouseEnter={() => onHover({ row: null, column: id })}
        onMouseLeave={() => onHover()}
        column
        justifyContent="center"
        {...props}
        {...styles}
        {...headStyles}
        background={props.background}
      >
        <Flex>
          {children}
          {tooltipText && (
            <Flex position="absolute" top={1} right="12px" width={4} height={4}>
              <Tooltip align="bottom" content={tooltipText}>
                <Icon color="nodeBadgeColor" size="small" name="information" />
              </Tooltip>
            </Flex>
          )}
        </Flex>
        <Flex sx={{ fontWeight: "normal" }}>{filter}</Flex>
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
        <Flex
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
            <Flex position="absolute" top={0.5} right="-16px">
              <Icon
                height="16px"
                width="16px"
                color={showHoveringIcon ? "textLite" : "text"}
                name={sortingIcons[showHoveringIcon ? "indicator" : sortDirection] ?? null}
              />
            </Flex>
          </Flex>
        </Flex>
      </Table.HeadCell>
    )
  }
)

Table.Body = forwardRef(({ children, ...props }, ref) => (
  <Flex column ref={ref} {...props}>
    {children}
  </Flex>
))

Table.Cell = forwardRef(
  (
    {
      align = "left",
      cellHeight,
      children,
      index,
      isRowHovering,
      meta,
      onClick,
      tableMeta,
      width,
      row,
      cell,
      ...rest
    },
    ref
  ) => {
    const handleClick = e => {
      e.persist()
      if (rest.stopPropagation) e.stopPropagation()
      onClick?.()
    }

    return (
      <Flex
        onClick={handleClick}
        padding={[1, 2]}
        ref={ref}
        sx={{
          textAlign: align,
        }}
        alignItems="center"
        width={`${width}px`}
        {...rest}
        background={
          !rest.background && isRowHovering
            ? index % 2 === 0
              ? "panelBg"
              : "tableRowBgHover"
            : rest.background || (index % 2 === 0 ? "mainBackground" : "tableRowBg")
        }
        backgroundOpacity={
          isRowHovering ? (rest.backgroundOpacity ? 0.8 : 0.9) : rest.backgroundOpacity || 0.7
        }
        height={cellHeight}
        {...tableMeta?.cellStyles}
        {...tableMeta?.pinnedStyles}
        {...tableMeta?.styles}
        {...meta?.cellStyles}
        {...meta?.pinnedStyles}
        {...meta?.styles}
      >
        {children}
        {cell.getIsGrouped() && row.getCanExpand() && (
          <Flex
            cursor="pointer"
            role="button"
            padding={[1]}
            gap={1}
            onClick={e => {
              row.getToggleExpandedHandler()(e)
              setTimeout(() => e.target.scrollIntoView({ behavior: "smooth", block: "nearest" }))
            }}
          >
            <Text fontSize="10px" color="textLite">
              Expand
            </Text>
            <Icon
              name="chevron_down"
              width="12px"
              height="12px"
              color="selected"
              rotate={row.getIsExpanded() ? 2 : null}
            />
          </Flex>
        )}
      </Flex>
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
      <Text
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        as={Flex}
        cursor={cursor}
        isClickable={!!onClick}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    )
  }
)

export default Table
