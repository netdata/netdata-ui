import React, { forwardRef, useCallback } from "react"
import styled from "styled-components"
import { getColor } from "src/theme/utils"
import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import { Text } from "src/components/typography"
import Action from "./action"

const StyledRow = styled.tr`
  font-size: 14px;
  color: ${getColor("text")};
  &:nth-child(2n) {
    background: ${getColor("elementBackground")};
  }
`
const StyledHeader = styled.tr`
  background: ${getColor("elementBackground")};
  color: ${getColor("text")};
`
const StyledHeaderCell = styled(Box)`
  padding: 12px;
  &:not(:last-child) {
    border-right: 1px solid ${getColor("borderSecondary")};
  }
`
const StyledSortIcon = styled(Icon)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 14px;
  height: 12px;
  margin: auto;
`

const Table = forwardRef(
  (
    {
      handleSearch,
      children,
      seachPlaceholder = "search",
      Pagination,
      selectedRows,
      bulkActions,
      testPrefix,
      ...props
    },
    ref
  ) => {
    return (
      <Flex width="100%" height="100%" column>
        <Flex width="100%" margin={[0, 0, 3, 0]}>
          {handleSearch && (
            <Box width={{ max: 50 }}>
              <SearchInput
                data-testid="table-global-search-filter"
                onChange={e => {
                  e.persist()
                  handleSearch(e.target.value)
                }}
                placeholder={seachPlaceholder}
                iconRight={<Icon name="magnify" />}
              />
            </Box>
          )}
          <Flex data-testid="bulk-actions" width="100%" justifyContent="end" margin={[0, 0, 1, 0]}>
            {bulkActions ? (
              <Flex height={12} alignSelf="end" gap={1} margin={[0, 0, 1, 0]}>
                {bulkActions.map(({ id, icon, handleAction, tooltipText, ...rest }) => (
                  <Action
                    testPrefix={`-bulk${testPrefix}`}
                    key={id}
                    id={id}
                    icon={icon}
                    handleAction={() => handleAction(selectedRows)}
                    tooltipText={tooltipText}
                    disabled={selectedRows?.length < 1}
                    {...rest}
                  />
                ))}
              </Flex>
            ) : (
              <Box aria-hidden as="span" />
            )}
          </Flex>
        </Flex>
        <Box sx={{ borderCollapse: "collapse" }} ref={ref} as="table" {...props}>
          {children}
        </Box>
        {Pagination}
      </Flex>
    )
  }
)

Table.Head = forwardRef(({ children, ...props }, ref) => (
  <Box
    ref={ref}
    sx={{ whiteSpace: "nowrap" }}
    as="thead"
    border={{ size: "1px", type: "solid", side: "bottom", color: "borderSecondary" }}
    {...props}
  >
    {children}
  </Box>
))

Table.HeadRow = forwardRef(({ children, ...props }, ref) => (
  <StyledHeader ref={ref} {...props}>
    {children}
  </StyledHeader>
))

Table.HeadCell = forwardRef(({ children, align = "left", ...props }, ref) => (
  <StyledHeaderCell
    ref={ref}
    sx={{ textAlign: align, fontSize: "14px" }}
    width={{ max: 30 }}
    {...props}
    as="th"
  >
    {children}
  </StyledHeaderCell>
))

Table.SortingHeadCell = forwardRef(
  (
    { children, onSortClicked, setSortDirection, sortDirection, filter, align = "left", ...props },
    ref
  ) => {
    const onClick = useCallback(
      e => {
        e.preventDefault()

        onSortClicked?.(e)
      },
      [sortDirection, setSortDirection, onSortClicked]
    )

    const sortingIcons = { asc: "sorting_asc", desc: "sorting_desc" }

    return (
      <StyledHeaderCell as="th" ref={ref} {...props} sx={{ textAlign: align, fontSize: "14px" }}>
        <Box onClick={onClick} position="relative" cursor="pointer">
          {children}
          <StyledSortIcon name={sortingIcons[sortDirection] ?? null} />
        </Box>
        {filter}
      </StyledHeaderCell>
    )
  }
)

Table.Body = forwardRef(({ children, ...props }, ref) => (
  <Box ref={ref} as="tbody" {...props}>
    {children}
  </Box>
))

Table.Cell = forwardRef(({ children, onClick, align = "left", ...props }, ref) => {
  const handleClick = () => {
    onClick?.()
  }
  return (
    <Box padding={[3]} sx={{ textAlign: align }} as="td" ref={ref} {...props} onClick={handleClick}>
      {children}
    </Box>
  )
})

Table.Row = forwardRef(({ children, onClick, ...props }, ref) => {
  const handleClick = () => {
    onClick?.()
  }
  return (
    <StyledRow onClick={handleClick} ref={ref} {...props}>
      {children}
    </StyledRow>
  )
})

export const Pagination = ({
  pageIndex,
  pageCount,
  hasNext,
  hasPrevious,
  onNextPage,
  onPreviousPage,
  pageSize,
}) => (
  <Flex>
    <Box
      cursor="pointer"
      onClick={hasPrevious && onPreviousPage}
      as={Icon}
      name="chevron_left_small"
    />
    {pageIndex}
    <Box cursor="pointer" onClick={hasNext && onNextPage} as={Icon} name="chevron_right_small" />
    <Text>
      Page {pageIndex} of {pageCount}
    </Text>
  </Flex>
)

export default Table
