import React from "react"
import { Text } from "src/components/typography"
import { ToggleContainer, HiddenToggleInput, StyledToggle, StyledLabel, LabelText } from "./styled"

export const Toggle = ({
  checked,
  disabled,
  className,
  labelLeft,
  labelRight,
  Label,
  colored,
  margin,
  alignSelf,
  ...props
}) => (
  <StyledLabel className={className} margin={margin} alignSelf={alignSelf}>
    {labelLeft && (
      <LabelText as={Label} left>
        {labelLeft}
      </LabelText>
    )}
    <ToggleContainer>
      <HiddenToggleInput disabled={disabled} checked={checked} {...props} />
      <StyledToggle checked={checked} disabled={disabled} colored={colored} role="switch" />
    </ToggleContainer>
    {labelRight && (
      <LabelText as={Label} right>
        {labelRight}
      </LabelText>
    )}
  </StyledLabel>
)

Toggle.defaultProps = {
  colored: false,
  Label: Text,
}
