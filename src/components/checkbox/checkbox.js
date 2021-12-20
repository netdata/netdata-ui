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
import useCheckBox from "./useCheckBox"

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
  const { styles, getInputProps } = useCheckBox({ disabled })

  if (checkboxInput.current) {
    checkboxInput.current.indeterminate = Boolean(indeterminate)
  }

  return (
    <StyledLabel className={className} margin={margin} alignSelf={alignSelf}>
      <AccessibleArea />
      {label && labelPosition === "left" && <LabelText left>{label}</LabelText>}
      <CheckboxContainer>
        <HiddenCheckboxInput
          {...getInputProps({ checked, disabled, ...props })}
          ref={checkboxInput}
        />
        <StyledCheckbox {...styles.checkBox}>
          <StyledIcon
            indeterminate={indeterminate}
            checked={checked}
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
