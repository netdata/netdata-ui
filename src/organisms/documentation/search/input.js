import React, { useState, useCallback } from "react"
import useDebounce from "@/hooks/useDebounce"
import { TextInput } from "@/components/input"
import { Icon } from "@/components/icon"

const SearchInput = ({ value: defaultValue, setSearchTerm, setSearchView }) => {
  const [value, setValue] = useState(defaultValue)

  useDebounce(
    () => {
      setSearchTerm(value)
      if (value.length < 3) return
      setSearchView()
    },
    300,
    [value]
  )

  const onChange = useCallback(e => setValue(e.target.value), [])

  return (
    <TextInput
      value={value}
      onChange={onChange}
      placeholder="Search Netdata’s docs & community"
      autoFocus
      iconLeft={<Icon name="search_s" size="small" color={value ? "text" : "border"} />}
    />
  )
}

export default SearchInput
