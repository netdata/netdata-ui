import React from "react"
import {
  CheckboxContainer,
  HiddenCheckboxInput,
  StyledCheckbox,
  Icon,
  StyledLabel,
  LabelText,
  AccessibleArea,
} from "./styled"

interface Props {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  label?: string
  labelPosition?: "left" | "right"
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
}

export const Checkbox = ({ checked, className, labelPosition, label, ...props }: Props) => {
  return (
    <StyledLabel className={className}>
      <AccessibleArea />
      {label && labelPosition === "left" && <LabelText left>{label}</LabelText>}
      <CheckboxContainer>
        <HiddenCheckboxInput checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      {label && labelPosition === "right" && <LabelText right>{label}</LabelText>}
    </StyledLabel>
  )
}

Checkbox.defaultProps = {
  labelPosition: "right",
}
