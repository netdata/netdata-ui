import React from "react"

import { Select } from "src/components/select"

const DropdownFilter = ({ onChange, value, options, isMulti, styles }) => {
  const selectedValue = value

  return (
    <Select
      isMulti={isMulti}
      options={options}
      value={selectedValue}
      onChange={option => {
        onChange(option)
      }}
      styles={styles}
    />
  )
}

export default DropdownFilter
