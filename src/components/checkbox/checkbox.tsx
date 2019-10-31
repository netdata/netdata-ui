import React, { useRef, FC } from "react"

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
  indeterminate?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  disabled,
  className,
  labelPosition,
  label,
  indeterminate,
  ref,
  ...props
}: CheckboxProps) => {
  const preparedRef = useRef(null)
  const checkboxInput = ref || preparedRef

  if (checkboxInput.current) {
    checkboxInput.current.indeterminate = Boolean(indeterminate)
  }

  return (
    <StyledLabel className={className}>
      <AccessibleArea />
      {label && labelPosition === "left" && <LabelText left>{label}</LabelText>}
      <CheckboxContainer>
        <HiddenCheckboxInput disabled={disabled} checked={checked} ref={checkboxInput} {...props} />
        <StyledCheckbox indeterminate={indeterminate} checked={checked} disabled={disabled}>
          <StyledIcon
            name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
            disabled={disabled}
          />
        </StyledCheckbox>
      </CheckboxContainer>
      {label && labelPosition === "right" && <LabelText right>{label}</LabelText>}
    </StyledLabel>
  )
}

Checkbox.defaultProps = {
  labelPosition: "right",
}
