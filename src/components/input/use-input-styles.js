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
  const defaultStyles = {
    width: "100%",
  }
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

  const styles = React.useMemo(() => {
    return {
      inputContainer: {
        ...defaultStyles,
        ...sizeStyles(),
        border: {
          size: "1px",
          type: "solid",
          color: focused
            ? makeColor({ defaultColor: "inputFocus" })[status]
            : makeColor({})[status],
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
      },
    }
  }, [status, sizeStyles, focused])

  return { styles }
}

export default useInputStyles
