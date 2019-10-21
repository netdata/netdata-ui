import React from "react"

import {
  CheckboxContainer,
  HiddenCheckboxInput,
  StyledCheckbox,
  StyledLabel,
  LabelText,
  StyledIcon,
  AccessibleArea,
} from "./styled"

export interface CheckboxProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  label?: string
  labelPosition?: "left" | "right"
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  disabled?: boolean
}

export const Checkbox = ({ checked, className, labelPosition, label, ...props }: CheckboxProps) => {
  return (
    <StyledLabel className={className}>
      <AccessibleArea />
      {label && labelPosition === "left" && <LabelText left>{label}</LabelText>}
      <CheckboxContainer>
        <HiddenCheckboxInput checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
          <StyledIcon name="checkmark_s" />
        </StyledCheckbox>
      </CheckboxContainer>
      {label && labelPosition === "right" && <LabelText right>{label}</LabelText>}
    </StyledLabel>
  )
}

Checkbox.defaultProps = {
  labelPosition: "right",
}
