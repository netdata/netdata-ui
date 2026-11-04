import React from "react"
import { Text } from "@/components/typography"
import { Container, IconContainer, Input, StyledIcon } from "./styled"

// Disabled keeps the enabled look; the container dims it once (opacity 0.4).
const radioButtonStyles = {
  checked: { containerColor: ["transparent", "full"], dotColor: "primary", borderColor: "primary" },
  default: { containerColor: ["transparent", "full"], dotColor: "primary", borderColor: "textLite" },
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
  const radioStyles = checked ? radioButtonStyles.checked : radioButtonStyles.default

  return (
    <Container alignItems={alignItems} alignSelf={alignSelf} disabled={disabled} margin={margin}>
      <Input type="radio" disabled={disabled} checked={checked} {...rest} />
      <IconContainer
        background={radioStyles.containerColor}
        borderColor={radioStyles.borderColor}
        margin={children || label ? [0, 2, 0, 0] : null}
      >
        {checked && <StyledIcon name="dot" color={radioStyles.dotColor} {...iconProps} />}
      </IconContainer>
      {children}
      {label && !children && <Text>{label}</Text>}
    </Container>
  )
}

export default RadioButton
