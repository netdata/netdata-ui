import React, { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import usePrevious from "@/hooks/usePrevious"
import { Icon } from "@/components/icon"
import { TextInput } from "@/components/input"
import { IconButton } from "@/components/button"

const Search = ({
  value: defaultValue = "",
  onChange,
  reset,
  onReset,
  placeholder,
  ref,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue)
  const prevValue = usePrevious(value)

  useDebounce(
    () => {
      if (value === defaultValue && typeof prevValue === "undefined") return
      onChange?.(value)
    },
    300,
    [value]
  )

  useEffect(() => {
    if (reset) {
      setValue("")
    }
  }, [reset])

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
            onClick={() => {
              onReset?.()
              setValue("")
            }}
            padding={[0]}
            neutral
            compact
          />
        )
      }
      inputRef={ref}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder}
      size="small"
      title="search"
      // Keep the clear button slot reserved while empty, so the field does not widen when typing starts.
      hasIconRight
      {...rest}
    />
  )
}

export default Search
