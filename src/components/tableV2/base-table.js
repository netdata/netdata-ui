import React, { forwardRef, useCallback } from "react"

import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import { Text } from "src/components/typography"
import Action from "./action"

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
        <Flex width="100%">
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
              <Flex height={12} alignSelf="end" gap={1} ali margin={[0, 0, 1, 0]}>
                {bulkActions.map(({ id, icon, handleAction, tooltipText, ...rest }) => (
                  <Action
                    testPrefix={`-bulk${testPrefix}`}
                    key={id}
                    id={id}
                    icon={icon}
                    handleAction={() => handleAction(selectedRows)}
                    tooltipText={tooltipText}
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
  <Box as="tr" sx={{ textAlign: "left" }} height={12} ref={ref} {...props}>
    {children}
  </Box>
))

Table.HeadCell = forwardRef(({ children, ...props }, ref) => (
  <Box ref={ref} width={{ max: 30 }} as="th" {...props}>
    {children}
  </Box>
))

Table.SortingHeadCell = forwardRef(
  ({ children, onSortClicked, setSortDirection, sortDirection, filter, ...props }, ref) => {
    const onClick = useCallback(
      e => {
        e.preventDefault()

        onSortClicked?.(e)
      },
      [sortDirection, setSortDirection, onSortClicked]
    )

    const sortingIcons = { asc: "sorting_asc", desc: "sorting_desc" }

    return (
      <Box as="th" ref={ref} {...props}>
        <Flex column position="relative" cursor="pointer" gap={1}>
          <Box onClick={onClick} position="relative">
            {children}
            <Box
              position="absolute"
              width={4}
              as={Icon}
              name={sortingIcons[sortDirection] ?? null}
            />
          </Box>
          {filter}
        </Flex>
      </Box>
    )
  }
)

Table.Body = forwardRef(({ children, ...props }, ref) => (
  <Box ref={ref} as="tbody" {...props}>
    {children}
  </Box>
))

Table.Cell = forwardRef(({ children, onClick, ...props }, ref) => {
  const handleClick = () => {
    onClick?.()
  }
  return (
    <Box height={12} as="td" ref={ref} {...props} onClick={handleClick}>
      <Flex alignItems="center" height="100%">
        {children}
      </Flex>
    </Box>
  )
})

Table.Row = forwardRef(({ children, onClick, ...props }, ref) => {
  const handleClick = () => {
    onClick?.()
  }
  return (
    <Box onClick={handleClick} height={12} as="tr" ref={ref} {...props}>
      {children}
    </Box>
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
