import React from "react"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import SearchInput from "@/components/search"

const SearchFilter = ({ column, testPrefix }) => {
  const { id = "" } = column

  return (
    <Box
      data-testid={`netdata-table-filter-${id}${testPrefix}`}
      as={SearchInput}
      value={column.getFilterValue()}
      width={{ max: 50 }}
      placeholder={"Search..."}
      iconRight={<Icon color="textLite" name="magnify" height="18px" width="18px" />}
      onChange={column.setFilterValue}
    />
  )
}

export default SearchFilter
