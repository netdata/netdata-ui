import { useCallback, useRef, useEffect } from "react"
import useToggle from "src/hooks/use-toggle"
import { mergeRefs } from "src/utils"

const useCheckbox = ({ onChange, indeterminate, disabled, checked }) => {
  const [isFocused, , focusOn, focusOff] = useToggle()
  const checkboxInputRef = useRef(null)

  const handleChange = useCallback(
    event => {
      if (disabled) {
        event.preventDefault()
        return
      }

      onChange?.(event)
    },
    [disabled, onChange]
  )

  useEffect(() => {
    if (checkboxInputRef.current) {
      checkboxInputRef.current.indeterminate = Boolean(indeterminate)
    }
  }, [indeterminate])

  const getCheckBoxProps = useCallback(() => {
    return {
      "data-focus": isFocused ? "" : undefined,
      "data-disabled": disabled ? "" : undefined,
      indeterminate,
      checked,
    }
  }, [isFocused, disabled, checked, indeterminate])

  const getInputProps = useCallback(
    (forwardedRef = null, props) => {
      return {
        ...props,
        type: "checkbox",
        ref: mergeRefs(checkboxInputRef, forwardedRef),
        onChange: handleChange,
        onFocus: focusOn,
        onBlur: focusOff,
        checked,
        disabled,
      }
    },
    [focusOff, focusOn, handleChange, checked, disabled]
  )

  const state = {
    disabled,
    indeterminate,
    checked,
    isFocused,
  }

  return { getCheckBoxProps, getInputProps, state }
}

export default useCheckbox
