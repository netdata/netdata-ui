import { useMemo } from "react"

const makeColor = ({
  defaultColor = "inputBorder",
  success = "success",
  error = "error",
  disabled = "inputBorder",
}) => ({
  success: success,
  error: error,
  disabled: disabled,
  default: defaultColor,
})
const useCheckboxStyles = ({ disabled, success, error, focused }) => {
  const status = success ? "success" : error ? "error" : disabled ? "disabled" : "default"

  const styledCheckbox = useMemo(() => {
    return {
      width: "20px",
      height: "20px",
      background: disabled ? "mainBackgroundDisabled" : "mainBackground",
      justifyContent: "center",
      alignItems: "center",
      border: {
        size: "1px",
        type: "solid",
        color: focused
          ? makeColor({ defaultColor: "inputBorderFocus" })[status]
          : makeColor({})[status],
        side: "all",
      },
      round: true,
    }
  }, [status, focused])

  return { styles: { styledCheckbox } }
}

export default useCheckboxStyles
