import React, { forwardRef, useCallback } from "react"

import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import { Text } from "src/components/typography"
import { Button } from "src/components/button"

import FilteringOptions from "./filteringOptions"

const Table = forwardRef(
  (
    { handleSearch, filteringOptions, children, seachPlaceholder = "search", Pagination, ...props },
    ref
  ) => {
    return (
      <Flex width="100%" height="100%" column>
        <Flex width="100%" justifyContent="between" margin={[0, 0, 1, 0]}>
          {filteringOptions ? (
            <Flex alignSelf="end" gap={1} ali margin={[0, 0, 1, 0]}>
              {filteringOptions.map(({ onChange, value, options, id }) => (
                <Box key={id}>
                  <FilteringOptions value={value} options={options} onChange={onChange} />
                </Box>
              ))}
            </Flex>
          ) : (
            <Box aria-hidden as="span" />
          )}

          {handleSearch && (
            <Box width={{ max: 50 }}>
              <SearchInput
                onChange={e => {
                  e.persist()
                  handleSearch(e.target.value)
                }}
                placeholder={seachPlaceholder}
                iconRight={<Icon name="magnify" />}
              />
            </Box>
          )}
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
  ({ children, onSortClicked, setSortDirection, sortDirection, props }, ref) => {
    const onClick = useCallback(
      e => {
        e.preventDefault()

        onSortClicked?.(e)
      },
      [sortDirection, setSortDirection, onSortClicked]
    )

    const sortingIcons = { asc: "sorting_asc", desc: "sorting_desc" }

    return (
      <Box as="th" ref={ref} {...props} onClick={onClick}>
        <Flex position="relative" cursor="pointer" gap={1}>
          <Box position="relative">
            {children}
            <Box
              position="absolute"
              width={4}
              as={Icon}
              name={sortingIcons[sortDirection] ?? null}
            />
          </Box>
        </Flex>
      </Box>
    )
  }
)

Table.Body = forwardRef(({ children, props }, ref) => (
  <Box ref={ref} as="tbody" {...props}>
    {children}
  </Box>
))

Table.Cell = forwardRef(({ children, props }, ref) => {
  const onClick = e => {
    e.stopPropagation()
  }
  return (
    <Box height={12} as="td" ref={ref} {...props} onClick={onClick}>
      <Flex alignItems="center" height="100%">
        {children}
      </Flex>
    </Box>
  )
})

Table.Row = forwardRef(({ children, props }, ref) => {
  return (
    <Box height={12} as="tr" ref={ref} {...props}>
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
    <Box cursor="pointer" onClick={onPreviousPage} as={Icon} name="chevron_left_small" />
    {pageIndex}
    <Box cursor="pointer" onClick={onNextPage} as={Icon} name="chevron_right_small" />
    <Text>
      Page {pageIndex} of {pageCount}
    </Text>
  </Flex>
)

export default Table
