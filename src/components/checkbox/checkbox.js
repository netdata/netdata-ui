import React, { forwardRef } from "react"
import { Text } from "src/components/typography"
import useCheckBoxStyles from "./use-styles-checkbox"
import useCheckbox from "./use-checkbox"

import {
  CheckboxContainer,
  HiddenCheckboxInput,
  LabelText,
  StyledCheckbox,
  StyledIcon,
  StyledLabel,
} from "./styled"

export const Checkbox = forwardRef(
  (
    {
      checked,
      "data-testid": testId,
      disabled,
      className,
      labelPosition,
      label,
      indeterminate,
      margin,
      alignSelf,
      iconProps,
      Label,
      ...props
    },
    ref
  ) => {
    const { styles } = useCheckBoxStyles({ disabled })
    const { getInputProps, getCheckBoxProps } = useCheckbox({
      disabled,
      checked,
      indeterminate,
      ...props,
    })

    return (
      <StyledLabel
        data-testid={testId}
        disabled={disabled}
        className={className}
        margin={margin}
        alignSelf={alignSelf}
      >
        {label && labelPosition === "left" && (
          <LabelText as={Label} disabled={disabled} left>
            {label}
          </LabelText>
        )}
        <CheckboxContainer>
          <HiddenCheckboxInput data-testid="checkbox-input" {...getInputProps(ref, props)} />
          <StyledCheckbox
            data-testid="styled-checkbox"
            {...styles.styledCheckbox}
            {...getCheckBoxProps()}
          >
            <StyledIcon
              name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
              disabled={disabled}
              {...iconProps}
            />
          </StyledCheckbox>
        </CheckboxContainer>
        {label && labelPosition === "right" && (
          <LabelText as={Label} disabled={disabled} right>
            {label}
          </LabelText>
        )}
      </StyledLabel>
    )
  }
)

Checkbox.defaultProps = {
  labelPosition: "right",
  Label: Text,
}
