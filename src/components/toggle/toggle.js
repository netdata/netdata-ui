import React from "react"
import { Text } from "@/components/typography"
import { ToggleContainer, HiddenToggleInput, StyledToggle, StyledLabel, LabelText } from "./styled"

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
}) => (
  <StyledLabel className={className} margin={margin} alignSelf={alignSelf} disabled={disabled}>
    {labelLeft && (
      <LabelText as={Label} left>
        {labelLeft}
      </LabelText>
    )}
    <ToggleContainer>
      <HiddenToggleInput role="switch" disabled={disabled} checked={checked} {...props} />
      <StyledToggle
        checked={checked}
        disabled={disabled}
        colored={colored}
        aria-hidden="true"
        {...toggleProps}
      />
    </ToggleContainer>
    {labelRight && (
      <LabelText as={Label} right>
        {labelRight}
      </LabelText>
    )}
  </StyledLabel>
)
