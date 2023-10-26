import React, { forwardRef } from "react"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { HiddenCheckboxInput, Checkbox as StyledCheckbox } from "./styled"

export const Checkbox = forwardRef(
  (
    {
      checked,
      "data-testid": testId,
      disabled,
      iconProps,
      indeterminate,
      Label,
      label,
      labelProps,
      labelPosition = "left",
      onChange,
      ...rest
    },
    ref
  ) => {
    const onClick = e => {
      e.preventDefault()

      if (disabled) return

      onChange?.(!checked)
    }

    return (
      <Flex
        as="label"
        position="relative"
        alignItems="center"
        gap={1}
        cursor={disabled ? "auto" : "pointer"}
        rowReverse={labelPosition === "right"}
        {...rest}
        data-testid={testId}
        disabled={disabled}
      >
        {label && (
          <Text as={Label} opacity={disabled ? 0.4 : 1} {...labelProps}>
            {label}
          </Text>
        )}
        <Box width="16px" height="16px" onClick={onClick}>
          <HiddenCheckboxInput data-testid="checkbox-input" ref={ref} />
          <StyledCheckbox data-testid="styled-checkbox" disabled={disabled}>
            {(!!checked || !!indeterminate) && (
              <Icon
                disabled={disabled}
                name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
                width="16px"
                height="16px"
                color="accent"
                hoverColor="primary"
                {...iconProps}
              />
            )}
          </StyledCheckbox>
        </Box>
      </Flex>
    )
  }
)

Checkbox.defaultProps = {
  Label: Text,
  labelPosition: "right",
}
