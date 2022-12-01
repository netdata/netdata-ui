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
      alignSelf,
      checked,
      className,
      "data-testid": testId,
      disabled,
      iconProps,
      indeterminate,
      Label,
      label,
      labelPosition,
      margin,
      ...props
    },
    ref
  ) => {
    const { styles } = useCheckBoxStyles({ disabled })
    const { getInputProps, getCheckBoxProps } = useCheckbox({
      checked,
      disabled,
      indeterminate,
      ...props,
    })

    return (
      <StyledLabel
        alignSelf={alignSelf}
        className={className}
        data-testid={testId}
        disabled={disabled}
        margin={margin}
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
              disabled={disabled}
              name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
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
  Label: Text,
  labelPosition: "right",
}
