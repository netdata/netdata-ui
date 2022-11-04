import React from "react"

import { Select } from "src/components/select"

const DropdownFilter = ({ onChange, value, options, isMulti }) => {
  const selectedValue = value

  return (
    <Select
      isMulti={isMulti}
      options={options}
      value={selectedValue}
      onChange={option => {
        onChange(option)
      }}
    />
  )
}

export default DropdownFilter
