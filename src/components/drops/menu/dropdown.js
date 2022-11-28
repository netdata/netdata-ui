import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
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
        <Box margin={[4]}>
          <Search
            data-testid={"dropdown-search"}
            defaultValue={searchParams}
            placeholder="Search"
            onChange={handleSearch}
            size="tiny"
          />
        </Box>
      )}
      {filteredItems.map(item => renderItem({ item, itemProps, value, onItemClick }))}
    </Container>
  )
}

export default Dropdown
