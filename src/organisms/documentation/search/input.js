import React, { useState, useCallback } from "react"
import { useDebounce } from "react-use"
import { TextInput } from "src/components/input"
import { Icon } from "src/components/icon"

const SearchInput = ({ defaultValue, setSearchTerm, setSearchView }) => {
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
      metaShrinked
      iconLeft={<Icon name="search_s" size="small" color={value ? "text" : "border"} />}
    />
  )
}

export default SearchInput
