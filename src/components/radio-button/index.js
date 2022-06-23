import React from "react"
import { Text } from "src/components/typography"
import { Input, Container, IconContainer, StyledIcon } from "./styled"

const radioButtonStyles = {
  disabled: { containerColor: "disabled", dotColor: "disabled", borderColor: "disabled" },
  checked: { containerColor: "inputBg", dotColor: "primary", borderColor: "inputBorder" },
  checkedDisabled: { containerColor: "inputBg", dotColor: "disabled", borderColor: "inputBorder" },
  default: { containerColor: "inputBg", dotColor: "bright", borderColor: "inputBorder" },
}

const RadioButton = ({
  label,
  checked,
  disabled,
  children,
  margin,
  alignSelf,
  iconProps,
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
    <Container disabled={disabled} margin={margin} alignSelf={alignSelf}>
      <Input type="radio" disabled={disabled} checked={checked} {...rest} />
      <IconContainer
        background={radioStyles.containerColor}
        borderColor={radioStyles.borderColor}
        margin={children || label ? [0, 2, 0, 0] : null}
      >
        {showIcon && <StyledIcon name="dot" color={radioStyles.dotColor} {...iconProps} />}
      </IconContainer>
      {children}
      {label && !children && <Text>{label}</Text>}
    </Container>
  )
}

export default RadioButton
