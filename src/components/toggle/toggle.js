import React from "react"
import { Text } from "@/components/typography"
import { ToggleContainer, HiddenToggleInput, StyledToggle, StyledLabel, LabelText } from "./styled"

const isAccessibilityProp = key => key.startsWith("aria-") || key === "title"

const splitAccessibility = toggleProps =>
  Object.entries(toggleProps).reduce(
    (parts, [key, value]) => {
      parts[isAccessibilityProp(key) ? "accessibility" : "visual"][key] = value
      return parts
    },
    { accessibility: {}, visual: {} }
  )

export const Toggle = ({
  checked,
  disabled,
  className,
  children,
  labelLeft = children,
  labelRight,
  Label = Text,
  colored = false,
  margin,
  alignSelf,
  toggleProps = {},
  ...props
}) => {
  const { accessibility, visual } = splitAccessibility(toggleProps)

  return (
    <StyledLabel className={className} margin={margin} alignSelf={alignSelf} disabled={disabled}>
      {labelLeft && (
        <LabelText as={Label} left>
          {labelLeft}
        </LabelText>
      )}
      <ToggleContainer>
        <HiddenToggleInput
          role="switch"
          disabled={disabled}
          checked={checked}
          {...accessibility}
          {...props}
        />
        <StyledToggle
          checked={checked}
          disabled={disabled}
          colored={colored}
          {...visual}
          aria-hidden="true"
        />
      </ToggleContainer>
      {labelRight && (
        <LabelText as={Label} right>
          {labelRight}
        </LabelText>
      )}
    </StyledLabel>
  )
}
