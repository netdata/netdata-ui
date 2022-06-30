import React from "react"
import DropdownFilter from "./dropdownFilter"

import Box from "src/components/templates/box"
import Flex from "src/components/templates/flex"

import { TextInput } from "src/components/input"

const Comparisons = [
  { value: "gt", label: "Greater than" },
  { value: "eq", label: "Equal" },
  { value: "lt", label: "Less than" },
]

const ComparisonFilter = ({ column }) => {
  const { setFilterValue, filterValue } = column
  return (
    <Flex gap={2}>
      <DropdownFilter
        value={filterValue ? filterValue[0] : Comparisons[0]}
        options={Comparisons}
        onChange={value => setFilterValue(old => [value, old?.[1]])}
      />

      <Box
        as={TextInput}
        width={{ max: 50 }}
        value={filterValue ? filterValue[1] : null}
        onChange={e => setFilterValue(old => [old?.[0], e.target.value])}
        pattern="[0-9]*(.[0-9]+)?"
        inputMode="decimal"
      />
    </Flex>
  )
}

export default ComparisonFilter
