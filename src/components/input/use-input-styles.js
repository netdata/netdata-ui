<<<<<<< HEAD
import { useMemo, useCallback } from "react"

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
const useInputStyles = ({ size = "large", disabled, success, error, focused }) => {
  const status = success ? "success" : error ? "error" : disabled ? "disabled" : "default"

  const sizeStyles = useMemo(() => {
    switch (size) {
      case "tiny":
        return {
          height: "30px",
          padding: [1, 2, 1, 2],
        }
      case "small":
        return {
          height: "34px",
          padding: [2, 3, 2, 3],
        }
      default: {
        return {
          height: "42px",
          padding: [2.5, 4, 2.5, 4],
        }
      }
    }
  }, [size])

  const inputContainer = useMemo(() => {
    return {
      width: "100%",
      ...sizeStyles,
      background: disabled ? "mainBackgroundDisabled" : "mainBackground",
      border: {
        size: "1px",
        type: "solid",
        color: focused
          ? makeColor({ defaultColor: "inputBorderFocus" })[status]
          : makeColor({})[status],
        side: "all",
      },
      round: true,
      _hover: {
        border: {
          size: "1px",
          type: "solid",
          color: makeColor({ defaultColor: "inputBorderHover" })[status],
          side: "all",
        },
      },
    }
  }, [status, sizeStyles, focused])

  const iconContainer = useCallback(
    ({ iconRight = false, iconLeft = false }) => {
      return {
        height: "100%",
        background: disabled ? "mainBackgroundDisabled" : "mainBackground",
        alignItems: "center",
        round: true,
        margin: [0, iconRight ? 0 : 2.5, 0, iconLeft ? 0 : 2.5],
      }
    },
    [disabled]
  )

  return { styles: { inputContainer, iconContainer } }
=======
const useInputStyles = ({ size }) => {
  switch (size) {
    case "tiny":
      return {
        height: "30px",
        padding: "5px 8px 5px 8px",
      }
    case "small":
      return {
        height: "34px",
        padding: "7px 12px 7px 12px",
      }
    default: {
      return {
        height: "42px",
        padding: "11px 16px 11px 16px",
      }
    }
  }
>>>>>>> add input styles
}

export default useInputStyles
