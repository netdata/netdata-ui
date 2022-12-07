import React, { useCallback, useMemo, useState, useRef } from "react"
import styled from "styled-components"
import { useVirtualizer } from "@tanstack/react-virtual"
import Flex from "src/components/templates/flex"
import Search from "src/components/search"
import { Box } from "src/index"

const Container = styled(Flex)`
  ${({ hideShadow }) =>
    !hideShadow &&
    "box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);"}
  list-style-type: none;
`

const Dropdown = ({
  hideShadow,
  itemProps,
  items,
  onItemClick,
  renderItem,
  value,
  hasSearch,
  searchMargin = [4],
  gap = 0,
  ...rest
}) => {
  const [searchParams, setSearchParams] = useState("")

  const filteredItems = useMemo(() => {
    if (!searchParams) return items
    const searchLowerCase = searchParams.toLowerCase()
    return items.filter(({ label, value }) => {
      if (typeof value === "string" && label.toLowerCase().includes(searchLowerCase)) return true
      if (typeof value === "string" && value.toLowerCase().includes(searchLowerCase)) return true
      return false
    })
  }, [items, searchParams])

  const handleSearch = useCallback(
    event => {
      setSearchParams(event.target.value)
    },
    [setSearchParams]
  )

  const ref = useRef()
  const measuresRef = useRef({})

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => ref.current,
    scrollOffsetFn: event => (event ? event.target.scrollTop - ref.current.offsetTop : 0),
    overscan: 3,
    enableSmoothScroll: false,
    estimateSize: () => 30,
  })

  return (
    <Container
      as="ul"
      role="listbox"
      background="dropdown"
      hideShadow={hideShadow}
      padding={[0]}
      margin={[1, 0]}
      column
      tabindex="-1"
      {...rest}
    >
      {hasSearch && (
        <Box margin={searchMargin}>
          <Search
            data-testid={"dropdown-search"}
            defaultValue={searchParams}
            placeholder="Search"
            onChange={handleSearch}
            size="tiny"
          />
        </Box>
      )}
      <div
        ref={ref}
        style={{
          minHeight: "100%",
          width: "100%",
          overflow: "auto",
        }}
      >
        <div
          style={{
            minHeight: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
                padding: gap * 2,
                overflow: "hidden",
              }}
            >
              {renderItem({
                item: filteredItems[virtualRow.index],
                index: virtualRow.index,
                itemProps,
                value,
                onItemClick,
              })}
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Dropdown
