import { useMemo, useState, useRef } from "react"
import styled from "styled-components"
import { useVirtualizer } from "@tanstack/react-virtual"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import Search from "@/components/search"
import Box from "@/components/templates/box"
import { mergeRefs } from "@/utils"
import { dropdownBorder, floatingShadow, insetMenuPadding, insetMenuRound } from "../dropdownStyles"

const Container = styled(Flex)`
  ${({ hideShadow }) => !hideShadow && floatingShadow}
  list-style-type: none;
`

const ItemList = styled.div`
  height: 100%;
  min-width: 0;
  overflow: hidden auto;
`

const defaultEstimateSize = () => 34

const DefaultNoSearchResultsComponent = () => {
  return (
    <Flex padding={[2, 0]} justifyContent="center">
      <Text color="textLite">No results were found</Text>
    </Flex>
  )
}

const Dropdown = ({
  hideShadow,
  itemProps,
  selectionStyle,
  items,
  onItemClick,
  dropTitle,
  dropTitlePadding = [0, 1, 2],
  Item,
  Footer,
  value,
  hasSearch,
  renderComponent,
  searchMargin = [0, 0, 2],
  gap = 0,
  padding = [insetMenuPadding],
  estimateSize = defaultEstimateSize,
  close,
  containerRef,
  ref: forwardedRef,
  showNoSearchResults = true,
  NoSearchResultsComponent = DefaultNoSearchResultsComponent,
  ...rest
}) => {
  const [searchValue, setSearchValue] = useState("")
  const [top = 0, right = top, bottom = top, left = right] = padding || []

  const filteredItems = useMemo(() => {
    if (!searchValue) return items

    const searchLowerCase = searchValue.toLowerCase()

    return items.filter(({ label, value: val, customFiltering }) => {
      if (typeof customFiltering === "function")
        return customFiltering({ searchValue, label, value: val })
      if (typeof label === "string" && label.toLowerCase().includes(searchLowerCase)) return true
      if (!label && typeof val === "string" && val.toLowerCase().includes(searchLowerCase))
        return true
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
      border={dropdownBorder}
      round={insetMenuRound}
      hideShadow={hideShadow}
      margin={[1, 0]}
      column
      tabindex="-1"
      width="auto"
      ref={containerRef}
      {...rest}
    >
      <Box padding={[top, right, 0, left]}>
        {dropTitle && <Flex padding={dropTitlePadding}>{dropTitle}</Flex>}
        {hasSearch && (
          <Box margin={searchMargin}>
            <Search data-testid="dropdown-search" placeholder="Search" onChange={setSearchValue} />
          </Box>
        )}
        {typeof renderComponent === "function" && renderComponent({ searchValue, filteredItems })}
        {showNoSearchResults && filteredItems.length === 0 && searchValue ? (
          <NoSearchResultsComponent />
        ) : null}
      </Box>
      <ItemList ref={mergeRefs(ref, forwardedRef)}>
        <Box padding={[0, right, 0, left]}>
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
                  {...(selectionStyle && { selectionStyle })}
                />
              </div>
            ))}
          </div>
        </Box>
      </ItemList>
      <Box padding={[0, right, bottom, left]}>{Footer && <Footer close={close} />}</Box>
    </Container>
  )
}

export default Dropdown
