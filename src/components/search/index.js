import React, { forwardRef } from "react"
import { Icon } from "@/components/icon"
import { TextInput } from "@/components/input"

const Search = forwardRef(({ value, onChange, placeholder, ...rest }, ref) => (
  <TextInput
    iconLeft={<Icon name="search" color="textLite" width="14px" height="14px" />}
    inputRef={ref}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...rest}
  />
))

export default Search
