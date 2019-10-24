import { useState, useCallback } from "react"

type InputValue = string
type MaxCharsIndicator = string
type UseInputValue = ({
  value,
  onChange,
  maxChars,
}: {
  value?: string
  onChange?: ChangeEventHandler
  maxChars?: number
}) => [InputValue, ChangeEventHandler, MaxCharsIndicator]

export const useInputValue: UseInputValue = ({ value = "", onChange, maxChars }) => {
  const [inputValue, setValue] = useState(value)

  const handleChange = useCallback(
    (e: ReactInputChangeEvent) => {
      const newValue = e.target.value
      if (maxChars && newValue.length > maxChars) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      setValue(newValue)
      if (onChange) {
        onChange(e)
      }
    },
    [maxChars, onChange]
  )

  const maxCharsIndicator = maxChars ? `${inputValue.length}/${maxChars}` : ""

  return [inputValue, handleChange, maxCharsIndicator]
}
