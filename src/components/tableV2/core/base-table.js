import React, { forwardRef, useCallback } from "react"
import styled from "styled-components"
import { getColor } from "src/theme/utils"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import { Text } from "src/components/typography"
import { IconButton } from "src/components/button"
import Tooltip from "src/components/drops/tooltip"
import useToggle from "src/hooks/use-toggle"

//TODO heights in Table.Cell and Table.HeadCell needs to change and not be direct.
// the problem is when we are applying column pin the second table has different sizes
// than the first one. This is happening when we have a head with a filter and the all
// the cells are being addapted to that size.

const StyledRow = styled.tr`
  font-size: 14px;
  color: ${getColor("text")};
  width: fit-content;
`
const StyledHeaderRow = styled.tr`
  background: ${getColor("tableRowBg")};
  color: ${getColor("text")};
`
const StyledHeaderCell = styled(Box)`
  position: relative;
  padding: 4px 8px;
  border-bottom: 1px solid ${getColor("borderSecondary")};
  &:not(:last-child) {
    border-right: 1px solid ${getColor("borderSecondary")};
  }
`
const StyledSortIcon = styled(Icon)`
  position: relative;
  top: 0;
  bottom: 0;
  height: 16px;
  width: 16px;
  margin: auto;
`
const StyledPagination = styled(Flex)`
  height: 45px;
  background: ${getColor("mainBackground")};
  border-top: 1px solid ${getColor("borderSecondary")};
`

const Table = forwardRef(({ children, width, ...props }, ref) => {
  return (
    <Flex height="100%" width="100%" column>
      <Box sx={{ borderCollapse: "separate" }} ref={ref} as="table" width={width} {...props}>
        {children}
      </Box>
    </Flex>
  )
})

Table.Head = forwardRef(({ children, ...props }, ref) => (
  <Box
    ref={ref}
    sx={{ whiteSpace: "nowrap", zIndex: 1, position: "sticky", top: 0 }}
    as="thead"
    {...props}
  >
    {children}
  </Box>
))

Table.HeadRow = forwardRef(({ children, ...props }, ref) => (
  <StyledHeaderRow ref={ref} {...props}>
    {children}
  </StyledHeaderRow>
))

Table.Resizer = ({ onMouseDown, onTouchStart, deltaOffset, getIsResizing }) => {
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
      background="borderSecondary"
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
  ) => (
    <StyledHeaderCell
      as="th"
      ref={ref}
      sx={{
        textAlign: align,
        fontSize: "14px",
        height: "60px",
        position: "sticky",
        top: 0,
        ...styles,
        ...headStyles,
      }}
      width={`${width}px`}
      {...props}
    >
      <Flex>
        {children}
        <Box sx={{ marginLeft: "auto" }} position="relative" top={0}>
          {tooltipText && (
            <Tooltip align="bottom" content={tooltipText}>
              <Icon color="nodeBadgeColor" size="small" name="information" />
            </Tooltip>
          )}
        </Box>
      </Flex>

      {filter}
      <Table.Resizer
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        getIsResizing={getIsResizing}
        deltaOffset={deltaOffset}
      />
    </StyledHeaderCell>
  )
)

Table.SortingHeadCell = forwardRef(
  (
    {
      children,
      onSortClicked,
      setSortDirection,
      maxWidth,
      width,
      minWidth,
      sortDirection,
      filter,
      align = "left",
      "data-testid": dataTestid,
      "sortby-testid": sortbyTestid,
      styles = {},
      headStyles = {},
      tooltipText,
      ...props
    },
    ref
  ) => {
    const [isHovering, , onMouseEnter, onMouseLeave] = useToggle(false)

    const sortingIcons = {
      asc: "sort_ascending",
      desc: "sort_descending",
      indicator: "sort_indicator",
    }
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
        maxWidth={maxWidth}
        width={width}
        minWidth={minWidth}
        tooltipText={tooltipText}
        headStyles={headStyles}
        {...props}
        filter={filter}
      >
        <Box
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          position="relative"
          cursor="pointer"
          data-testid={sortbyTestid}
        >
          <Flex data-testid="sorting-cell-children-sorting-arrows-wrapper">
            {children}
            <Box width={4}>
              <StyledSortIcon color="text" name={sortingIcons[sortDirection] ?? null} />
              {showHoveringIcon && (
                <StyledSortIcon color="textLite" name={sortingIcons["indicator"]} />
              )}
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
    {
      align = "left",
      cellStyles = {},
      children,
      maxWidth,
      minWidth,
      onClick,
      pinnedStyles = {},
      styles = {},
      width,
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
      <Box
        as="td"
        onClick={handleClick}
        padding={[1, 2]}
        ref={ref}
        sx={{
          textAlign: align,
          height: "65px",
          maxHeight: "65px",
          whiteSpace: "nowrap",
          ...cellStyles,
          ...pinnedStyles,
          ...styles,
        }}
        width={{ max: `${maxWidth}px`, base: `${width}px`, min: `${minWidth}px` }}
        {...rest}
      >
        {children}
      </Box>
    )
  }
)

Table.Row = forwardRef(
  (
    { children, onClick, disableClickRow, onMouseEnter, onMouseLeave, isHovering, ...props },
    ref
  ) => {
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
        _hover={isRowClickable && { background: "borderSecondary" }}
        cursor={cursor}
        isClickable={!!onClick}
        onClick={handleClick}
        ref={ref}
        {...props}
        data-hover={isHovering ? "" : undefined}
      >
        {children}
      </Box>
    )
  }
)

export const Pagination = ({
  pageIndex,
  pageCount,
  hasNext,
  hasPrevious,
  onNextPage,
  onPreviousPage,
  setPageIndex,
  resetPageIndex,
  pageSize,
}) => {
  const handleOnPrevious = useCallback(() => {
    if (hasPrevious) onPreviousPage()
  }, [hasPrevious])

  const handleOnNextPage = useCallback(() => {
    if (hasNext) onNextPage()
  }, [hasNext])

  const handleGoToLastPage = useCallback(() => {
    setPageIndex(pageCount - 1)
  }, [pageCount, setPageIndex])

  const handleGoToFirstPage = useCallback(() => {
    resetPageIndex()
  }, [resetPageIndex])

  return (
    <StyledPagination alignItems="center" justifyContent="end">
      <Tooltip content="First">
        <Flex>
          <IconButton
            data-testid={"pagination-go-to-first"}
            cursor="pointer"
            onClick={handleGoToFirstPage}
            icon="chevron_left_start"
            iconSize="small"
            tooltip="test"
            disabled={!hasPrevious}
          />
        </Flex>
      </Tooltip>
      <Tooltip content="Previous">
        <Flex>
          <IconButton
            data-testid={"pagination-go-to-previous"}
            cursor="pointer"
            onClick={handleOnPrevious}
            icon="chevron_left"
            iconSize="small"
            tooltip="Previous"
            disabled={!hasPrevious}
          />
        </Flex>
      </Tooltip>
      <Text data-testid={"pagination-counter"}>
        Page {pageCount === 0 ? 0 : pageIndex} of {pageCount}
      </Text>
      <Tooltip content="Next">
        <Flex>
          <IconButton
            data-testid={"pagination-go-to-next"}
            cursor="pointer"
            onClick={handleOnNextPage}
            icon="chevron_right"
            iconSize="small"
            disabled={!hasNext}
          />
        </Flex>
      </Tooltip>
      <Tooltip content="Last">
        <Flex>
          <IconButton
            data-testid={"pagination-go-to-last"}
            cursor="pointer"
            onClick={handleGoToLastPage}
            icon="chevron_right_end"
            iconSize="small"
            disabled={!hasNext}
          />
        </Flex>
      </Tooltip>
    </StyledPagination>
  )
}

export default Table
