import React from "react"
import useTheme from "src/hooks/use-theme"
import useBoolean from "src/hooks/use-boolean"

const makeBorderColor = () => ({
  success: "success",
  error: "error",
  disabled: "inputBorder",
  default: "inputBorder",
})

const makeStyles = ({ theme, status, isFocused }) => {
  return {
    checkBox: {
      alignItems: "center",
      width: "20px",
      height: "20px",
      justifyContent: "center",
      background: status === "disabled" ? "mainBackgroundDisabled" : "mainBackground",
      border: {
        size: "1px",
        type: "solid",
        color: !isFocused ? makeBorderColor({ theme })[status] : "warningText",
        side: "all",
      },
      round: "4px",
    },
  }
}
;` `
const useCheckBox = ({ disabled, success, error, onFocus }) => {
  const [isFocused, setFocused] = useBoolean()
  const handleOnFocus = e => {
    setFocused.on()
    if (onFocus) onFocus(e)
  }

  const theme = useTheme()
  const status = success ? "success" : error ? "error" : disabled ? "disabled" : "default"
  const styles = makeStyles({ theme, status, disabled, isFocused })
  const getInputProps = React.useCallback((props = {}) => {
    return { ...props, onFocus: e => handleOnFocus(e), onBlur: () => setFocused.off() }
  })

  return { styles, getInputProps }
}

export default useCheckBox
