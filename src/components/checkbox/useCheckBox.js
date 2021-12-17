import React from "react"
import useTheme from "src/hooks/use-theme"

const makeBorderColor = () => ({
  success: "success",
  error: "error",
  disabled: "inputBorder",
  default: "inputBorder",
})

const makeStyles = ({ theme, status }) => {
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
        color: makeBorderColor({ theme })[status],
        side: "all",
      },
      round: "4px",
    },
  }
}

const useCheckBox = ({ disabled, success, error }) => {
  const theme = useTheme()
  const status = success ? "success" : error ? "error" : disabled ? "disabled" : "default"
  const styles = makeStyles({ theme, status, disabled })

  return { styles }
}

export default useCheckBox
