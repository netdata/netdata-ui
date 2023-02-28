import React, { forwardRef } from "react"
import SearchInput from "./searchInput"

const Search = forwardRef(({ value, onChange, placeholder, ...rest }, ref) => (
  <SearchInput
    inputRef={ref}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    size="small"
    {...rest}
  />
))

export default Search
