import { useState, useCallback } from "react"
import { ChangeEventHandler, ReactInputChangeEvent } from "./types"

type InputValue = string
type MaxCharsIndicator = string
type IsDirty = boolean
type SetIsDirty = React.Dispatch<React.SetStateAction<boolean>>
type UseInputValue = ({
  value,
  onChange,
  maxChars,
}: {
  value?: string
  onChange?: ChangeEventHandler
  maxChars?: number
}) => [InputValue, ChangeEventHandler, MaxCharsIndicator, IsDirty, SetIsDirty]

export const useInputValue: UseInputValue = ({ value = "", onChange, maxChars }) => {
  const [inputValue, setValue] = useState(value)
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = useCallback(
    (e: ReactInputChangeEvent) => {
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

  return [inputValue, handleChange, maxCharsIndicator, isDirty, setIsDirty]
}
