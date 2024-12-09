import React, { useState, useCallback } from "react"
import DropdownFilter from "./dropdown"

const all = { value: "all", label: "All" }

const SelectFilter = ({ column, isMulti = false, options = [], tiny = true, ...rest }) => {
  const { setFilterValue, getFilterValue } = column
  const filterValue = getFilterValue()

  const optionsWithExtraChoice = isMulti ? options : [all, ...options]
  const selectedValue = isMulti ? filterValue : optionsWithExtraChoice[0]
  const [val, setVal] = useState(filterValue ? filterValue : selectedValue)

  const onChange = useCallback(
    value => {
      setFilterValue(value)
      setVal(value)
    },
    [setVal]
  )

  return (
    <DropdownFilter
      value={val}
      isMulti={isMulti}
      options={optionsWithExtraChoice}
      onChange={onChange}
      styles={tiny && { size: "tiny" }}
      {...rest}
    />
  )
}

export default SelectFilter
