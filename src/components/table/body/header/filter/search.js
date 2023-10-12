import React from "react"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import SearchInput from "@/components/search"
import { debounce } from "throttle-debounce"

const SearchFilter = ({ column, testPrefix }) => {
  const { id = "" } = column

  const handleSearch = debounce(300, e => {
    column.setFilterValue(e.target.value)
  })
  return (
    <Box
      data-testid={`netdata-table-filter-${id}${testPrefix}`}
      as={SearchInput}
      defaultValue={column.getFilterValue()}
      width={{ max: 50 }}
      placeholder={"Search..."}
      iconRight={<Icon color="textLite" name="magnify" height="18px" width="18px" />}
      onChange={handleSearch}
    />
  )
}

export default SearchFilter
