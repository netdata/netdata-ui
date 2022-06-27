import React, { forwardRef, useCallback } from "react"

import SearchInput from "src/components/search"
import { Icon } from "src/components/icon"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"

import FilteringOptions from "./filteringOptions"

const Table = forwardRef(
  ({ handleSearch, filteringOptions, children, seachPlaceholder = "search", ...props }, ref) => {
    return (
      <Flex column>
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

Table.SortingHeadeCell = forwardRef(
  ({ children, onSortClicked, setSortDirection, sortDirection, props }, ref) => {
    const onClick = useCallback(
      e => {
        e.preventDefault()
        if (!sortDirection) {
          setSortDirection("ASC")
        } else {
          if (sortDirection === "ASC") {
            setSortDirection("DESC")
          } else {
            setSortDirection(undefined)
          }
        }
        onSortClicked()
      },
      [sortDirection, setSortDirection, onSortClicked]
    )

    return (
      <Box as="th" ref={ref} {...props} onClick={onClick}>
        <Flex cursor="pointer" gap={1}>
          {children}
          <Box
            as="icon"
            name="sorting_desc"
            sx={{ transform: sortDirection === "ASC" ? "rotate(180)" : "rotate(0)" }}
          />
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
      <Flex>{children}</Flex>
    </Box>
  )
})

Table.Row = forwardRef(({ children, props, actions }, ref) => {
  return (
    <Box height={12} as="tr" ref={ref} {...props}>
      {children}
      {actions && <Table.Cell onClick={e => e.stopPropagation()}>here is action</Table.Cell>}
    </Box>
  )
})

export default Table
