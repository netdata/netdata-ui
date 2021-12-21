import React, { useRef } from "react"

import {
  CheckboxContainer,
  HiddenCheckboxInput,
  StyledCheckbox,
  StyledLabel,
  LabelText,
  StyledIcon,
  AccessibleArea,
} from "./styled"

export const Checkbox = ({
  checked,
  disabled,
  className,
  labelPosition,
  label,
  indeterminate,
  ref,
  margin,
  alignSelf,
  iconProps,
  ...props
}) => {
  const preparedRef = useRef(null)
  const checkboxInput = ref || preparedRef

  if (checkboxInput.current) {
    checkboxInput.current.indeterminate = Boolean(indeterminate)
  }

  return (
    <StyledLabel disabled={disabled} className={className} margin={margin} alignSelf={alignSelf}>
      <AccessibleArea />
      {label && labelPosition === "left" && <LabelText left>{label}</LabelText>}
      <CheckboxContainer>
        <HiddenCheckboxInput disabled={disabled} checked={checked} ref={checkboxInput} {...props} />
        <StyledCheckbox indeterminate={indeterminate} checked={checked} disabled={disabled}>
          <StyledIcon
            name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
            disabled={disabled}
            {...iconProps}
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
