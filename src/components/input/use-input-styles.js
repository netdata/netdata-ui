import React from "react"

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
          color: makeBorderColor()[status],
          side: "all",
        },
        boxShadow: focused ? { size: "0 0 0 1px", color: makeShadowColor()[status] } : null,
        round: true,
      },
    }
  }, [status, sizeStyles])

  return { styles }
}

export default useInputStyles
