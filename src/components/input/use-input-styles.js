import React from "react"

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
const useInputStyles = ({ size, disabled, success, error, focused }) => {
  const status = success ? "success" : error ? "error" : disabled ? "disabled" : "default"

  const sizeStyles = React.useCallback(() => {
    switch (size) {
      case "tiny":
        return {
          height: "30px",
          padding: [1.2, 2, 1.2, 2],
        }
      case "small":
        return {
          height: "34px",
          padding: [1.8, 3, 1.8, 3],
        }
      default: {
        return {
          height: "42px",
          padding: [2.8, 4, 2.8, 4],
        }
      }
    }
  }, [size])

  const inputContainer = React.useMemo(() => {
    return {
      width: "100%",
      ...sizeStyles(),
      border: {
        size: "1px",
        type: "solid",
        color: focused ? makeColor({ defaultColor: "inputFocus" })[status] : makeColor({})[status],
        side: "all",
      },
      round: true,
      _hover: {
        border: {
          size: "1px",
          type: "solid",
          color: makeColor({ defaultColor: "inputHover" })[status],
          side: "all",
        },
      },
    }
  }, [status, sizeStyles, focused])

  const iconContainer = React.useCallback(
    ({ iconRight = false, iconLeft = false }) => {
      return {
        height: "100%",
        bacground: disabled ? "mainBackgroundDisabled" : "mainBackground",
        alignItems: "center",
        round: true,
        margin: [0, iconRight ? 0 : 2.5, 0, iconLeft ? 0 : 2.5],
      }
    },
    [disabled]
  )

  return { styles: { inputContainer, iconContainer } }
}

export default useInputStyles
