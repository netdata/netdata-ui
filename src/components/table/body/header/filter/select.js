import React from "react"
import DropdownFilter from "./dropdown"

const all = { value: "all", label: "All" }

const SelectFilter = ({ column, isMulti = false, options = [], tiny = true, ...rest }) => {
  const { setFilterValue, getFilterValue } = column
  const filterValue = getFilterValue()

  const optionsWithExtraChoice = isMulti ? options : [all, ...options]
  const selectedValue = isMulti ? filterValue : optionsWithExtraChoice[0]

  return (
    <DropdownFilter
      value={filterValue ? filterValue : selectedValue}
      isMulti={isMulti}
      options={optionsWithExtraChoice}
      onChange={value => setFilterValue(value)}
      styles={tiny && { size: "tiny" }}
      {...rest}
    />
  )
}

export default SelectFilter
