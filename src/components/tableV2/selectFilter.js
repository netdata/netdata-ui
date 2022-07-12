import React from "react"
import DropdownFilter from "./dropdownFilter"

const SelectFilter = ({ isMulti = false, column, options = [] }) => {
  const { setFilterValue, getFilterValue } = column

  const filterValue = getFilterValue()

  return (
    <DropdownFilter
      value={filterValue}
      isMulti={isMulti}
      options={options}
      onChange={value => setFilterValue(value)}
    />
  )
}

export default SelectFilter
