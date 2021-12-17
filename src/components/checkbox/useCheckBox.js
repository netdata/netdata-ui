import React from "react"
import useTheme from "src/hooks/use-theme"
import { getColor } from "src/theme/utils"

const makeBorderColor = () => ({
  success: "success",
  error: "error",
  disabled: "inputBorder",
  default: "inputBorder",
})

const makeStyles = ({ theme, disabled, success, error }) => {
  const status = success || error || disabled || "default"
  return {
    checkBox: {
      alignItems: "center",
      width: "20px",
      height: "20px",
      justifyContent: "center",
      background: disabled
        ? getColor("mainBackgroundDisabled")({ theme })
        : getColor("mainBackground")({ theme }),
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
  const styles = makeStyles({ theme, disabled, success, error })

  return { styles }
}

export default useCheckBox
