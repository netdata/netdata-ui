import React from "react"

import { Select } from "src/components/select"

const DropdownFilter = ({ onChange, value, options }) => {
  const all = { value: "all", label: "All" }
  const selectedValue = value || all

  return (
    <Select
      options={[all, ...options]}
      value={selectedValue}
      onChange={option => {
        onChange(option)
      }}
    />
  )
}

export default DropdownFilter
