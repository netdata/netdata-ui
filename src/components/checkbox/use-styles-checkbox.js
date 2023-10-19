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
  const status = success ? "success" : error ? "error" : "default"

  const styledCheckbox = useMemo(
    () => ({
      alignItems: "center",
      background: "inputBg",
      backgroundOpacity: disabled ? 0.4 : 1,
      border: {
        size: "1px",
        type: "solid",
        color: makeColor({ defaultColor: "inputBorder" })[status],
        side: "all",
      },
      height: "inherit",
      justifyContent: "center",
      round: true,
      width: "inherit",
      _focus: {
        border: {
          color: makeColor({ defaultColor: "inputBorderFocus" })[status],
          side: "all",
          size: "1px",
          type: "solid",
        },
        boxShadow: {
          color: makeColor({ defaultColor: "inputBorderFocus" })[status],
          size: "0 0 0 1px",
        },
      },
      _hover: {
        border: {
          color: makeColor({ defaultColor: "inputBorderHover" })[status],
          side: "all",
          size: "1px",
          type: "solid",
        },
        boxShadow: {
          color: makeColor({ defaultColor: "inputBorderHover" })[status],
          size: "0 0 0 1px",
        },
      },
    }),
    [status, focused]
  )

  return { styles: { styledCheckbox } }
}

export default useCheckboxStyles
