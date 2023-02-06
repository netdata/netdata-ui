import React from "react"
import Select from "src/components/select"

const DropdownFilter = ({ onChange, value, options, isMulti, styles }) => (
  <Select
    isMulti={isMulti}
    options={options}
    value={value}
    onChange={option => {
      onChange(option)
    }}
    styles={styles}
  />
)

export default DropdownFilter
