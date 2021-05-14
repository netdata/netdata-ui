import { useState, useCallback } from "react"

export const useInputValue = ({ value = "", onChange, maxChars }) => {
  const [inputValue, setValue] = useState(value)
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = useCallback(
    e => {
      const newValue = e.target.value
      if (maxChars && newValue.length > maxChars) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      setValue(newValue)
      if (!isDirty) {
        setIsDirty(true)
      }
      if (onChange) {
        onChange(e)
      }
    },
    [isDirty, maxChars, onChange]
  )

  const maxCharsIndicator = maxChars ? `${inputValue.length}/${maxChars}` : ""

  const resetValue = useCallback((v = "") => {
    setValue(v)
    setIsDirty(false)
  }, [])

  return [
    inputValue,
    handleChange,
    maxCharsIndicator,
    isDirty,
    { setIsDirty, setValue, resetValue },
  ]
}
