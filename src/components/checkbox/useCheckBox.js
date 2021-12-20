import React from "react"
import useBoolean from "src/hooks/use-boolean"

const makeBorderColor = () => ({
  success: "success",
  error: "error",
  disabled: "inputBorder",
  default: "inputBorder",
})

const makeShadowColor = () => ({
  success: "success",
  error: "error",
  disabled: "inputBorder",
  default: "controlFocused",
})

const makeStyles = ({ status, isFocused }) => {
  return {
    checkBox: {
      alignItems: "center",
      width: "20px",
      height: "20px",
      justifyContent: "center",
      background: status === "disabled" ? "mainBackgroundDisabled" : "mainBackground",
      boxShadow: isFocused ? { size: "0 0 0 1px", color: makeShadowColor[status] } : null,
      border: {
        size: "1px",
        type: "solid",
        color: makeBorderColor()[status],
        side: "all",
      },
      round: "4px",
    },
  }
}
;` `
const useCheckBox = ({ disabled, success, error, onFocus }) => {
  const [isFocused, setFocused] = useBoolean()

  const handleOnFocus = React.useCallback(
    e => {
      setFocused.on()
      if (onFocus) onFocus(e)
    },
    [onfocus]
  )

  const status = success ? "success" : error ? "error" : disabled ? "disabled" : "default"
  const styles = makeStyles({ status, disabled, isFocused })

  const getInputProps = React.useCallback(
    (props = {}) => {
      return { ...props, onFocus: e => handleOnFocus(e), onBlur: () => setFocused.off() }
    },
    [handleOnFocus]
  )

  return { styles, getInputProps }
}

export default useCheckBox
