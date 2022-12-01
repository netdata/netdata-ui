import { useMemo } from "react"

const makeColor = ({
  defaultColor = "inputBorder",
  disabled = "inputBorder",
  error = "error",
  success = "success",
}) => ({
  default: defaultColor,
  disabled: disabled,
  error: error,
  success: success,
})
const useCheckboxStyles = ({ disabled, success, error, focused }) => {
  const status = success ? "success" : error ? "error" : disabled ? "disabled" : "default"

  const styledCheckbox = useMemo(
    () => ({
      alignItems: "center",
      background: disabled ? "mainBackgroundDisabled" : "mainBackground",
      border: {
        size: "1px",
        type: "solid",
        color: focused
          ? makeColor({ defaultColor: "inputBorderFocus" })[status]
          : makeColor({})[status],
        side: "all",
      },
      height: "inherit",
      justifyContent: "center",
      round: true,
      width: "inherit",
      _focus: {
        border: {
          color: makeColor({ defaultColor: "controlFocused" })[status],
          side: "all",
          size: "1px",
          type: "solid",
        },
        boxShadow: {
          color: makeColor({ defaultColor: "controlFocused" })[status],
          size: "0 0 0 1px",
        },
      },
    }),
    [status, focused]
  )

  return { styles: { styledCheckbox } }
}

export default useCheckboxStyles
