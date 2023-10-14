import React from "react"
import ComparisonFilter from "./comparison"
import SelectFilter from "./select"
import SearchFilter from "./search"

const availableFilters = {
  comparison: ComparisonFilter,
  select: SelectFilter,
  default: SearchFilter,
}

const Filter = ({ column, testPrefix, index }) => {
  if (!column.getCanFilter()) return null

  const meta =
    typeof column.columnDef.meta === "function"
      ? column.columnDef.meta({}, column, index)
      : column.columnDef.meta

  const selectedFilter = meta && meta?.filter?.component ? meta?.filter?.component : "default"
  const filterOptions = meta && meta?.filter ? meta?.filter : {}
  const FilterComponent = availableFilters[selectedFilter]

  return <FilterComponent column={column} testPrefix={testPrefix} {...filterOptions} />
}

export default Filter
