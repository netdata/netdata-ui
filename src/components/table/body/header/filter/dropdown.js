import React from "react"
import Select from "@/components/select"

const DropdownFilter = ({
  "data-ga": dataGA,
  "data-testid": dataTestId,
  onChange,
  value,
  options,
  isMulti,
  styles,
}) => (
  <Select
    data-testid={dataTestId}
    data-ga={dataGA}
    isMulti={isMulti}
    options={options}
    value={value}
    onChange={option => {
      onChange(option)
    }}
    styles={{ size: "tiny", ...(styles || {}) }}
  />
)

export default DropdownFilter
