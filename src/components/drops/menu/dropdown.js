import React, { forwardRef, useMemo, useState, useRef } from "react"
import styled from "styled-components"
import { useVirtualizer } from "@tanstack/react-virtual"
import Flex from "@/components/templates/flex"
import Search from "@/components/search"
import Box from "@/components/templates/box"
import { mergeRefs } from "@/utils"

const Container = styled(Flex)`
  ${({ hideShadow }) =>
    !hideShadow &&
    "box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);"}
  list-style-type: none;
`

const defaultEstimateSize = () => 28

const Dropdown = forwardRef(
  (
    {
      hideShadow,
      itemProps,
      items,
      onItemClick,
      dropTitle,
      dropTitlePadding = [3, 3, 0],
      Item,
      Footer,
      value,
      hasSearch,
      searchMargin = [4],
      gap = 0,
      estimateSize = defaultEstimateSize,
      close,
      ...rest
    },
    forwardedRef
  ) => {
    const [searchValue, setSearchValue] = useState("")

    const filteredItems = useMemo(() => {
      if (!searchValue) return items

      const searchLowerCase = searchValue.toLowerCase()

      return items.filter(({ label, value: val }) => {
        if (typeof label === "string" && label.toLowerCase().includes(searchLowerCase)) return true
        if (typeof val === "string" && val.toLowerCase().includes(searchLowerCase)) return true
        return false
      })
    }, [items, searchValue])

    const ref = useRef()

    const rowVirtualizer = useVirtualizer({
      count: filteredItems.length,
      getScrollElement: () => ref.current,
      scrollOffsetFn: event => (event ? event.target.scrollTop - ref.current.offsetTop : 0),
      overscan: 3,
      enableSmoothScroll: false,
      estimateSize,
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
        width="auto"
        {...rest}
      >
        {dropTitle && <Flex padding={dropTitlePadding}>{dropTitle}</Flex>}
        {hasSearch && (
          <Box margin={searchMargin}>
            <Search data-testid="dropdown-search" placeholder="Search" onChange={setSearchValue} />
          </Box>
        )}
        <div
          ref={mergeRefs(ref, forwardedRef)}
          style={{
            height: "100%",
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
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: gap * 2,
                  overflow: "hidden",
                }}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
              >
                <Item
                  item={filteredItems[virtualRow.index]}
                  index={virtualRow.index}
                  itemProps={itemProps}
                  value={value}
                  onItemClick={onItemClick}
                  close={close}
                />
              </div>
            ))}
          </div>
        </div>
        {Footer && <Footer close={close} />}
      </Container>
    )
  }
)

export default Dropdown
