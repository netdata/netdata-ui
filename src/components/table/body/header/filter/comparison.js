import React, { useEffect, useCallback, useState } from "react"
import DropdownFilter from "./dropdown"

import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"

import { TextInput } from "@/components/input"
import { debounce } from "throttle-debounce"

const Comparisons = [
  { value: "all", label: "All" },
  { value: "gt", label: "Greater than" },
  { value: "eq", label: "Equal" },
  { value: "lt", label: "Less than" },
]

const ComparisonFilter = ({ column }) => {
  const { setFilterValue, getFilterValue } = column

  const filterValue = getFilterValue()
  const [query, setQuery] = useState(filterValue?.[1] || "")

  useEffect(() => {
    setFilterValue(old => [Comparisons[0], old?.[1]])
  }, [])

  const handleComparisonChange = useCallback(
    value => {
      setFilterValue(old => [value, old?.[1]])
    },
    [setFilterValue]
  )

  const debouncedSetFilter = useCallback(
    debounce(300, value => {
      setFilterValue(old => [old?.[0], value])
    }),
    [setFilterValue]
  )

  const handleValueChange = useCallback(
    e => {
      const value = e.target.value
      setQuery(value)
      debouncedSetFilter(value)
    },
    [debouncedSetFilter]
  )

  return (
    <Flex gap={2}>
      <DropdownFilter
        value={filterValue ? filterValue[0] : Comparisons[0]}
        options={Comparisons}
        onChange={handleComparisonChange}
      />

      <Box
        as={TextInput}
        width={{ max: 50 }}
        value={query}
        onChange={handleValueChange}
        pattern="[0-9]*(.[0-9]+)?"
        inputMode="decimal"
        size="tiny"
      />
    </Flex>
  )
}

export default ComparisonFilter
