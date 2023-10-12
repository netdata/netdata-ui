import React from "react"
import { Text } from "@/components/typography"
import { Container, IconContainer, Input, StyledIcon } from "./styled"

const radioButtonStyles = {
  disabled: {
    containerColor: "disabledBackground",
    dotColor: "disabledBackground",
    borderColor: "disabledBackground",
  },
  checked: { containerColor: "inputBg", dotColor: "primary", borderColor: "inputBorder" },
  checkedDisabled: { containerColor: "inputBg", dotColor: "disabled", borderColor: "inputBorder" },
  default: { containerColor: "inputBg", dotColor: "bright", borderColor: "inputBorder" },
}

const RadioButton = ({
  alignItems = "center",
  alignSelf,
  checked,
  children,
  disabled,
  iconProps,
  label,
  margin,
  ...rest
}) => {
  const radioStatus =
    disabled && !checked
      ? "disabled"
      : checked && disabled
      ? "checkedDisabled"
      : checked
      ? "checked"
      : "default"

  const radioStyles = React.useMemo(() => {
    return radioButtonStyles[radioStatus]
  }, [radioStatus])

  const showIcon = radioStatus === "checkedDisabled" || radioStatus === "checked"

  return (
    <Container alignItems={alignItems} alignSelf={alignSelf} disabled={disabled} margin={margin}>
      <Input type="radio" disabled={disabled} checked={checked} {...rest} />
      <IconContainer
        background={radioStyles.containerColor}
        borderColor={radioStyles.borderColor}
        margin={children || label ? [0.5, 2, 0, 0] : null}
      >
        {showIcon && <StyledIcon name="dot" color={radioStyles.dotColor} {...iconProps} />}
      </IconContainer>
      {children}
      {label && !children && <Text>{label}</Text>}
    </Container>
  )
}

export default RadioButton
