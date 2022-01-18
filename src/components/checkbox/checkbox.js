import React, { useRef } from "react"
import { Text } from "src/components/typography"
import useCheckBoxStyles from "./use-styles-checkbox"
import useCheckbox from "./use-checkbox"

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
  Label,
  ...props
}) => {
  const { styles } = useCheckBoxStyles({ disabled })
  const { getInputProps, getCheckBoxProps } = useCheckbox({
    disabled,
    checked,
    indeterminate,
    ...props,
  })

  return (
    <StyledLabel disabled={disabled} className={className} margin={margin} alignSelf={alignSelf}>
      <AccessibleArea />
      {label && labelPosition === "left" && (
        <LabelText as={Label} left>
          {label}
        </LabelText>
      )}
      <CheckboxContainer>
        <HiddenCheckboxInput {...getInputProps(ref)} />
        <StyledCheckbox {...styles.styledCheckbox} {...getCheckBoxProps()}>
          <StyledIcon
            name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
            disabled={disabled}
            {...iconProps}
          />
        </StyledCheckbox>
      </CheckboxContainer>
      {label && labelPosition === "right" && (
        <LabelText as={Label} right>
          {label}
        </LabelText>
      )}
    </StyledLabel>
  )
}

Checkbox.defaultProps = {
  labelPosition: "right",
  Label: Text,
}
