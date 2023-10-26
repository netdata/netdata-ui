import React, { forwardRef, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import { Icon } from "@/components/icon"
import { TextInput } from "@/components/input"
import { IconButton } from "@/components/button"

const Search = forwardRef(
  ({ value: defaultValue = "", onChange, onReset, placeholder, ...rest }, ref) => {
    const [value, setValue] = useState(defaultValue)

    useDebounce(() => onChange(value), 300, [value])

    return (
      <TextInput
        iconLeft={
          <Icon name="search" color={value ? "textFocus" : "textLite"} width="14px" height="14px" />
        }
        iconRight={
          (!!value || !!defaultValue) && (
            <IconButton
              icon="x"
              iconColor={value ? "textFocus" : "textLite"}
              width="14px"
              height="14px"
              onClick={() => (onReset ? onReset() : setValue(""))}
              padding={[0]}
              neutral
            />
          )
        }
        inputRef={ref}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        size="small"
        {...rest}
      />
    )
  }
)

export default Search
